import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Person from '../models/Person'

{/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
  POPUP
  
</div> */}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandForScreenSize = () => { 
    let screenScale = null;
    let screenPosition = [0, -2.5, -43];
    let rotation = [0.1, 4.7, -0.1];

    if(window.innerWidth < 768) {
      screenScale = [2.5, 2.5, 2.5];
    } else {
      screenScale = [4.9, 4.9, 4.9];
    }

    return [screenScale, screenPosition, rotation]
  }

  const adjustCharacterForScreenSize = () => { 
    let screenScale, screenPosition;

    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, 0];
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [charScale, charPosition] = adjustCharacterForScreenSize();

  return (
    <section className='w-full h-screen relative'>

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} 
        camera={{near: 0.1, far: 1000}}>

        <Suspense fallback={<Loader />}>
          <directionalLight position={[-100, 150, -100]} intensity={1}/>
          <ambientLight intensity={1.5}/>
          {/* <pointLight />
          <spotLight/> */}
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={2}/>

          <Sky />
          <Person
            isRotating={isRotating}
            charScale={charScale}
            charPosition={charPosition}
            rotation={[0, 20, 20]}
            />

          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            />
        </Suspense>

      </Canvas>

    </section>
  )
}

export default Home