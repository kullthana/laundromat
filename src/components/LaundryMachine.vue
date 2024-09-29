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
import axios from 'axios'

export default {
  name: 'LaundryMachine',
  data() {
    return {
      duration: this.$store.state.duration,
      isEmpty: this.$store.state.isEmpty,
      inUse: this.$store.state.inUse,
      isFinish: this.$store.state.isFinish,
      rate: this.$store.state.rate,
      makingSelection: this.$store.state.makingSelection,
      timerRunning: this.$store.state.timerRunning,
      interval: this.$store.state.interval,
      post: {}
    }
  },
  computed: {
    cost() {
      console.log(this.duration)
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

          if (this.duration == 59) {
            this.notify()
          }
        }
      }, 1000)
    },
    finish() {
      this.duration = this.$store.state.duration
      this.inUse = false
      this.isEmpty = false
      this.isFinish = true
    },
    reset() {
      this.duration = this.$store.state.duration
      this.inUse = this.$store.state.inUse
      this.isEmpty = this.$store.state.isEmpty
      this.isFinish = this.$store.state.isFinish
    },
    async getToken() {
      try {
        const { data } = await axios.post(
          'https://notify-bot.line.me/oauth/token',
          {
            grant_type: 'authorization_code',
            code: 'UhOchPD6AKSbZrxFXbOUQe',
            redirect_uri: 'http://localhost:5173/line/redirect',
            client_id: 'jEiKVR0q0xU5aXL9nHrI3r',
            client_secret: '4o8VE6wqS65Sa3cUdBWbTa2o688HZRWsoIjfw4l8v4V'
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        this.post = data
      } catch (error) {
        console.log(error)
      }
    },

    async notify() {
      try {
        const { data } = await axios.post(
          'https://notify-api.line.me/api/notify',
          {
            message: 'Test'
          },
          {
            headers: {
              Authorization: 'Bearer vnpW0ALe9z7nWyhHMIUXU5UxdpnkSTxUZD3pErsfUOn',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        this.post = data
      } catch (error) {
        console.log(error)
      }
    },
    beforeMount() {
      this.getToken()
      this.notify()
    }
  }
}
</script>
