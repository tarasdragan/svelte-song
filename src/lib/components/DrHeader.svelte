<!-- src/lib/components/Header.svelte -->
<script lang="ts">
  import { MenuIcon, Files, Star } from "lucide-svelte"
  import DrButtonTheme from "./DrButtonTheme.svelte"
  import DrButton from "./DrButton.svelte"
  import DrInputSearch from "./DrInputSearch.svelte"
  import { goto } from "$app/navigation"
  import { page } from "$app/state"

  // Отримуємо значення з URL: якщо ми на /list?substr=... — текст буде в інпуті
  // Якщо ми не на сторінці списку, інпут буде порожнім
  let subStr = $derived(page.url.searchParams.get("substr") || "")

  function handleSearch(term: string) {
    const url = new URL("/", window.location.origin)

    if (term) {
      url.searchParams.set("substr", term)
    } else {
      url.searchParams.delete("substr")
    }

    // noScroll: true — щоб сторінка не стрибала вгору при кожному символі
    // keepFocus: true — щоб курсор залишався в інпуті
    goto(url.toString(), {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    })
  }

  function goMenu() {
    goto("/menu")
  }

  function goCurrentSong() {
    goto("/song")
  }
</script>

<header
  class="sticky z-50 w-full
         bg-oo-header
         top-1 h-12
         px-2
         flex items-center"
>
  <div class="mx-auto flex items-center gap-x-0.5">
    <div class="flex-none">
      <DrButton icon={MenuIcon} onclick={goMenu}></DrButton>
    </div>
    <div class="flex-none">
      <DrButton icon={Files} onclick={() => goto("/")} />
    </div>
    <div class="flex-1">
      <DrInputSearch
        clearable={true}
        bind:value={subStr}
        onSearch={handleSearch}
      ></DrInputSearch>
    </div>
    <div class="flex-none">
      <DrButton icon={Star} onclick={goMenu}></DrButton>
    </div>
    <div class="flex-none">
      <DrButtonTheme />
    </div>
  </div>
</header>
