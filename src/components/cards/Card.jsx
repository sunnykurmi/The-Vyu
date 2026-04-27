import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

function Card({ textureUrl, title, position }) {
    
  const material = useMemo(() => {
    const tex = new THREE.TextureLoader().load(textureUrl);
    tex.encoding = THREE.sRGBEncoding;
    tex.minFilter = THREE.LinearFilter;
    return new THREE.MeshBasicMaterial({ map: tex });
  }, [textureUrl]);

  return (
    <group position={position}>

      <mesh material={material}>
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      </mesh>

      <Text
        position={[0, -CARD_HEIGHT / 2 - 0.3, 0.01]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="top"
      >
        {title}
      </Text>

    </group>
  );
}


export default Card