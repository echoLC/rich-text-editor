export type Action = {
  type: string
  payload: any
}

export const toolbarButtonClickAction = (type: string, payload?: any): Action => ({
  type: `toolbar-button-${type}-click`,
  payload,
})
