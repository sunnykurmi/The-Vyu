import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";

const StayCloudContainer = () => {
  return (
    <Clouds material={THREE.MeshBasicMaterial}
      position={[0, -5, 10]}
      frustumCulled={false}>
     
      <Cloud
        seed={7}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[0, -8,0 ]}
        smallestVolume={2}
        scale={3}
        volume={3}
        fade={0.1}
        speed={0}/>
    </Clouds>);
}

export default StayCloudContainer;