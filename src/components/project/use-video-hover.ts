import { useRef } from 'react'

export function useVideoHover() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const state = useRef('idle')

  const forceLayout = () => {
    void videoRef.current?.offsetWidth
  }

  const showVideo = () => {
    forceLayout()
    const container = videoContainerRef.current
    if (!container) return
    container.style.opacity = '1'
    container.style.transition = ''
  }

  const hideVideo = (durationSeconds = 0.5) => {
    forceLayout()
    const container = videoContainerRef.current
    if (!container) return
    container.style.opacity = '0'
    container.style.transition = `opacity ${durationSeconds}s linear`
  }

  const handleMouseEnter = () => {
    if (state.current === 'idle') {
      state.current = 'playing'
      videoRef.current?.play()
      showVideo()
    } else if (state.current === 'leaving') {
      state.current = 'looping'
    }
  }

  const handleMouseLeave = () => {
    state.current = 'leaving'
    hideVideo()
  }

  const handleVideoEnd = () => {
    state.current = 'looping'
    hideVideo()
  }

  const handleTransitionEnd = () => {
    if (state.current === 'leaving') {
      state.current = 'idle'
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.pause()
      }
    } else if (state.current === 'looping') {
      state.current = 'playing'
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
      showVideo()
    }
  }

  return {
    videoRef,
    videoContainerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleVideoEnd,
    handleTransitionEnd,
  }
}
