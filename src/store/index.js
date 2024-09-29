import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      duration: 0,
      isEmpty: true,
      inUse: false,
      isFinish: false,
      rate: 0,
      makingSelection: false,
      timerRunning: false,
      timerPaused: false,
      interval: null
    }
  }
})

export default store
