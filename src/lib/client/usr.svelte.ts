// src/lib/user.svelte.ts
import type { UsrJWTPayload } from "$lib/global/auth"

// Створюємо клас для керування станом (Svelte 5 style)
class UsrState {
  #usr = $state<UsrJWTPayload | null>(null)

  get current() {
    return this.#usr
  }

  // Похідні властивості (аналог обчислювальних полів)
  get isAdmin() {
    return this.#usr?.role === "admin"
  }
  get isRegent() {
    return this.#usr?.role === "regent"
  }
  get isAuthenticated() {
    return this.#usr !== null
  }

  // Метод для оновлення (викликатимемо в Root Layout)
  set(usrData: UsrJWTPayload | null) {
    this.#usr = usrData
  }
}

// Експортуємо єдиний екземпляр
export const usrState = new UsrState()
