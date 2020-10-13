import headIcon from '../icons/header.png'
import boldIcon from '../icons/bold.png'
import italicIcon from '../icons/italic.png'

export type ToolbarButton = {
  name: 'bold' | 'heading' | 'italic'
  icon: string
}

export const DEFAULT_TOOLBAR_BUTTONS: ToolbarButton[] = [
  {
    name: 'heading',
    icon: headIcon,
  },
  {
    name: 'bold',
    icon: boldIcon,
  },
  {
    name: 'italic',
    icon: italicIcon,
  },
]
