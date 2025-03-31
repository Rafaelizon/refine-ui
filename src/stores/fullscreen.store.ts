import { useFullscreen } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useFullscreenStore = defineStore('fullscreen', () => {
  const { isFullscreen, toggle } = useFullscreen()

  return { isFullscreen, toggle }
})
