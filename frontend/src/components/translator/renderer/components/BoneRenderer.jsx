import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ALL_CONNECTIONS } from "../mediapipeConnections";
import { createSurfaceMaterial, COLORS } from "../materials/materials";

const BONE_STYLES = {
    body: {
        color: COLORS.body,
        radius: 0.008,
    },
    hand: {
        color: COLORS.hand,
        radius: 0.004,
    },
};

function groupConnections() {
    const groups = { body: [], hand: [] };

    ALL_CONNECTIONS.forEach(([start, end]) => {
        const isHand = start >= 33 || end >= 33;
        groups[isHand ? "hand" : "body"].push([start, end]);
    });

    return groups;
}

const BONE_GROUPS = groupConnections();

function BoneInstances({ styleKey, connections, frameRef }) {
    const style = BONE_STYLES[styleKey];
    const coreRef = useRef();
    const material = useMemo(
        () => createSurfaceMaterial(style.color),
        [style.color]
    );
    const count = connections.length;

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
    const quat = useMemo(() => new THREE.Quaternion(), []);
    const dir = useMemo(() => new THREE.Vector3(), []);
    const startVec = useMemo(() => new THREE.Vector3(), []);
    const endVec = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        const frame = frameRef.current;
        if (!frame || !coreRef.current) return;

        for (let i = 0; i < count; i++) {
            const [s, e] = connections[i];
            const start = frame[s];
            const end = frame[e];
            if (!start || !end) {
                dummy.position.set(0, 0, 0);
                dummy.scale.set(0.0001, 0.0001, 0.0001);
                dummy.updateMatrix();
                coreRef.current.setMatrixAt(i, dummy.matrix);
                continue;
            }

            startVec.set(start[0], start[1], start[2]);
            endVec.set(end[0], end[1], end[2]);
            dir.subVectors(endVec, startVec);
            const length = dir.length();

            if (!Number.isFinite(length) || length < 0.00001) {
                dummy.position.set(0, 0, 0);
                dummy.rotation.set(0, 0, 0);
                dummy.scale.set(0.0001, 0.0001, 0.0001);
                dummy.updateMatrix();
                coreRef.current.setMatrixAt(i, dummy.matrix);
                continue;
            }

            dummy.position.copy(startVec).add(endVec).multiplyScalar(0.5);
            dir.normalize();
            quat.setFromUnitVectors(up, dir);
            dummy.quaternion.copy(quat);
            dummy.scale.set(1, length, 1);
            dummy.updateMatrix();
            coreRef.current.setMatrixAt(i, dummy.matrix);
        }

        coreRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={coreRef}
            args={[null, null, count]}
            frustumCulled={false}
            castShadow
            receiveShadow
        >
            <cylinderGeometry args={[style.radius, style.radius, 1, 12, 1, true]} />
            <primitive object={material} attach="material" />
        </instancedMesh>
    );
}

export default function BoneRenderer({ frameRef }) {
    if (!frameRef) return null;

    return (
        <group>
            <BoneInstances styleKey="body" connections={BONE_GROUPS.body} frameRef={frameRef} />
            <BoneInstances styleKey="hand" connections={BONE_GROUPS.hand} frameRef={frameRef} />
        </group>
    );
}
