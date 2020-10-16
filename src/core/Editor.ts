import EditorError from '../utils/Error'
import Toolbar from './Toolbar'
import ContentEditable from './ContentEditable'
import CEvent from '../utils/Event'
import generateUniqueId from '../utils/generateId'
import { DEFAULT_TOOLBAR_BUTTONS, ToolbarButton } from './default'
import { toolbarButtonClickAction } from './Action'

export interface EditorOptions {
  value: string
  toolbars: ToolbarButton[]
}

class Editor {
  selector: string | HTMLElement
  toolbar: Toolbar
  event: CEvent
  value: string | undefined
  id: string
  contentEditable: ContentEditable
  container?: HTMLElement

  constructor(selector: string | HTMLElement, options?: EditorOptions) {
    this.selector = selector
    this.value = options?.value
    this.id = generateUniqueId('Editor')

    this.event = new CEvent()

    for (let i = 0; i < DEFAULT_TOOLBAR_BUTTONS.length; i++) {
      const type = DEFAULT_TOOLBAR_BUTTONS[i].name
      const action = toolbarButtonClickAction(type)

      this.event.on(action.type, () => {
        this.setTextStyle(type)
      })
    }

    this.toolbar = new Toolbar({
      event: this.event,
      toolbars: options?.toolbars,
    })

    this.contentEditable = new ContentEditable(this.value)

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
      container.id = generateUniqueId(`EditorContainer`)
    }
    const contentArea = this.contentEditable.element
    const toolbar = this.toolbar.initToolbar()
    container.appendChild(toolbar)
    container.appendChild(contentArea)

    this.container = container
  }

  setTextStyle(type: string) {
    if (type === 'heading') {
      document.execCommand('formatBlock', false, 'h1')
    } else {
      document.execCommand(type)
    }
  }

  destroy() {
    if (this.container != null) {
      this.container.innerHTML = ''
    }
  }
}

export default Editor
