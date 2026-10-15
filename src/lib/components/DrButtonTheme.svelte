<script lang="ts">
  import { Sun, Moon, Icon } from "lucide-svelte"
  import { theme } from "$lib/client/theme.svelte"
  import DrButton from "./DrButton.svelte"
</script>

<DrButton onclick={() => theme.toggle()}>
  {#if theme.current === "light"}
    <Moon />
  {:else}
    <Sun />
  {/if}
</DrButton>
