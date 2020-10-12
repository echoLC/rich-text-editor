import headIcon from '../icons/header.png'
import boldIcon from '../icons/bold.png'
import italicIcon from '../icons/italic.png'
import CEvent from '../utils/Event'

const DEFAULT_TOOLBAR = ['header', 'bold', 'italic']

const iconMap = {
  header: headIcon,
  bold: boldIcon,
  italic: italicIcon,
}

export interface ToolbarOptions {
  toolbars?: string[]
  event: CEvent
}

class Toolbar {
  toolbar: string[]
  event: CEvent

  constructor(options: ToolbarOptions = { event: new CEvent() }) {
    this.toolbar = options.toolbars ?? DEFAULT_TOOLBAR
    this.event = options.event
    console.log(this.event)
  }

  initToolbar() {
    const toolbarContainer = document.createElement('div')
    toolbarContainer.className = 'editor-toolbar'
    for (let i = 0; i < this.toolbar.length; i++) {
      const bar = this.toolbar[i]
      const button = document.createElement('button')
      button.id = `editorToolbarButton-${bar}`
      button.className = `editor-toolbar-button editor-toolbar-button-${bar}`
      const img = document.createElement('img')
      img.src = iconMap[bar as keyof typeof iconMap]
      button.appendChild(img)

      button.addEventListener('click', () => {
        this.event.emit(`EditorEvent-${bar}`)
      })

      toolbarContainer.appendChild(button)
    }
    return toolbarContainer
  }

  addOne(feature: string) {
    this.toolbar.push(feature)
  }
}

export default Toolbar
