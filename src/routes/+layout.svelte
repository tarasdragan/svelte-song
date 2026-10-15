<script lang="ts">
  import "../app.css"
  import { Toaster } from "svelte-sonner"
  import DrHeader from "$lib/components/DrHeader.svelte"
  import { usrState } from "$lib/client/usr.svelte.js"
  import type { LayoutData } from "./$types"

  //let { data, children } = $props<{ data: LayoutData; children: any }>()
  let { data, children } = $props()

  // Синхронізуємо дані сервера з нашим глобальним об'єктом
  // Використовуємо $effect, щоб при зміні даних (наприклад, після логіну) стан оновився
  $effect(() => {
    usrState.set(data.user)
    //alert(data.user)
  })
</script>

<div class="flex flex-col h-dvh bg-oo-bg text-oo-txt">
  <DrHeader />

  <!-- 
    1. Прибираємо items-center та justify-center.
    2. Додаємо overflow-y-auto, щоб скролився тільки контент, а хедер стояв на місці.
  -->
  <Toaster position="top-right" richColors />
  <main class="flex-1 overflow-y-auto">
    {@render children()}
  </main>
</div>
