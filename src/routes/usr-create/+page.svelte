<script lang="ts">
  import { enhance } from "$app/forms"
  import { goto } from "$app/navigation"
  import DrButton from "$lib/components/DrButton.svelte"
  import DrInput from "$lib/components/DrInput.svelte"
  import { toast } from "svelte-sonner"
  import { usrState } from "$lib/client/usr.svelte.js"

  let { form } = $props()
  let loading = $state(false)

  function handleCancel() {
    goto("/list")
  }
</script>

<div class="flex items-center justify-center bg-oo-bg h-full p-6">
  <div
    class="flex flex-col gap-4
              bg-oo-card p-3
              w-[300px] md:w-[400px] m-auto
              rounded-3xl"
  >
    <h2 class="text-center text-oo-txt">
      Створити користувача / оновити пароль
    </h2>
    <form
      method="POST"
      use:enhance={() => {
        loading = true
        return async ({ result, update }) => {
          if (result.type === "redirect") {
            await update()

            let toastMessage: string = ""

            toast.success(toastMessage)
            // Маленька пауза перед переходом, щоб користувач встиг прочитати
            await new Promise((r) => setTimeout(r, 600))
          } else if (result.type === "failure") {
            toast.error("Помилка")
            await update({ reset: true })
          }
          loading = false
          update()
        }
      }}
      class="flex flex-col gap-4"
    >
      <DrInput caption="Ім'я" name="usr_name"></DrInput>
      <DrInput caption="Пароль" name="usr_password"></DrInput>
      <div class="flex flex-row items-center justify-around w-full">
        <DrButton type="submit" disabled={loading}>Сворити</DrButton>
        <DrButton disabled={loading} onclick={handleCancel}>Відмінити</DrButton>
      </div>
      {#if form?.incorrect}
        <div
          class="flex justify-center items-center
                text-oo-error font-bold"
        >
          {form.message}
        </div>
      {/if}
    </form>
  </div>
</div>
