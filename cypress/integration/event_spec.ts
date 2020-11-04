import EventBus from '../../src/utils/Event'

const eventType = 'eventType'

describe('utils EventBus', () => {
  it('should can subscribe a specify event', () => {
    const event = new EventBus()
    const fn = cy.stub()

    event.on(eventType, fn)

    event.emit(eventType)

    expect(fn).to.be.called
  })

  it('should can subscribe multiple times', () => {
    const event = new EventBus()
    const fn = cy.stub()

    event.on(eventType, fn)
    event.on(eventType, fn)

    event.emit(eventType)

    expect(fn).to.be.calledTwice
  })

  it('should can unsubscribe a specify event', () => {
    const event = new EventBus()
    const fn = cy.stub()

    event.on(eventType, fn)
    event.off(eventType)

    event.emit(eventType)

    expect(fn).not.to.be.called
  })

  it('should can subscribe all listenner', () => {
    const event = new EventBus()
    const otherEventType = 'otherEventType'
    const fn1 = cy.stub()
    const fn2 = cy.stub()

    event.on(eventType, fn1)
    event.on(otherEventType, fn2)

    event.off()

    event.emit(eventType)
    event.emit(otherEventType)

    expect(fn1).not.to.be.called
    expect(fn2).not.to.be.called
  })
})
