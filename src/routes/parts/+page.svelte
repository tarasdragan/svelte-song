<script lang="ts">
  import { FileText, Music, ChevronRight } from "lucide-svelte"
  let { data } = $props()
</script>

<!-- Прибираємо min-h-screen, залишаємо просто w-full -->
<div class="w-full bg-oo-bg">
  <div class="flex flex-col w-full py-5">
    {#each data.parts as part}
      <a
        href="/list?idspart='{part.ids}'"
        class="flex items-start px-4 py-2 active:bg-oo-accent/10 transition-colors"
      >
        <!-- Назва -->
        <div class="flex-1 min-w-0 pr-2">
          <div
            class="text-oo-txt font-medium text-base leading-tight wrap-break-word"
          >
            {part.value}
          </div>
        </div>
      </a>
    {:else}
      <div class="py-20 text-center text-oo-input-placeholder italic px-6">
        А нема ніц...
      </div>
    {/each}
  </div>
</div>
