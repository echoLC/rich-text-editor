export function getContentRange(content: HTMLDivElement) {
  const selection = window.getSelection()
  if (selection == null || selection.rangeCount === 0) return null

  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(0)
    let start = range.startContainer
    let end = range.endContainer

    // 兼容IE11 node.contains(textNode) 永远 return false的bug
    start = (start.nodeType === Node.TEXT_NODE ? start.parentNode : start)!
    end = (end.nodeType === Node.TEXT_NODE ? end.parentNode : end)!

    if (content.contains(start) && content.contains(end)) return range
  }
}

export function addRange(range: Range | null) {
  if (range == null) return

  const selection = window.getSelection()
  if (selection != null) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
