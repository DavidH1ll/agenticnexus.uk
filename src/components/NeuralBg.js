'use client'

import { useEffect, useRef } from 'react'

export default function NeuralBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const ACCENT = { r: 56, g: 189, b: 248 }
    const MAX_DIST = 130
    const MOUSE_RADIUS = 120
    const NODE_COUNT_DIVISOR = 18000

    let nodes = []
    let raf = 0
    let running = true
    const mouse = { x: -9999, y: -9999, active: false }

    const cssWidth = () => canvas.offsetWidth
    const cssHeight = () => canvas.offsetHeight

    const initNodes = () => {
      const w = cssWidth()
      const h = cssHeight()
      const count = Math.min(72, Math.floor((w * h) / NODE_COUNT_DIVISOR))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1.2 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      canvas.width = cssWidth() * dpr
      canvas.height = cssHeight() * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes()
    }

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const d = Math.sqrt(d2)
            const opacity = (1 - d / MAX_DIST) * 0.32
            ctx.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    const drawNodes = (t) => {
      for (const n of nodes) {
        const pulse = reducedMotion ? 1 : 0.7 + 0.3 * Math.sin(t * 0.0012 + n.phase)
        ctx.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.55 * pulse})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const updateNodes = () => {
      const w = cssWidth()
      const h = cssHeight()
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        if (mouse.active && !isTouch) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
            const d = Math.sqrt(d2) || 0.01
            const force = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * 0.6
            n.x += (dx / d) * force
            n.y += (dy / d) * force
          }
        }
      }
    }

    const tick = (t) => {
      if (!running) return
      ctx.clearRect(0, 0, cssWidth(), cssHeight())
      updateNodes()
      drawConnections()
      drawNodes(t)
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x
        mouse.y = y
        mouse.active = true
      } else {
        mouse.active = false
      }
    }

    const onVisibility = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!isTouch) window.addEventListener('mousemove', onMove)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  )
}
