"use client"

import { useState, useEffect } from 'react'

interface BreakpointConfig {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

const breakpoints: BreakpointConfig = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowSize.width < breakpoints.md
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg
  const isDesktop = windowSize.width >= breakpoints.lg

  const isXs = windowSize.width < breakpoints.sm
  const isSm = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.md
  const isMd = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg
  const isLg = windowSize.width >= breakpoints.lg && windowSize.width < breakpoints.xl
  const isXl = windowSize.width >= breakpoints.xl && windowSize.width < breakpoints['2xl']
  const is2Xl = windowSize.width >= breakpoints['2xl']

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    breakpoints,
  }
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}