import generateUniqueId from '../utils/generateId'

class ContentEditable {
  value?: string
  element: HTMLElement

  constructor(value?: string) {
    this.value = value

    this.element = this.createContentEditable()
  }

  createContentEditable(): HTMLElement {
    const contentEditable = document.createElement('div')
    contentEditable.className = 'editor-content'
    contentEditable.id = generateUniqueId('EditorContent')
    contentEditable.contentEditable = 'true'
    if (this.value != null) {
      contentEditable.innerHTML = this.value
    }
    return contentEditable
  }
}

export default ContentEditable
