import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import * as THREE from "three";
import { createAvatarMaterial } from "../materials/materials";

const MODEL_URL = "/models/sign-avatar.vrm";

/*
 * Each entry maps a MediaPipe direction to a VRM bone.
 * Runtime layout: pose 0–32, left hand 33–53, right hand 54–74.
 */
const BONE_MAPPINGS = [
    { bone: "leftUpperArm", child: "leftLowerArm", from: 11, to: 13 },
    { bone: "leftLowerArm", child: "leftHand", from: 13, to: 15 },
    { bone: "rightUpperArm", child: "rightLowerArm", from: 12, to: 14 },
    { bone: "rightLowerArm", child: "rightHand", from: 14, to: 16 },

    { bone: "leftIndexProximal", child: "leftIndexIntermediate", from: 38, to: 39 },
    { bone: "leftIndexIntermediate", child: "leftIndexDistal", from: 39, to: 40 },
    { bone: "leftMiddleProximal", child: "leftMiddleIntermediate", from: 42, to: 43 },
    { bone: "leftMiddleIntermediate", child: "leftMiddleDistal", from: 43, to: 44 },
    { bone: "leftRingProximal", child: "leftRingIntermediate", from: 46, to: 47 },
    { bone: "leftRingIntermediate", child: "leftRingDistal", from: 47, to: 48 },
    { bone: "leftLittleProximal", child: "leftLittleIntermediate", from: 50, to: 51 },
    { bone: "leftLittleIntermediate", child: "leftLittleDistal", from: 51, to: 52 },

    { bone: "rightIndexProximal", child: "rightIndexIntermediate", from: 59, to: 60 },
    { bone: "rightIndexIntermediate", child: "rightIndexDistal", from: 60, to: 61 },
    { bone: "rightMiddleProximal", child: "rightMiddleIntermediate", from: 63, to: 64 },
    { bone: "rightMiddleIntermediate", child: "rightMiddleDistal", from: 64, to: 65 },
    { bone: "rightRingProximal", child: "rightRingIntermediate", from: 67, to: 68 },
    { bone: "rightRingIntermediate", child: "rightRingDistal", from: 68, to: 69 },
    { bone: "rightLittleProximal", child: "rightLittleIntermediate", from: 71, to: 72 },
    { bone: "rightLittleIntermediate", child: "rightLittleDistal", from: 72, to: 73 },
];

function landmarkDirection(frame, fromIndex, toIndex, target) {
    const from = frame[fromIndex];
    const to = frame[toIndex];

    if (!from || !to) return false;

    // X/Y follow the captured sign movement.
    // Positive Z keeps arms and hands toward the camera,
    // rather than passing behind the avatar.
    target.set(
        from[0] - to[0],
        to[1] - from[1],
        0.14 + Math.abs(from[2] - to[2])
    );

    return Number.isFinite(target.lengthSq()) && target.lengthSq() > 0.000001;
}

export default function VrmSigner({ frameRef }) {
    const gltf = useLoader(GLTFLoader, MODEL_URL, (loader) => {
        loader.register((parser) => new VRMLoaderPlugin(parser));
    });

    const vrm = gltf.userData.vrm;
    const rigRef = useRef([]);

    const direction = useMemo(() => new THREE.Vector3(), []);
    const delta = useMemo(() => new THREE.Quaternion(), []);
    const desiredWorld = useMemo(() => new THREE.Quaternion(), []);
    const parentWorld = useMemo(() => new THREE.Quaternion(), []);

    useEffect(() => {
        if (!vrm) return;

        vrm.scene.traverse((object) => {
            if (!object.isMesh) return;

            object.castShadow = true;
            object.receiveShadow = true;

            object.material = Array.isArray(object.material)
                ? object.material.map(() => createAvatarMaterial())
                : createAvatarMaterial();
        });

        vrm.scene.updateMatrixWorld(true);

        rigRef.current = BONE_MAPPINGS.map((mapping) => {
            const node = vrm.humanoid.getNormalizedBoneNode(mapping.bone);
            const child = vrm.humanoid.getNormalizedBoneNode(mapping.child);

            if (!node || !child) return null;

            const nodePosition = new THREE.Vector3();
            const childPosition = new THREE.Vector3();
            const restDirection = new THREE.Vector3();
            const restWorldQuaternion = new THREE.Quaternion();

            node.getWorldPosition(nodePosition);
            child.getWorldPosition(childPosition);
            restDirection.copy(childPosition).sub(nodePosition).normalize();
            node.getWorldQuaternion(restWorldQuaternion);

            return {
                ...mapping,
                node,
                restDirection,
                restWorldQuaternion,
            };
        }).filter(Boolean);
    }, [vrm]);

    useFrame((_, deltaTime) => {
        const frame = frameRef.current;
        if (!vrm || !frame || frame.length < 75) return;

        const blend = Math.min(1, deltaTime * 8);

        for (const rig of rigRef.current) {
            if (!landmarkDirection(frame, rig.from, rig.to, direction)) {
                continue;
            }

            direction.normalize();

            delta.setFromUnitVectors(rig.restDirection, direction);
            desiredWorld.copy(delta).multiply(rig.restWorldQuaternion);

            if (rig.node.parent) {
                rig.node.parent.getWorldQuaternion(parentWorld);
                parentWorld.invert();

                rig.node.quaternion.slerp(
                    parentWorld.multiply(desiredWorld),
                    blend
                );
            } else {
                rig.node.quaternion.slerp(desiredWorld, blend);
            }
        }

        vrm.scene.updateMatrixWorld(true);
        vrm.update(deltaTime);
    });

    return (
        <group rotation={[0, Math.PI, 0]}>
            <primitive
                object={vrm.scene}
                position={[0, 0, 0]}
                scale={[1.15, 1.15, 1.15]}
            />
        </group>
    );
}
