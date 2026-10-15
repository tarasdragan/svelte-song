import { sql } from "$lib/server/db"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { Actions } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
  // Отримуємо пісню за ID. Використовуємо деструктуризацію першого елемента масиву.
  const [song] = await sql`
        select id, title, lyrics
        from song 
        where id = ${params.id}
    `

  if (!song) {
    throw error(404, "Пісню не знайдено")
  }

  return {
    song,
  }
}
