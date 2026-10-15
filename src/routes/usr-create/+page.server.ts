import { sql } from "$lib/server/db"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "../admin/usr/create/$types"
import bcrypt from "bcryptjs"

const SALT_ROUNDS = 12

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.role !== "admin") {
    throw redirect(302, "/list")
  }
  return {} // Load має щось повертати, навіть порожній об'єкт
}

export const actions: Actions = {
  default: async ({ request, locals }) => {
    // 1. Перевірка авторизації
    if (locals.user?.role !== "admin") {
      throw redirect(302, "/list")
    }

    const data = await request.formData()
    const usr_name = String(data.get("usr_name")).trim().toUpperCase()
    const usr_role = String(data.get("usr_role"))
    const usr_password = String(data.get("usr_password"))
    if (usr_name === "ADMIN" || usr_name.length < 6)
      return fail(400, {
        incorrect: true,
        message: "Не вірно ім'я користувача. Можливо занадто коротке",
      })

    // Валідація (базова)
    if (!usr_password || usr_password.length < 6) {
      return fail(400, { incorrect: true, message: "Пароль занадто короткий" })
    }

    // 2. Хешування
    const pass_hash = await bcrypt.hash(usr_password, SALT_ROUNDS)

    try {
      await sql.begin(async (sql) => {
        await sql`
                    insert into usr (usr_name, usr_role, pass_hash)
                    values (${usr_name}, ${usr_role}, ${pass_hash})
                    on conflict (usr_name) 
                    do update set
                        usr_role = EXCLUDED.usr_role,
                        pass_hash = EXCLUDED.pass_hash
                `
      })
    } catch (e) {
      return fail(400, {
        message: "Помилка при створенні користувача",
        incorrect: true,
      })
    }

    throw redirect(303, "/")
  },
}
