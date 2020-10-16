export default function generateUniqueId(type: string) {
  return `${type}-${Date.now()}`
}
