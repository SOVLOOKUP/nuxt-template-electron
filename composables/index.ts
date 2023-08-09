export const useWindowSizeStore = defineStore('counter', () => {
  // 屏幕宽度
  const windowWidth = useState('windowWidth', () => globalThis.innerWidth)
  // 屏幕高度
  const windowHeight = useState('windowHeight', () => globalThis.innerWidth)

  const resize = () => {
    windowWidth.value = globalThis.innerWidth
    windowHeight.value = globalThis.innerHeight
  }

  return { windowWidth, windowHeight, resize }
})
