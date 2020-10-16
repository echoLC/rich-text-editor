# rich-text-editor
一个简易的富文本编辑框，目前只支持标题、加粗、斜体等功能。

## 使用
对于编辑器的引用，支持多种方式，可以直接通过 `script` 标签的方式引用：
```html
<script src="editor.umd.js"></script>
<script>
  const editor = new Editor('#editor', {
    value: '<div>默认内容</div>'
  })
</script>
```
模块化方式引入：
```js
import Editor from 'rich-text-editor'

const editor = new Editor('#editor', {
  value: '<div>默认内容</div>'
})
```
