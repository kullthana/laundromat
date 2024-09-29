<template>
  <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
    >
      <div class="px-4 py-5 flex-auto">
        <button @click="() => (makingSelection = !makingSelection)" :disabled="inUse">
          <div class="font-bold">
            <h1 v-if="inUse">{{ time }}</h1>
            <h1 v-if="!inUse && !isFinish">Empty</h1>
            <h1 v-if="isFinish">Finish</h1>
          </div>
          <img
            v-if="!makingSelection && isEmpty"
            src="../assets/laundry_machine_empty.png"
            alt=""
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          <img
            v-if="makingSelection && !isFinish"
            src="../assets/laundry_machine_putting.png"
            alt=""
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          <img
            v-if="inUse"
            src="../assets/laundry_machine_running.png"
            alt=""
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          <img
            v-if="isFinish"
            src="../assets/laundry_machine_full.png"
            alt=""
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </button>
      </div>
    </div>
    <section :class="[makingSelection ? 'visible' : 'invisible']">
      <div class="grid grid-cols-3 gap-4 items-center justify-items-center font-bold text-lg">
        <button
          class="bg-transparent text-blue-500 active:bg-gray-100 text-xs px-4 py-2 rounded-full border border-blue-500 shadow hover:shadow-md outline-none focus:outline-none"
          @click="() => (duration -= 60)"
          :disabled="duration < 2"
          style="transition: all 0.15s ease 0s"
        >
          -
        </button>
        <h3>{{ duration / 60 }} min</h3>
        <button
          class="bg-transparent text-blue-500 active:bg-gray-100 text-xs px-4 py-2 rounded-full border border-blue-500 shadow hover:shadow-md outline-none focus:outline-none"
          @click="() => (duration += 60)"
          style="transition: all 0.15s ease 0s"
        >
          +
        </button>
      </div>

      <h3 class="font-bold py-4 text-lg">฿{{ cost }}</h3>

      <div class="grid grid-cols-2 gap-4">
        <button
          class="bg-blue-500 text-white active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
          @click="start"
          style="transition: all 0.15s ease 0s"
        >
          Start
        </button>
        <button
          class="bg-transparent text-red-700 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded border border-red-500 shadow hover:shadow-md outline-none focus:outline-none"
          @click="() => (makingSelection = false)"
          style="transition: all 0.15s ease 0s"
        >
          Cancel
        </button>
      </div>
    </section>
  </div>
</template>

<script>
// import { store } from '@/store/index'

const time = 1

export default {
  name: 'LaundryMachine',
  data() {
    return {
      duration: time * 60,
      isEmpty: true,
      inUse: false,
      isFinish: false,
      rate: 10,
      makingSelection: false,
      timerRunning: false,
      interval: null
    }
  },
  computed: {
    cost() {
      return this.rate * (this.duration / 60)
    },
    time() {
      return this.minutes + ' : ' + this.seconds
    },
    minutes() {
      var min = Math.floor(this.duration / 60)
      return min >= 10 ? min : '0' + min
    },
    seconds() {
      var sec = this.duration - this.minutes * 60
      return sec >= 10 ? sec : '0' + sec
    }
  },
  methods: {
    start() {
      this.makingSelection = false
      this.inUse = true
      this.isEmpty = false
      this.isFinish = false

      this.timerRunning = true
      this.interval = setInterval(() => {
        if (this.timerRunning == true) {
          this.duration--

          if (this.duration == 0) {
            this.finish()
            clearInterval(this.interval)
          }
        }
      }, 1000)
    },
    finish() {
      this.duration = time * 60
      this.inUse = false
      this.isEmpty = false
      this.isFinish = true
    },
    reset() {
      this.duration = time * 60
      this.inUse = false
      this.isFinish = false
      this.isEmpty = true
    }
  }
}
</script>
