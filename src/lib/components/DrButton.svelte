<script lang="ts">
  import type { Snippet } from "svelte"
  import type { Icon } from "lucide-svelte"

  let {
    onclick,
    icon: IconComponent,
    children,
    class: className = "",
    title = "",
    type = "button",
    disabled = false,
    ...rest
  } = $props<{
    onclick?: (e: MouseEvent) => void
    icon?: typeof Icon
    children?: Snippet
    class?: string
    title?: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
  }>()
</script>

<button
  {onclick}
  {title}
  {...rest}
  class="
    inline-flex items-center justify-center gap-2
    px-2 py-1 rounded-lg
    bg-transparent
    text-oo-txt
    hover:ring-2 hover:ring-oo-accent
    hover:text-oo-accent
    active:scale-90 transition-all duration-200
    min-w-[2rem] min-h-[2rem]
    {className}"
>
  {#if IconComponent}
    <!-- Використовуємо проп size для Lucide -->
    <IconComponent size={20} strokeWidth={2} />
  {/if}

  {#if children}
    <span class="text-sm font-medium leading-none">
      {@render children()}
    </span>
  {/if}
</button>
