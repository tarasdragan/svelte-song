import { browser } from "$app/environment"

// Створюємо реактивний стан
let _fontSize = $state(
  browser ? Number(localStorage.getItem("fontSize")) || 17 : 17,
)

export const settings = {
  get fontSize() {
    return _fontSize
  },
  set fontSize(v) {
    _fontSize = v
  },

  zoomIn() {
    if (_fontSize < 40) {
      _fontSize += 1
      if (browser) localStorage.setItem("fontSize", _fontSize.toString())
    }
  },

  zoomOut() {
    if (_fontSize > 12) {
      _fontSize -= 1
      if (browser) localStorage.setItem("fontSize", _fontSize.toString())
    }
  },
}
