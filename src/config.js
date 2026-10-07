// Site-wide settings. Override at build time with Vite env vars (e.g. in Vercel/Hostinger project settings).

/**
 * Inbox that receives contact-form submissions through FormSubmit (https://formsubmit.co).
 * FormSubmit emails an activation link the first time a form is submitted to a new address —
 * click it once and every later submission is delivered.
 * Tip: after activating, you can replace the address with the random alias FormSubmit gives you
 * so the email isn't visible in the page source.
 */
export const FORMSUBMIT_EMAIL = import.meta.env.VITE_FORMSUBMIT_EMAIL || 'info@gulfhorizon.net'

export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`
