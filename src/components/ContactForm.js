'use client'

import { useForm, ValidationError } from '@formspree/react'

export default function ContactForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID

  if (!formId) {
    return (
      <div className="rounded-md border border-amber/30 bg-amber/5 p-5 text-sm text-amber">
        <p className="font-medium">Form not yet configured.</p>
        <p className="mt-2 text-muted">
          Set <code className="font-mono">NEXT_PUBLIC_FORMSPREE_ID</code> in
          your environment, or email{' '}
          <a
            href="mailto:hello@agenticnexus.uk"
            className="underline decoration-amber/40 underline-offset-2 hover:text-text"
          >
            hello@agenticnexus.uk
          </a>{' '}
          directly.
        </p>
      </div>
    )
  }

  const [state, handleSubmit] = useForm(formId)

  if (state.succeeded) {
    return (
      <div className="rounded-md border border-emerald/30 bg-emerald/5 p-5 text-sm text-emerald">
        <p className="font-medium">Message sent.</p>
        <p className="mt-1 text-muted">Thanks — I&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="label-mono mb-2 block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-border bg-slate-soft px-4 py-2.5 text-sm text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <ValidationError
          field="name"
          errors={state.errors}
          className="mt-1.5 block text-xs text-amber"
        />
      </div>
      <div>
        <label htmlFor="email" className="label-mono mb-2 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-border bg-slate-soft px-4 py-2.5 text-sm text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <ValidationError
          field="email"
          errors={state.errors}
          className="mt-1.5 block text-xs text-amber"
        />
      </div>
      <div>
        <label htmlFor="message" className="label-mono mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-md border border-border bg-slate-soft px-4 py-2.5 text-sm text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <ValidationError
          field="message"
          errors={state.errors}
          className="mt-1.5 block text-xs text-amber"
        />
      </div>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/5 px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:bg-accent/10 disabled:opacity-50"
      >
        {state.submitting ? 'Sending…' : 'Send message'}
        <span aria-hidden>&rarr;</span>
      </button>
    </form>
  )
}
