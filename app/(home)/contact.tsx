'use client'

import { submitContact, type ActionResponse } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Turnstile } from '@marsidev/react-turnstile'
import { ArrowRight, Loader2, MailIcon } from 'lucide-react'
import Form from 'next/form'
import { useActionState } from 'react'

export const initialState: ActionResponse = {
  success: false,
  message: '',
}

export function Contact() {
  const [state, action, isPending] = useActionState(submitContact, initialState)

  return (
    <div className="relative rounded-2xl border p-6">
      {state?.success && (
        <div className="bg-background absolute inset-0 flex size-full items-center justify-center rounded-2xl text-center text-3xl sm:text-4xl">
          {state?.message}
        </div>
      )}
      <h2 className="flex items-center text-sm font-semibold">
        <MailIcon className="text-muted-foreground size-6 flex-none" />
        <span className="ml-3">Kontakt</span>
      </h2>
      <Form action={action} className="mt-6">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              className="text-muted-foreground font-semibold"
            >
              Imię
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={state?.inputs?.name}
              aria-describedby="name-error"
              className={cn(state?.errors?.name ? 'border-destructive' : '')}
            />
            {state?.errors?.name && (
              <Label id="name-error" className="text-destructive">
                {state.errors.name[0]}
              </Label>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-muted-foreground font-semibold"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={state?.inputs?.email}
              aria-describedby="email-error"
              className={cn(state?.errors?.email ? 'border-destructive' : '')}
            />
            {state?.errors?.email && (
              <Label id="email-error" className="text-destructive">
                {state.errors.email[0]}
              </Label>
            )}
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label
              htmlFor="message"
              className="text-muted-foreground font-semibold"
            >
              Wiadomość
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={8}
              defaultValue={state?.inputs?.message}
              aria-describedby="message-error"
              className={cn(
                'h-24',
                state?.errors?.message ? 'border-destructive' : '',
              )}
            />
            {state?.errors?.message && (
              <Label id="message-error" className="text-destructive">
                {state.errors.message[0]}
              </Label>
            )}
          </div>
          <div className="col-span-full overflow-hidden">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              options={{
                action: 'contact-form',
                theme: 'dark',
                size: 'flexible',
                language: 'pl',
              }}
            />
          </div>
          <div className="col-span-full">
            <Button
              type="submit"
              className="flex w-full gap-2 font-medium"
              disabled={isPending}
            >
              Wyślij
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
            </Button>
            {!state?.success && (
              <Label id="token-error" className="text-destructive">
                {state?.message}
              </Label>
            )}
          </div>
        </div>
      </Form>
    </div>
  )
}
