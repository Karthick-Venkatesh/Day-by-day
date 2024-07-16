import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Button, View } from 'react-native';
import {Model} from "../components/Model.jsx";
import { StatusBar } from 'expo-status-bar';
import { useSpring, animated } from '@react-spring/three';



export default function HomeScreen({ navigation }) {

//   const [modelIndex, setModelIndex] = useState(0);
  const [scale, setScale] = useState([1, 1, 1]);

  const handlePress = () => {
    setScale([1.5, 1.5, 1.5]);
    setTimeout(() => {
      navigation.navigate('Detail');
    }, 280); // Adjust delay as needed
  };
  const { animatedScale } = useSpring({
    animatedScale: scale,
    config: { tension: 170, friction: 12 }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScale([1, 1, 1]); // Reset scale when screen gains focus
    });
    return unsubscribe;
}, [navigation]);


//   const models = [
//     { src: require("../assets/models/trees.glb"), scale: [2, 2, 2] },
//     { src: require("../assets/models/houses.glb"), scale: [0.5, 0.5, 0.5] },
//     { src: require("../assets/models/pot.glb"), scale: [15, 15, 15] },
//     {src: require("../assets/models/calendar.glb"), scale: [1, 1, 1] }
//   ];

//   const toggleModel = () => {
//     setModelIndex((prevIndex) => (prevIndex + 1) % models.length);
//   };

  return (
    <View style={{ flex: 1,}}>
    <Canvas style={{ height: '70%', width: '100%' }}>
    <ambientLight intensity={0.5} />
     <directionalLight position={[0,10,2]} intensity={1} />
      <ambientLight />
      <Suspense fallback={null}>
      <animated.group scale={animatedScale}>
      <Model  onPointerDown={handlePress}/>
      </animated.group>
      </Suspense>
    </Canvas>
    {/* <Button
        title="Change Model"
        onPress={toggleModel}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}




