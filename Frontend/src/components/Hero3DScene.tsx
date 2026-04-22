import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Shape {
  mesh: THREE.Mesh
  basePos: THREE.Vector3
  rotSpeed: { x: number; y: number }
  floatSpeed: number
  floatAmp: number
}

export default function Hero3DScene({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Scene + Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 7)

    // Lighting - soft, minimal
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xc8d8ff, 0.6)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0x005bc4, 0.4, 25)
    pointLight.position.set(-3, 3, 4)
    scene.add(pointLight)

    const warmLight = new THREE.PointLight(0x9e4400, 0.15, 20)
    warmLight.position.set(4, -2, 3)
    scene.add(warmLight)

    // Materials - glassmorphic, subtle
    const glassPrimary = new THREE.MeshStandardMaterial({
      color: 0x005bc4,
      transparent: true,
      opacity: 0.12,
      roughness: 0.15,
      metalness: 0.3,
      side: THREE.DoubleSide,
    })

    const glassSecondary = new THREE.MeshStandardMaterial({
      color: 0x8ba4c4,
      transparent: true,
      opacity: 0.08,
      roughness: 0.1,
      metalness: 0.2,
      side: THREE.DoubleSide,
    })

    const wireframe = new THREE.MeshStandardMaterial({
      color: 0x565e74,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })

    const accent = new THREE.MeshStandardMaterial({
      color: 0x9e4400,
      transparent: true,
      opacity: 0.07,
      roughness: 0.2,
      metalness: 0.1,
    })

    // Check if mobile
    const isMobile = container.clientWidth < 768

    // Shape definitions - right-biased for desktop, centered for mobile
    const shapeDefs = isMobile
      ? [
          {
            geo: new THREE.IcosahedronGeometry(1.4, 1),
            mat: glassPrimary,
            pos: [1, 0.5, -2] as const,
            rot: { x: 0.0015, y: 0.002 },
            fSpeed: 0.4,
            fAmp: 0.25,
          },
          {
            geo: new THREE.TorusGeometry(0.6, 0.2, 16, 32),
            mat: wireframe,
            pos: [-1, -1, -3] as const,
            rot: { x: 0.002, y: 0.0015 },
            fSpeed: 0.6,
            fAmp: 0.2,
          },
        ]
      : [
          {
            geo: new THREE.IcosahedronGeometry(1.5, 1),
            mat: glassPrimary,
            pos: [2.8, 0.5, -1.5] as const,
            rot: { x: 0.0015, y: 0.0025 },
            fSpeed: 0.4,
            fAmp: 0.3,
          },
          {
            geo: new THREE.TorusGeometry(0.9, 0.22, 16, 40),
            mat: wireframe,
            pos: [-1.2, -1.2, -2.5] as const,
            rot: { x: 0.0025, y: 0.0015 },
            fSpeed: 0.6,
            fAmp: 0.2,
          },
          {
            geo: new THREE.OctahedronGeometry(0.8, 0),
            mat: accent,
            pos: [3.8, -1.8, -2] as const,
            rot: { x: 0.001, y: 0.003 },
            fSpeed: 0.35,
            fAmp: 0.22,
          },
          {
            geo: new THREE.SphereGeometry(0.55, 24, 24),
            mat: glassSecondary,
            pos: [-2.2, 1.6, -1] as const,
            rot: { x: 0.002, y: 0.001 },
            fSpeed: 0.55,
            fAmp: 0.15,
          },
          {
            geo: new THREE.TetrahedronGeometry(0.45, 0),
            mat: glassPrimary.clone(),
            pos: [1, -2.2, -1.8] as const,
            rot: { x: 0.003, y: 0.002 },
            fSpeed: 0.7,
            fAmp: 0.18,
          },
        ]

    // Create meshes
    const shapes: Shape[] = shapeDefs.map(def => {
      const mesh = new THREE.Mesh(def.geo, def.mat)
      const basePos = new THREE.Vector3(...def.pos)
      mesh.position.copy(basePos)
      scene.add(mesh)
      return {
        mesh,
        basePos,
        rotSpeed: def.rot,
        floatSpeed: def.fSpeed,
        floatAmp: def.fAmp,
      }
    })

    // Mouse tracking (smooth lerp)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    // Animation loop
    const clock = new THREE.Clock()
    let rafId: number

    function animate() {
      rafId = requestAnimationFrame(animate)
      if (pausedRef.current) return

      const t = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.03
      mouse.y += (mouse.targetY - mouse.y) * 0.03

      shapes.forEach(({ mesh, basePos, rotSpeed, floatSpeed, floatAmp }) => {
        mesh.rotation.x += rotSpeed.x
        mesh.rotation.y += rotSpeed.y
        mesh.position.y = basePos.y + Math.sin(t * floatSpeed) * floatAmp
        mesh.position.x = basePos.x + Math.sin(t * floatSpeed * 0.7) * floatAmp * 0.3
      })

      // Camera follows mouse subtly
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.015
      camera.position.y += (-mouse.y * 0.25 - camera.position.y) * 0.015
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      shapes.forEach(({ mesh }) => {
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) mesh.material.forEach(m => m.dispose())
        else (mesh.material as THREE.Material).dispose()
      })
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}
