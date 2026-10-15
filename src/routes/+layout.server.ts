// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = ({ locals }) => {
  // Повертаємо дані юзера на клієнт
  return {
    user: locals.user,
  }
}
