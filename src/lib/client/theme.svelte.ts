// src/lib/ui/theme.svelte.ts
let _current = $state("light")

export const theme = {
  get current() {
    return _current
  },
  toggle() {
    _current = _current === "light" ? "dark" : "light"

    if (typeof document !== "undefined") {
      if (_current === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  },
}
