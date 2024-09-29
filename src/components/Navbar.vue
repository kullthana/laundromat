<template>
  <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a target="_blank" :href="urlAuth"
          ><svg
            class="h-8 w-8 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg
        ></a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    urlAuth() {
      const clientId = 'jEiKVR0q0xU5aXL9nHrI3r'
      const engine = 'http://localhost:5173'
      const username = 'Kull'
      return `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${engine}/line/redirect&scope=notify&state=${username}`
    }
  }
}
</script>
