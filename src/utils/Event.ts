type Fn = (...args: any[]) => void

class CEvent {
  events: Map<string, Fn[]>

  constructor() {
    this.events = new Map()
  }

  on(eventName: string, callback: Fn) {
    const eventList = this.events.get(eventName)
    if (eventList != null) {
      eventList.push(callback)
    } else {
      this.events.set(eventName, [callback])
    }
  }

  emit(eventName: string, ...args: any[]) {
    const eventList = this.events.get(eventName)
    if (eventList != null) {
      for (let i = 0; i < eventList.length; i++) {
        const fn = eventList[i]
        fn.call(null, ...args)
      }
    }
  }

  off(eventName?: string) {
    if (eventName == null) {
      this.events.clear()
    } else {
      this.events.delete(eventName!)
    }
  }
}

export default CEvent
