import { submitContact, type ActionResponse } from '@/app/actions'
import { CONTACT_LINKS } from '@/app/data'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MagneticContactLink } from '@/components/ui/magnetic-contact-link'
import { Textarea } from '@/components/ui/textarea'
import { TRANSITION_SECTION, VARIANTS_SECTION } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Turnstile } from '@marsidev/react-turnstile'
import { ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import Form from 'next/form'
import { useActionState } from 'react'

export const initialState: ActionResponse = {
  success: false,
  message: '',
}

export function Contact() {
  const [state, action, isPending] = useActionState(submitContact, initialState)

  return (
    <motion.section
      id="contact"
      className="py-16"
      variants={VARIANTS_SECTION}
      transition={TRANSITION_SECTION}
    >
      <div className="container">
        <Heading>Kontakt</Heading>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          {CONTACT_LINKS.map((link) => (
            <MagneticContactLink key={link.label} link={link.link}>
              {link.label}
            </MagneticContactLink>
          ))}
        </div>

        <div className="relative rounded-2xl border p-4 md:p-8">
          {state?.success && (
            <div className="bg-background absolute inset-0 flex size-full items-center justify-center rounded-2xl text-center text-3xl sm:text-4xl">
              {state?.message}
            </div>
          )}
          <Form action={action}>
            <div className="mx-auto grid max-w-xl gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-muted-foreground text-lg font-semibold"
                >
                  Imię
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={state?.inputs?.name}
                  aria-describedby="name-error"
                  className={cn(
                    'h-12',
                    state?.errors?.name ? 'border-red-500' : '',
                  )}
                />
                {state?.errors?.name && (
                  <Label id="name-error" className="text-destructive text-lg">
                    {state.errors.name[0]}
                  </Label>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-muted-foreground text-lg font-semibold"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={state?.inputs?.email}
                  aria-describedby="email-error"
                  className={cn(
                    'h-12',
                    state?.errors?.email ? 'border-red-500' : '',
                  )}
                />
                {state?.errors?.email && (
                  <Label id="email-error" className="text-destructive text-lg">
                    {state.errors.email[0]}
                  </Label>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label
                  htmlFor="message"
                  className="text-muted-foreground text-lg font-semibold"
                >
                  Wiadomość
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={16}
                  defaultValue={state?.inputs?.message}
                  aria-describedby="message-error"
                  className={cn(
                    'h-48',
                    state?.errors?.message ? 'border-red-500' : '',
                  )}
                />
                {state?.errors?.message && (
                  <Label
                    id="message-error"
                    className="text-destructive text-lg"
                  >
                    {state.errors.message[0]}
                  </Label>
                )}
              </div>
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                className="col-span-full rounded-2xl"
                options={{
                  action: 'contact-form',
                  theme: 'dark',
                  size: 'flexible',
                  language: 'pl',
                }}
              />
              <div className="col-span-full flex items-center justify-between">
                {!state?.success && (
                  <Label id="token-error" className="text-destructive text-lg">
                    {state?.message}
                  </Label>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="flex gap-2 text-lg font-medium"
                  disabled={isPending}
                >
                  Wyślij
                  {isPending ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <ArrowRight size={24} />
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </motion.section>
  )
}
