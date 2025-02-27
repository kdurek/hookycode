'use server'

import { z } from 'zod'
import nodemailer from 'nodemailer'

export interface ContactFormData {
  name: string
  email: string
  message: string
  token: string
}

export interface ActionResponse {
  success: boolean
  message: string
  errors?: {
    [K in keyof ContactFormData]?: string[]
  }
  inputs?: ContactFormData
}

const contactSchema = z.object({
  name: z.string().min(3, 'Imię jest wymagane'),
  email: z.string().email('Email jest wymagany').min(3, 'Email jest wymagany'),
  message: z.string().min(3, 'Wiadomość jest wymagana'),
  token: z.string(),
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function submitContact(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    // Parse the form data
    const rawData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      token: formData.get('cf-turnstile-response') as string,
    }

    // Validate the data
    const validatedData = contactSchema.safeParse(rawData)

    // If the data is invalid, return an error
    if (!validatedData.success) {
      return {
        success: false,
        message: 'Proszę popraw błędy w formularzu',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      }
    }

    // Verify the captcha
    const captchaRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(validatedData.data.token)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      },
    )

    // Parse the response from the captcha
    const captchaData = await captchaRes.json()

    // If the captcha is invalid, return an error
    if (!captchaData.success) {
      return {
        success: false,
        message: 'Nieprawidłowa weryfikacja CAPTCHA',
        inputs: rawData,
      }
    }

    // Send the email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `${validatedData.data.name} | Formularz kontaktowy`,
      text: validatedData.data.message + `\n\n${validatedData.data.email}`,
    })

    return {
      success: true,
      message: 'Dziękuję za kontakt!',
    }
  } catch {
    return {
      success: false,
      message: 'Wystąpił błąd podczas wysyłania formularza',
    }
  }
}
