import EditorError from '../utils/Error'
import Toolbar from './Toolbar'
import ContentEditable from './ContentEditable'
import CEvent from '../utils/Event'
import generateUniqueId from '../utils/generateId'
import { DEFAULT_TOOLBAR_BUTTONS, ToolbarButton } from './default'
import { toolbarButtonClickAction } from './Action'

export interface EditorOptions {
  value?: string
  toolbars?: ToolbarButton[]
}

class Editor {
  selector: string | HTMLElement
  toolbar: Toolbar
  event: CEvent
  value: string | undefined
  id: string
  contentEditable: ContentEditable
  container?: HTMLElement
  range?: Range | null

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

    this.contentEditable.element.addEventListener('blur', () => {
      this.saveRange()
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
      container.id = generateUniqueId(`EditorContainer`)
    }
    const contentArea = this.contentEditable.element
    const toolbar = this.toolbar.initToolbar()
    container.appendChild(toolbar)
    container.appendChild(contentArea)

    this.container = container
  }

  setTextStyle(type: string) {
    // 添加效果之前，先设置range
    this.setRange()

    if (type === 'heading') {
      document.execCommand('formatBlock', false, 'h1')
    } else {
      document.execCommand(type)
    }
  }
  // 保存当前range
  saveRange() {
    const selection = window.getSelection()
    if (selection == null || selection.rangeCount === 0) {
      return
    }
    const content = this.contentEditable.element
    for (let i = 0; i < selection.rangeCount; i++) {
      // 从selection中获取第一个Range对象
      const range = selection.getRangeAt(0)
      let start = range.startContainer
      let end = range.endContainer
      // 兼容IE11 node.contains(textNode) 返回false的bug
      start = start.nodeType === Node.TEXT_NODE ? start.parentNode! : start
      end = end.nodeType === Node.TEXT_NODE ? end.parentNode! : end
      if (content.contains(start) && content.contains(end)) {
        this.range = range
        break
      }
    }
  }

  setRange() {
    const selection = window.getSelection()
    if (selection == null) return
    // 清除当前range
    selection.removeAllRanges()

    if (this.range != null) {
      selection.addRange(this.range)
    } else {
      // 如果没有，创建一个新的range存起来
      const content = this.contentEditable.element
      const row = document.createElement('br')
      const range = document.createRange()
      content.appendChild(row)
      range.setStart(row, 0)
      range.setEnd(row, 0)
      selection.addRange(range)
      this.range = range
    }
  }

  destroy() {
    if (this.container != null) {
      this.container.innerHTML = ''
    }
  }
}

export default Editor
