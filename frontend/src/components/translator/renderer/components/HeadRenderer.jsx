import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HEAD_MATERIAL } from "../materials/materials";

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;

export default function HeadRenderer({ frameRef }) {
    const coreRef = useRef();

    const center = useMemo(() => new THREE.Vector3(), []);
    const left = useMemo(() => new THREE.Vector3(), []);
    const right = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        const frame = frameRef.current;
        const leftShoulder = frame?.[LEFT_SHOULDER];
        const rightShoulder = frame?.[RIGHT_SHOULDER];

        if (!leftShoulder || !rightShoulder || !coreRef.current) return;

        left.set(...leftShoulder);
        right.set(...rightShoulder);
        center.copy(left).add(right).multiplyScalar(0.5);

        const shoulderWidth = left.distanceTo(right);
        const radius = THREE.MathUtils.clamp(shoulderWidth * 0.32, 0.055, 0.10);

        center.y += shoulderWidth * 0.72;
        coreRef.current.position.copy(center);
        coreRef.current.scale.set(radius, radius * 1.2, radius);
    });

    return (
        <mesh ref={coreRef} frustumCulled={false} castShadow receiveShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <primitive object={HEAD_MATERIAL} attach="material" />
        </mesh>
    );
}
