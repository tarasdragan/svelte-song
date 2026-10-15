import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { env } from "$env/dynamic/private"
import { sql } from "$lib/server/db"
import jwt from "jsonwebtoken"
import type { UsrJWTPayload } from "$lib/global/auth"

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()
    const login = String(data.get("login")).toUpperCase()
    const password = data.get("password")
    console.log("1")

    // Валідація (перевірка на порожнечу)
    if (!login || !password) {
      return fail(400, {
        login,
        incorrect: true,
        message: "Заповніть усі поля",
      })
    }

    let payload: UsrJWTPayload = {
      id: undefined,
      role: "user",
      name: "Користувач",
    }

    // Перевірка на адміна
    if (
      login === env.ADMIN_LOGIN.toUpperCase() &&
      password === env.ADMIN_PASSWORD
    ) {
      payload.role = "admin"
    } else {
      // Зчитуємо з бази по імені
      const dbRes = await sql`
        select *
          from usr
          where usr_name = ${login}
          limit 1
      `
      if (dbRes.length > 0)
        if (dbRes[0].id) {
          payload.id = dbRes[0].id
          payload.role = dbRes[0].osrole
        }
    }

    // якщо адмін або регент - то створюємо токен
    if (["admin", "regent"].includes(payload.role)) {
      const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "24h", // токен діятиме 24 години
      })

      // НА ПРОДАКШЕН
      // cookies.set("session", token, {
      //   path: "/",
      //   httpOnly: true, // безпека: JS у браузері не зможе прочитати токен
      //   secure: isProd,        // true у продакшні (HTTPS)
      //   sameSite: "strict",
      //   maxAge: 60 * 60 * 24, // 1 день у секундах
      // })

      // НА ВІДЛАДКУ
      cookies.set("session", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax", // Змініть зі 'strict' на 'lax' для тестів
        secure: false, // Явно дозвольте HTTP (тільки для розробки!)
        maxAge: 60 * 60 * 24,
      })

      throw redirect(303, "/list")
    }
    return fail(400, { login, incorrect: true, message: "Дані не вірні" })
  },
}
