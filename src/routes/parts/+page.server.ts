import { sql } from "$lib/server/db"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
  const parts = await sql`
    select ids, value
    from v_part
    order by value
  `

  return {
    parts,
  }
}
