import EditorError from '../utils/Error'
import Toolbar from './Toolbar'
import CEvent from '../utils/Event'
import { DEFAULT_TOOLBAR_BUTTONS } from './default'

export interface EditorOptions {
  value: string
}

class Editor {
  selector: string | HTMLElement
  toolbar: Toolbar
  event: CEvent
  value: string | undefined
  id: string

  constructor(selector: string | HTMLElement, options?: EditorOptions) {
    this.selector = selector
    this.value = options?.value
    this.id = this.getUniqueId()

    this.event = new CEvent()

    for (let i = 0; i < DEFAULT_TOOLBAR_BUTTONS.length; i++) {
      const type = DEFAULT_TOOLBAR_BUTTONS[i].name

      this.event.on(`EditorEvent-${type}`, () => {
        this.setTextStyle(type)
      })
    }

    this.toolbar = new Toolbar({
      event: this.event,
    })

    this.init()
  }

  private init() {
    const selector = this.selector
    let container: HTMLElement | null
    if (selector instanceof HTMLElement) {
      container = selector
    } else {
      container = document.querySelector(selector)
    }
    if (container == null) {
      throw new EditorError(
        `can not find editor container element which selector is ${this.selector}`
      )
    }
    container.className = 'editor-container'
    if (container.id === '') {
      container.id = `EditorContainer-${this.id}`
    }
    const contentArea = this.initContentArea()
    const toolbar = this.toolbar.initToolbar()
    container.appendChild(toolbar)
    container.appendChild(contentArea)
  }

  private initContentArea() {
    const container = document.createElement('div')
    container.className = 'editor-content'
    container.id = `EditorContent-${this.id}`
    container.contentEditable = 'true'
    container.className = 'editor-content'
    if (this.value != null) {
      container.innerHTML = this.value
    }
    return container
  }

  private getUniqueId() {
    const now = Date.now()
    return `Editor-${now}`
  }

  setTextStyle(type: string) {
    if (type === 'heading') {
      document.execCommand('formatBlock', false, 'h1')
    } else {
      document.execCommand(type)
    }
  }

  destroy() {}
}

export default Editor
