import * as THREE from 'three';
import React, { useRef, useMemo, useEffect } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';



import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const Effects = () => {
    return (
      <EffectComposer>

        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.5} // Adjust intensity as needed
          luminanceThreshold={1} // Lower threshold for selective bloom
          luminanceSmoothing={0.9}
          height={300}
          
        />
      
         <Noise opacity={0.02} />


      <Vignette eskil={false} offset={0.01} darkness={1} /> {/**/}

      </EffectComposer>
    );
  };

export default Effects