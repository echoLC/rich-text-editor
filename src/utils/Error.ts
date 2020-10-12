export default class EditorError extends Error {
  constructor(message: string) {
    const editorMessage = `Editor Error: ${message}`
    super(editorMessage)
  }
}
