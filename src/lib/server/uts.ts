export interface IApiClient {
  ok: boolean
  content?: any
  ext_data?: any
  err?: string
}

export function enpmtyClientRes(): IApiClient {
  return {
    ok: false,
    content: null,
    ext_data: null,
    err: "",
  }
}
