import { Suspense, useRef, useState } from "react";
import {Gltf,Float} from "@react-three/drei/native";
import { useSpring, animated,a } from "@react-spring/three";
import Calendar from "../assets/models/calendar.glb";


export const  Model = ({src,scale, onPointerDown}) =>{
    const modelRef = useRef();
    const [isScaled, setIsScaled] = useState(false);

    const handlePointerDown = () => {
        setIsScaled(true);
        setTimeout(() => setIsScaled(false), 2000); // Reset scale after 200ms
      };

    //************* */

    // const [spring, setSpring] = useSpring(() => ({
    //     scale: [1, 1, 1],
    //     config: { tension: 100, friction: 10 } // Adjust tension and friction for desired spring effect
    //   }));

    //   const handlePointerDown = () => {
    //     setSpring({ scale: [scale[0] * 1.2, scale[1] * 1.2, scale[2] * 1.2] }); // Scale up by 20%
    //     setTimeout(() => setSpring({ scale: [scale[0], scale[1], scale[2]] }), 200); // Reset scale after 200ms
    //   };


 
    return(
        <Suspense fallback={null}>
            <group >
            <Float
                floatingRange={  [-0.01, 0.01]}
                speed={ 4}
                rotationIntensity={2}
                >
                {/* <a.mesh
                ref={modelRef}
                scale={combinedScale} // Use spring scale here
                onPointerDown={handlePointerDown}
                > */}
                <Gltf
                ref={modelRef}
                src = {Calendar} 
                scale={ [1, 1 ,1]}
                onPointerDown={onPointerDown}
                />
                {/* </a.mesh> */}
                </Float>
            </group>
        </Suspense>
    )
}