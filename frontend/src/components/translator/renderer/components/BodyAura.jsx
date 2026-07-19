import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BODY_MATERIAL } from "../materials/materials";

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;
const LEFT_HIP = 23;
const RIGHT_HIP = 24;

export default function BodyAura({ frameRef }) {
    const coreRef = useRef();

    const leftShoulder = useMemo(() => new THREE.Vector3(), []);
    const rightShoulder = useMemo(() => new THREE.Vector3(), []);
    const leftHip = useMemo(() => new THREE.Vector3(), []);
    const rightHip = useMemo(() => new THREE.Vector3(), []);
    const shoulderCenter = useMemo(() => new THREE.Vector3(), []);
    const hipCenter = useMemo(() => new THREE.Vector3(), []);
    const torsoDirection = useMemo(() => new THREE.Vector3(), []);
    const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
    const rotation = useMemo(() => new THREE.Quaternion(), []);

    useFrame(() => {
        const frame = frameRef.current;

        const ls = frame?.[LEFT_SHOULDER];
        const rs = frame?.[RIGHT_SHOULDER];
        const lh = frame?.[LEFT_HIP];
        const rh = frame?.[RIGHT_HIP];

        if (!ls || !rs || !lh || !rh || !coreRef.current) {
            return;
        }

        leftShoulder.set(...ls);
        rightShoulder.set(...rs);
        leftHip.set(...lh);
        rightHip.set(...rh);

        shoulderCenter.copy(leftShoulder).add(rightShoulder).multiplyScalar(0.5);
        hipCenter.copy(leftHip).add(rightHip).multiplyScalar(0.5);

        const shoulderWidth = leftShoulder.distanceTo(rightShoulder);
        torsoDirection.copy(shoulderCenter).sub(hipCenter);
        const torsoHeight = torsoDirection.length();

        if (shoulderWidth < 0.001 || torsoHeight < 0.001) return;

        torsoDirection.normalize();
        rotation.setFromUnitVectors(up, torsoDirection);

        const torsoCenter = shoulderCenter.clone().add(hipCenter).multiplyScalar(0.5);

        coreRef.current.position.copy(torsoCenter);
        coreRef.current.quaternion.copy(rotation);
        coreRef.current.scale.set(
            shoulderWidth * 0.9,
            torsoHeight * 0.62,
            shoulderWidth * 0.42
        );
    });

    return (
        <mesh ref={coreRef} frustumCulled={false} castShadow receiveShadow>
            <capsuleGeometry args={[0.5, 1, 12, 24]} />
            <primitive object={BODY_MATERIAL} attach="material" />
        </mesh>
    );
}
