export interface UsrJWTPayload {
  id: string | undefined
  role: "admin" | "regent" | "user"
  name?: string // наприклад, для відображення в хедері
}
