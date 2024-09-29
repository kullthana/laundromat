import { createStore } from 'vuex'

const time = 1

const store = createStore({
  state() {
    return {
      duration: time * 60,
      isEmpty: true,
      inUse: false,
      isFinish: false,
      rate: 10,
      makingSelection: false,
      timerRunning: false,
      timerPaused: false,
      interval: null
    }
  }
})

export default store
