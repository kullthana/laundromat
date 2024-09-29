<template>
  <div>
    <navbar></navbar>
    <main>
      <div
        class="relative pt-16 pb-32 flex content-center items-center justify-center"
        style="min-height: 40vh"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://miro.medium.com/v2/resize:fit:1400/format:webp/1*J6Ef-aF9NQubmk3xT8xLUQ.jpeg');
          "
        >
          <div id="" class="w-full h-full absolute opacity-80 bg-black"></div>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">Laundromat</h1>
              </div>
            </div>
          </div>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px"
        >
          <svg class="absolute bottom-0 overflow-hidden" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <section class="bg-gray-300 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <!-- <section class="flex flex-wrap"> -->
            <laundry-machine class="LaundryMachine" v-for="n in 6" :key="n" />
          </div>
        </div>
      </section>
    </main>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
import LaundryMachine from '@/components/LaundryMachine.vue'
import Navbar from '@/components/Navbar.vue'
import FooterComp from '@/components/Footer.vue'

export default {
  name: 'Laundromat',
  components: {
    LaundryMachine,
    Navbar,
    FooterComp
  }
}
</script>
