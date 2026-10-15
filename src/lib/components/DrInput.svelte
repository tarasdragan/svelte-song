<script lang="ts">
  import { cn } from "$lib/client/utc"
  import DrButtonInput from "./DrButtonInput.svelte"
  import { X } from "lucide-svelte"

  // Svelte 5 $props
  let {
    value = $bindable(),
    caption = "",
    showCaptionIfEmpty = true,
    showCaptionIfFocus = true,
    showCaptionAlways = false,
    clearable = false,
    rightSection = undefined,
    error = "",
    class: className = "",
    type = "text",
    id = "input-" + Math.random().toString(36).slice(2),
    ...rest
  } = $props()

  let isFocused = $state(false)
  let isEmpty = $derived(value === "" || value === null || value === undefined)

  // Головна логіка видимості
  let isVisible = $derived(
    showCaptionAlways ||
      (isFocused && showCaptionIfFocus) ||
      (isEmpty && showCaptionIfEmpty) ||
      (!isEmpty && !isFocused), // Зазвичай заповнені поля завжди мають підпис, щоб знати що там
  )

  // Якщо треба СУВОРО за твоїми умовами, то формула така:
  let finalVisible = $derived(
    showCaptionAlways ||
      (isFocused && showCaptionIfFocus) ||
      (isEmpty && showCaptionIfEmpty),
  )

  const clearValue = () => {
    value = ""
  }
</script>

<div class="relative w-full group">
  <div class="relative flex items-center">
    <input
      {id}
      {type}
      bind:value
      onfocus={() => (isFocused = true)}
      onblur={() => setTimeout(() => (isFocused = false), 150)}
      placeholder=" "
      class={cn(
        "border-0 w-full",
        "focus:ring-oo-accent focus:ring-2",
        "h-8 rounded-lg",
        "bg-oo-input-bg text-oo-input-txt",
        "peer",
        "pr-3",
        className,
      )}
      {...rest}
    />

    <!-- Секція кнопок: Очищення + Зовнішні -->
    <div
      class="
        absolute right-0 z-10
        flex items-center gap-1
        bg-oo-input-bg/80
        px-1 rounded-md
        mt-1"
    >
      {#if clearable && !isEmpty && isFocused}
        <DrButtonInput icon={X} onclick={() => clearValue()}></DrButtonInput>
      {/if}

      {#if rightSection}
        {@render rightSection(isFocused)}
      {/if}
    </div>
  </div>

  {#if caption && finalVisible}
    <label
      for={id}
      class={cn(
        "absolute right-3 -top-0.5 -translate-y-1/2 z-20",
        "pointer-events-none px-1.5 whitespace-nowrap transition-all duration-200",
        "text-[10px] font-bold tracking-wider",
        "bg-oo-bg border rounded-sm",
        isFocused
          ? "text-oo-accent border-oo-accent"
          : "text-oo-input-placeholder border-oo-input-placeholder",
        error ? "text-oo-error! border-oo-error!" : "",
      )}
    >
      {caption}
    </label>
  {/if}

  {#if error}
    <p class="mt-0.5 ml-2 text-[10px] uppercase italic text-oo-error">
      {error}
    </p>
  {/if}
</div>
