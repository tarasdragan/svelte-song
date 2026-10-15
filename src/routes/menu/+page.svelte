<script lang="ts">
  import { BookCopy, ArrowUpAZ, LogIn, UserPlus } from "lucide-svelte"
  import { usrState } from "$lib/client/usr.svelte"

  const items = [
    { id: "alphabet", title: "По алфавіту", icon: ArrowUpAZ, href: "/" },
    { id: "parts", title: "Розділи", icon: BookCopy, href: "/parts" },
    { id: "login", title: "Увійти", icon: LogIn, href: "/login" },
    {
      id: "usr-create",
      title: "Новий користувач",
      icon: UserPlus,
      href: "/usr-create",
    },
  ]
</script>

<div class="grid grid-cols-2 gap-4 p-4 w-full max-w-md mx-auto">
  {#each items as item}
    {#if item.id !== "usr-create" || (item.id === "usr-create" && usrState.isAdmin)}
      {@const Icon = item.icon}
      <a
        href={item.href}
        class="flex flex-col items-center justify-center
             p-6 rounded-2xl bg-oo-bg
             shadow-2xl
             active:scale-90 transition-transform
             text-center no-underline"
      >
        <div class="mb-2 text-oo-accent">
          <Icon size={30} />
        </div>

        <span class="text-oo-txt font-semibold">{item.title}</span>
      </a>
    {/if}
  {/each}
</div>
