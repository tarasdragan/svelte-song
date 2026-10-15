<script lang="ts">
  import DrButtonInput from "./DrButtonInput.svelte"
  import DrInput from "./DrInput.svelte"
  import { Search } from "lucide-svelte"
  let {
    value = $bindable(),
    onSearch,
    debounceTime = 500, // Затримка в мс (0 - вимкнено)
    minLength = 3, // Мінімальна кількість символів
    ...props
  } = $props()

  // Ефект для автопошуку (Debounce)
  $effect(() => {
    // Якщо автопошук вимкнено або функція не передана — нічого не робимо
    if (!debounceTime || !onSearch) return

    // Перевірка на довжину тексту
    if (value.length >= minLength) {
      const timer = setTimeout(() => {
        onSearch(value)
      }, debounceTime)

      // Очищення таймера, якщо юзер ввів наступний символ раніше затримки
      return () => clearTimeout(timer)
    }
  })
</script>

<DrInput bind:value clearable={true} {...props}>
  {#snippet rightSection()}
    <DrButtonInput icon={Search} onclick={() => onSearch && onSearch(value)}
    ></DrButtonInput>
  {/snippet}
</DrInput>
