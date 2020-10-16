import Event from '../../src/utils/Event'

const eventType = 'eventType'

describe('EventBus', () => {
  test('should can subscribe a specify event', () => {
    const event = new Event()
    const fn = jest.fn()

    event.on(eventType, fn)

    event.emit(eventType)

    expect(fn).toBeCalledTimes(1)
  })

  test('should can subscribe multiple times', () => {
    const event = new Event()
    const fn = jest.fn()

    event.on(eventType, fn)
    event.on(eventType, fn)

    event.emit(eventType)

    expect(fn).toBeCalledTimes(2)
  })

  test('should can unsubscribe a specify event', () => {
    const event = new Event()
    const fn = jest.fn()

    event.on(eventType, fn)
    event.off(eventType)

    event.emit(eventType)

    expect(fn).not.toBeCalled()
  })

  test('should can subscribe all listenner', () => {
    const event = new Event()
    const otherEventType = 'otherEventType'
    const fn1 = jest.fn()
    const fn2 = jest.fn()

    event.on(eventType, fn1)
    event.on(otherEventType, fn2)

    event.off()

    event.emit(eventType)
    event.emit(otherEventType)

    expect(fn1).not.toBeCalled()
    expect(fn2).not.toBeCalled()
  })
})
