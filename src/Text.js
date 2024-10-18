import * as THREE from "three";
import React, { forwardRef, useLayoutEffect, useRef, useMemo, useEffect } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { extend, useLoader } from '@react-three/fiber'

extend({TextGeometry })


const Text = forwardRef(({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }, ref) => {
    const font = useLoader(FontLoader, '/bold.json')
    const config = useMemo(() => ({ font, size: 30, height: 50 }), [font])
    const mesh = useRef()
    useLayoutEffect(() => {
      const size = new THREE.Vector3()
      mesh.current.geometry.computeBoundingBox()
      mesh.current.geometry.boundingBox.getSize(size)
      mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      mesh.current.position.y = vAlign === 'center' ? -size.y : vAlign === 'top' ? 0 : -size.y
    }, [children])



    return (
      <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
        <mesh ref={mesh} 
        >
          <textGeometry args={[children, config]} />
          <meshStandardMaterial color={color} 
          emissive="#ffffff"
          emissiveIntensity={2.0}
          />
        </mesh>
      </group>
    )
  })
export default Text