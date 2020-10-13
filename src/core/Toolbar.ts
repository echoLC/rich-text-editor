import { DEFAULT_TOOLBAR_BUTTONS, ToolbarButton } from './default'
import CEvent from '../utils/Event'

export interface ToolbarOptions {
  toolbars?: ToolbarButton[]
  event: CEvent
}

class Toolbar {
  toolbar: ToolbarButton[]
  event: CEvent

  constructor(options: ToolbarOptions = { event: new CEvent() }) {
    this.toolbar = options.toolbars ?? DEFAULT_TOOLBAR_BUTTONS
    this.event = options.event
  }

  initToolbar() {
    const toolbarContainer = document.createElement('div')
    toolbarContainer.className = 'editor-toolbar'
    for (let i = 0; i < this.toolbar.length; i++) {
      const item = this.toolbar[i]
      const button = document.createElement('button')
      button.id = `editorToolbarButton-${item.name}`
      button.className = `editor-toolbar-button editor-toolbar-button-${item.name}`
      const img = document.createElement('img')
      img.src = item.icon
      button.appendChild(img)

      button.addEventListener('click', () => {
        this.event.emit(`EditorEvent-${item.name}`)
      })

      toolbarContainer.appendChild(button)
    }
    return toolbarContainer
  }

  addButton(button: ToolbarButton) {
    this.toolbar.push(button)
  }
}

export default Toolbar
