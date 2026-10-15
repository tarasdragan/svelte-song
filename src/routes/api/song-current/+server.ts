import { json, error } from "@sveltejs/kit"
import { sql } from "$lib/server/db"
import type { RequestHandler } from "../../song/[id]/$types"
import { usrState } from "$lib/client/usr.svelte"

export const POST: RequestHandler = async ({ request }) => {
  if (!usrState?.isAdmin && !usrState?.isRegent)
    return error(500, "Ви не є Адміном, або Регентом")
  try {
    // Читаємо чистий JSON з тіла запиту
    const { id } = await request.json()

    if (!id) {
      return error(400, "ID пісні обовʼязкове")
    }

    // Виклик твоєї процедури з BigInt (запобігає проблемам з переповненням типів)
    await sql`call set_current_song(${id})`

    // Повертаємо успішну відповідь
    return json({ success: true })
  } catch (err) {
    return error(500, "Внутрішня помилка сервера")
  }
}
