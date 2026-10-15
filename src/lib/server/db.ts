import { env as Env } from "$env/dynamic/private"
import postgres from "postgres"
import { enpmtyClientRes, type IApiClient } from "./uts"

export const sql = postgres("", {
  host: Env.POSTGRES_HOST,
  port: Number(Env.POSTGRES_PORT),
  database: Env.POSTGRES_DB,
  username: Env.POSTGRES_USER,
  password: Env.POSTGRES_PASSWORD,
  max: Number(Env.POSTGRES_POOL_MAX) || 100,
  idle_timeout: Number(Env.POSTGRES_POOL_IDLE_TIMEOUT) || 60,
  connect_timeout: Number(Env.POSTGRES_CONNECT_TIMEOUT) || 10,
})

export async function run<T = IApiClient>(
  func: string,
  auth: object = {},
  body: object = {},
): Promise<T> {
  let res: IApiClient = enpmtyClientRes()
  try {
    const authJson = JSON.stringify(auth)
    const bodyJson = JSON.stringify(body)

    const result = await sql`
      CALL run(
        ${func},
        ${authJson},
        ${bodyJson},
        null
      )
    `
    //console.log(result[0])
    // Перевірка наявності результату (захист від порожнього RecordSet)
    if (!result || result.length === 0) {
      throw new Error("Порожній результат процедури Run")
    } else {
      const resDb = result[0].res
      res.ok = resDb?.ok ?? false
      res.content = resDb?.content ?? null
      res.ext_data = resDb?.ext_data ?? null
      res.err = resDb?.error?.message ?? null
      //console.log(resDb)
    }
  } catch (err) {
    console.log(err)
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : String(err)
    const s = "RUN [ " + func + " ]. " + message + ". " + stack
    res.ok = false // Не забудь скинути ok в false
    res.err = "Помилка сервера"
  }
  return res as T
}
