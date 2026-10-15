import { sql } from "$lib/server/db" // Твій драйвер postgres.js
import type { PageServerLoad } from "./$types"

const baseQuery = sql`
  select a.id, a.title,
         (a.lyrics is not null and a.lyrics != '') as has_text,
         case when (select count(*) from song_notes n where n.id_song = a.id) > 0 then true else false end as is_notes
    from song a
`
const orderClause = sql`order by a.title asc`

export const load: PageServerLoad = async ({ url }) => {
  // Отримуємо значення параметра 'substr' з URL (наприклад, /list?substr=два)
  const subStr = url.searchParams.get("substr") || ""
  const idsPart = url.searchParams.get("idspart") || ""

  const conditions = []

  if (subStr.length >= 2) {
    const pattern = `%${subStr}%`
    conditions.push(
      sql`(a.title ilike ${pattern} or a.lyrics ilike ${pattern})`,
    )
  }

  if (idsPart) {
    conditions.push(
      sql`exists (select 1 from song_part p where p.id_song = a.id and p.ids_part = ${idsPart})`,
    )
  }

  // Формуємо фінальну секцію WHERE
  // sql.and з'єднає елементи через " AND "
  const where =
    conditions.length > 0
      ? sql`where ${conditions.reduce((acc, curr) => sql`${acc} and ${curr}`)}`
      : sql``

  const songs = await sql`
    ${baseQuery}
    ${where}
    ${orderClause}
  `

  return {
    songs,
  }
}
