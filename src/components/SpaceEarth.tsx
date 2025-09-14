
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Full-bleed background with a rotating Earth-like sphere,
 * stars, and a small "satellite" dot orbiting. No external textures;
 * uses procedural colors to keep bundle small.
 */
export default function SpaceEarthBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.002)

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000)
    camera.position.set(0, 0.6, 4.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // transparent to blend with page
    mount.appendChild(renderer.domElement)

    // Resize handling
    const resize = () => {
      const w = mount.clientWidth || window.innerWidth
      const h = mount.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(mount)

    // Lights (warm key + cool fill to match orange theme)
    const ambient = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xff7a45, 1.0)
    dir.position.set(3, 2, 2)
    scene.add(dir)
    const rim = new THREE.PointLight(0x88aaff, 0.4, 10)
    rim.position.set(-4, -1.5, -2)
    scene.add(rim)

    // Stars
    {
      const starGeo = new THREE.BufferGeometry()
      const starCount = 1200
      const positions = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount; i++) {
        const r = 60 * Math.cbrt(Math.random())
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const starMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.8 })
      const stars = new THREE.Points(starGeo, starMat)
      scene.add(stars)
    }

    // Earth-like sphere (gradient + subtle emissive)
    const earthGroup = new THREE.Group()
    scene.add(earthGroup)

    const earthGeo = new THREE.SphereGeometry(1, 64, 64)
    // Use onBeforeCompile to inject a vertical gradient + subtle bands
    const earthMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a2f3a'),
      metalness: 0.05,
      roughness: 0.9,
      emissive: new THREE.Color('#1a1a1a'),
      emissiveIntensity: 0.4
    })
    earthMat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        // vWorldPosition not available; use normal for a faux latitude gradient
        float v = (normal.y * 0.5 + 0.5);
        vec3 deep = vec3(0.06, 0.07, 0.10);
        vec3 shallow = vec3(0.09, 0.12, 0.16);
        diffuseColor.rgb = mix(deep, shallow, smoothstep(0.0, 1.0, v)) * 1.2;
        `
      );
    }
    const earth = new THREE.Mesh(earthGeo, earthMat)
    earth.castShadow = false
    earth.receiveShadow = false
    earthGroup.add(earth)

    // Thin atmosphere glow using additive material
    const glowGeo = new THREE.SphereGeometry(1.06, 64, 64)
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    earthGroup.add(glow)

    // Equatorial orbit path + satellite
    const orbitGeo = new THREE.TorusGeometry(1.6, 0.0025, 8, 180)
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.45 })
    const orbit = new THREE.Mesh(orbitGeo, orbitMat)
    orbit.rotation.x = Math.PI / 2
    earthGroup.add(orbit)

    const satGeo = new THREE.SphereGeometry(0.025, 16, 16)
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const satellite = new THREE.Mesh(satGeo, satMat)
    earthGroup.add(satellite)

    // Animation loop
    let raf = 0
    const start = performance.now()
    const tick = () => {
      const t = (performance.now() - start) * 0.001
      earth.rotation.y += 0.003
      // Satellite orbit around earth
      const R = 1.6
      satellite.position.set(Math.cos(t * 0.6) * R, 0, Math.sin(t * 0.6) * R)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Cleanup
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      earthGeo.dispose(); glowGeo.dispose(); orbitGeo.dispose(); satGeo.dispose()
      ;(earthMat as any).dispose?.(); glowMat.dispose(); orbitMat.dispose(); satMat.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ filter: 'saturate(1.05) brightness(0.95)' }}
    />
  )
}
