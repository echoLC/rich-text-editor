import EditorError from '../utils/Error'
import Toolbar from '../toolbar/index'
import CEvent from '../utils/Event'

const DEFAULT_TOOLBAR = ['header', 'bold', 'italic']

export interface EditorOptions {
  id: string
}

class Editor {
  id: string
  toolbar: Toolbar
  event: CEvent

  constructor(options: EditorOptions) {
    this.id = options.id

    this.event = new CEvent()

    for (let i = 0; i < DEFAULT_TOOLBAR.length; i++) {
      const type = DEFAULT_TOOLBAR[i]

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
    const container = document.getElementById(this.id)
    if (container == null) {
      throw new EditorError(`can not find editor container element which id is ${this.id}`)
    }
    container.className = 'editor-container'
    const contentArea = this.initContentArea()
    const toolbar = this.toolbar.initToolbar()
    container.appendChild(toolbar)
    container.appendChild(contentArea)
  }

  private initContentArea() {
    const container = document.createElement('div')
    container.className = 'editor-content'
    container.id = 'EditorContent'
    container.contentEditable = 'true'
    container.className = 'editor-content'
    return container
  }

  setTextStyle(type: string) {
    console.log(type)
  }

  destroy() {}
}

export default Editor
