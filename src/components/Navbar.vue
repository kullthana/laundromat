<template>
  <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a target="_blank" :href="urlAuth">เชื่อมต่อ LINE</a>
        >
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
