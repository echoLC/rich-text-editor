import Editor from './core/Editor'
import './style/index.css'
import './style/normalize.css'

const editor = new Editor('#editor', {
  value: '<div>test</div>',
})
