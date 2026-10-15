import tailwindcss from "@tailwindcss/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    host: "0.0.0.0", // дозволяє доступ з усіх мережевих інтерфейсів
    port: 5173, // можна також зафіксувати порт
    allowedHosts: ["taraspc"],
  },
})
