<script lang="ts">
  import { AArrowDown, AArrowUp, Check } from "lucide-svelte"
  import { settings } from "$lib/client/font.svelte"
  import { toast } from "svelte-sonner"

  let { data } = $props()
  let isLoading = $state(false)

  async function setCurrentSong(id: number | string) {
    if (isLoading) return
    isLoading = true

    try {
      const response = await fetch("/api/song-current", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.song.id }),
      })

      if (!response.ok) {
        const errData = await response.json()
        toast.error(errData.message || "Server error")
      } else {
        toast.success("Пісню обрано ...")
      }
    } catch (err: any) {
      alert(`Не вдалося обрати пісню: ${err.message}`)
    } finally {
      isLoading = false
    }
  }
</script>

<!-- h-auto та pb-24 для правильного скролу всередині лейауту -->
<article class="flex flex-col w-full bg-oo-bg h-auto pb-24">
  <header class="px-6 py-4 text-center select-none">
    <h1 class="text-xl font-bold text-oo-txt leading-tight wrap-break-word">
      {data.song.title}
    </h1>
  </header>

  <div class="px-2 overflow-x-hidden">
    <div
      class="song-text text-oo-txt leading-none"
      style="font-size: {settings.fontSize}px"
    >
      {data.song.lyrics}
    </div>
  </div>
</article>

<!-- Кнопка для Адміна на вибір пісні -->
<div class="fixed top-16 right-4 flex flex-col gap-3 z-50 select-none">
  <button
    disabled={isLoading}
    onclick={() => setCurrentSong(data.song.id)}
    class="p-3 text-oo-txt rounded-full shadow-lg active:scale-95 transition-transform border border-white/20"
    aria-label="Збільшити шрифт"
  >
    <Check size={24} />
  </button>
</div>

<!-- Кнопки: збільшено padding (p-3) для мобільних, додано фон bg-oo-bg -->
<div class="fixed bottom-4 right-4 flex flex-col gap-3 z-50 select-none">
  <button
    onclick={settings.zoomIn}
    class="p-3 text-oo-txt rounded-full shadow-lg active:scale-95 transition-transform border border-white/20"
    aria-label="Збільшити шрифт"
  >
    <AArrowUp size={24} />
  </button>

  <button
    onclick={settings.zoomOut}
    class="p-3 text-oo-txt rounded-full shadow-lg active:scale-95 transition-transform border border-white/20"
    aria-label="Зменшити шрифт"
  >
    <AArrowDown size={24} />
  </button>
</div>

<style>
  .song-text {
    /* Твої оригінальні стилі відображення */
    white-space: pre-wrap;
    word-wrap: break-word;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(.song-text) {
    tab-size: 2;
  }
</style>
