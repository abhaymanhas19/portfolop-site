
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Resize
    const resize = () => {
      const w = el.clientWidth || window.innerWidth
      const h = el.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(el)

    // Particle geometry
    const COUNT = 800
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i*3+0] = (Math.random() - 0.5) * 12
      pos[i*3+1] = (Math.random() - 0.5) * 8
      pos[i*3+2] = (Math.random() - 0.5) * 10
      vel[i*3+0] = (Math.random() - 0.5) * 0.002
      vel[i*3+1] = (Math.random() - 0.5) * 0.004
      vel[i*3+2] = (Math.random() - 0.5) * 0.002
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ size: 0.03, color: 0xff6b35, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let raf = 0
    const animate = () => {
      const p = geo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < COUNT; i++) {
        let x = p.getX(i) + vel[i*3+0]
        let y = p.getY(i) + vel[i*3+1]
        let z = p.getZ(i) + vel[i*3+2]
        // gentle wrap
        if (x > 6) x = -6; if (x < -6) x = 6
        if (y > 4) y = -4; if (y < -4) y = 4
        if (z > 5) z = -5; if (z < -5) z = 5
        p.setXYZ(i, x, y, z)
      }
      p.needsUpdate = true
      points.rotation.y += 0.0008
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeChild(renderer.domElement)
      renderer.dispose()
      geo.dispose(); mat.dispose()
    }
  }, [])

  return <div ref={ref} className="pointer-events-none absolute inset-0 z-10" />
}
