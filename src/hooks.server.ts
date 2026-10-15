import jwt from "jsonwebtoken"
import { env } from "$env/dynamic/private"
import type { UsrJWTPayload } from "$lib/global/auth"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session")

  // Ініціалізуємо locals.user як null за замовчуванням
  event.locals.user = null

  if (token) {
    try {
      // verify повертає payload, якщо токен валідний
      const user = jwt.verify(token, env.JWT_SECRET) as UsrJWTPayload
      event.locals.user = user
    } catch (err) {
      // Якщо токен прострочений або "лівий" — видаляємо його
      event.cookies.delete("session", { path: "/" })
      event.locals.user = undefined
    }
  }

  return resolve(event)
}
