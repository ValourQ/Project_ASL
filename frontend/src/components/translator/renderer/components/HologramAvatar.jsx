import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
    BODY_MATERIAL,
    HAND_MATERIAL,
    HEAD_MATERIAL,
    JOINT_MATERIAL,
    createSurfaceMaterial,
} from "../materials/materials";

const ARM_SCALE = 2.1;
const HAND_SCALE = 2.1;

const BODY_EDGES = [
    [0, 1],
    [0, 2], [2, 3],
    [1, 4], [4, 5],
    [0, 6], [1, 7],
    [6, 7],
];

const HAND_EDGES = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17],
];

function mapRelative(target, anchor, point, origin, scale) {
    if (!point || !origin) {
        target.copy(anchor);
        return;
    }

    target.set(
        anchor.x + (point[0] - origin[0]) * scale,
        anchor.y + (point[1] - origin[1]) * scale,
        anchor.z + (point[2] - origin[2]) * scale
    );
}

function updateBone(dummy, up, direction, start, end) {
    direction.copy(end).sub(start);

    const length = direction.length();
    if (length < 0.0001) {
        dummy.scale.set(0.0001, 0.0001, 0.0001);
        dummy.updateMatrix();
        return;
    }

    dummy.position.copy(start).add(end).multiplyScalar(0.5);
    dummy.quaternion.setFromUnitVectors(up, direction.normalize());
    dummy.scale.set(1, length, 1);
    dummy.updateMatrix();
}

export default function HologramAvatar({ frameRef }) {
    const bodyBoneRef = useRef();
    const handBoneRef = useRef();
    const bodyJointRef = useRef();
    const handJointRef = useRef();

    const points = useMemo(
        () => Array.from({ length: 50 }, () => new THREE.Vector3()),
        []
    );

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
    const direction = useMemo(() => new THREE.Vector3(), []);
    const handJointMaterial = useMemo(
        () => createSurfaceMaterial("#7E848C"),
        []
    );

    useFrame(() => {
        const frame = frameRef.current;

        if (
            !frame ||
            frame.length < 75 ||
            !bodyBoneRef.current ||
            !handBoneRef.current ||
            !bodyJointRef.current ||
            !handJointRef.current
        ) {
            return;
        }

        points[0].set(-0.42, 1.16, 0);
        points[1].set(0.42, 1.16, 0);
        points[6].set(-0.30, 0.22, 0);
        points[7].set(0.30, 0.22, 0);

        mapRelative(points[2], points[0], frame[13], frame[11], ARM_SCALE);
        mapRelative(points[3], points[0], frame[15], frame[11], ARM_SCALE);
        mapRelative(points[4], points[1], frame[14], frame[12], ARM_SCALE);
        mapRelative(points[5], points[1], frame[16], frame[12], ARM_SCALE);

        points[8].copy(points[3]);
        for (let i = 1; i < 21; i += 1) {
            mapRelative(points[8 + i], points[8], frame[33 + i], frame[33], HAND_SCALE);
        }

        points[29].copy(points[5]);
        for (let i = 1; i < 21; i += 1) {
            mapRelative(points[29 + i], points[29], frame[54 + i], frame[54], HAND_SCALE);
        }

        BODY_EDGES.forEach(([start, end], index) => {
            updateBone(dummy, up, direction, points[start], points[end]);
            bodyBoneRef.current.setMatrixAt(index, dummy.matrix);
        });

        let handBoneIndex = 0;

        HAND_EDGES.forEach(([start, end]) => {
            updateBone(dummy, up, direction, points[8 + start], points[8 + end]);
            handBoneRef.current.setMatrixAt(handBoneIndex, dummy.matrix);
            handBoneIndex += 1;
        });

        HAND_EDGES.forEach(([start, end]) => {
            updateBone(dummy, up, direction, points[29 + start], points[29 + end]);
            handBoneRef.current.setMatrixAt(handBoneIndex, dummy.matrix);
            handBoneIndex += 1;
        });

        for (let i = 0; i < 8; i += 1) {
            dummy.position.copy(points[i]);
            dummy.scale.setScalar(1);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            bodyJointRef.current.setMatrixAt(i, dummy.matrix);
        }

        for (let i = 0; i < 42; i += 1) {
            dummy.position.copy(points[8 + i]);
            dummy.scale.setScalar(1);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            handJointRef.current.setMatrixAt(i, dummy.matrix);
        }

        bodyBoneRef.current.instanceMatrix.needsUpdate = true;
        handBoneRef.current.instanceMatrix.needsUpdate = true;
        bodyJointRef.current.instanceMatrix.needsUpdate = true;
        handJointRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <mesh position={[0, 0.70, 0]} scale={[0.78, 0.62, 0.38]} castShadow receiveShadow>
                <capsuleGeometry args={[0.5, 1, 16, 32]} />
                <primitive object={BODY_MATERIAL} attach="material" />
            </mesh>

            <mesh position={[0, 1.55, 0]} scale={[0.23, 0.28, 0.23]} castShadow receiveShadow>
                <sphereGeometry args={[1, 32, 32]} />
                <primitive object={HEAD_MATERIAL} attach="material" />
            </mesh>

            <instancedMesh
                ref={bodyBoneRef}
                args={[null, null, BODY_EDGES.length]}
                frustumCulled={false}
                castShadow
                receiveShadow
            >
                <cylinderGeometry args={[0.034, 0.040, 1, 12]} />
                <primitive object={BODY_MATERIAL} attach="material" />
            </instancedMesh>

            <instancedMesh
                ref={handBoneRef}
                args={[null, null, HAND_EDGES.length * 2]}
                frustumCulled={false}
                castShadow
                receiveShadow
            >
                <cylinderGeometry args={[0.014, 0.018, 1, 10]} />
                <primitive object={HAND_MATERIAL} attach="material" />
            </instancedMesh>

            <instancedMesh
                ref={bodyJointRef}
                args={[null, null, 8]}
                frustumCulled={false}
                castShadow
                receiveShadow
            >
                <sphereGeometry args={[0.055, 16, 16]} />
                <primitive object={JOINT_MATERIAL} attach="material" />
            </instancedMesh>

            <instancedMesh
                ref={handJointRef}
                args={[null, null, 42]}
                frustumCulled={false}
                castShadow
                receiveShadow
            >
                <sphereGeometry args={[0.022, 12, 12]} />
                <primitive object={handJointMaterial} attach="material" />
            </instancedMesh>
        </group>
    );
}
