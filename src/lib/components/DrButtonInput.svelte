<script lang="ts">
  import type { Snippet } from "svelte"
  import type { Icon } from "lucide-svelte"

  // Визначаємо пропси
  let {
    onclick,
    icon: IconComponent, // Передаємо компонент іконки як проп
    class: className = "",
    title = "", // Для підказок
    ...rest
  } = $props<{
    onclick?: (e: MouseEvent) => void
    icon?: typeof Icon
    class?: string
    title?: string
  }>()
</script>

<button
  {onclick}
  {title}
  class="
    inline-flex items-center justify-center gap-1
    px-1 py-1 rounded-lg
    bg-transparent
    text-oo-input-txt
    hover:scale-130
    active:scale-90 transition-all duration-200
    w-6 h-6
		{className}"
>
  {#if IconComponent}
    <IconComponent w-24 h-24 />
  {/if}
</button>
