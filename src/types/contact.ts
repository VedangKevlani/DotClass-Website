export type ContactMethod = "email" | "sms" | "whatsapp"

export type ContactReason =
  | "support"
  | "feedback"
  | "business"

export interface ContactFormData {
  method: ContactMethod
  reason: ContactReason
  name: string
  email?: string
  phone?: string
  message: string
}