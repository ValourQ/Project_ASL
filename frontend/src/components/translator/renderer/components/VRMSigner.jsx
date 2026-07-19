import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import * as THREE from "three";
import { createAvatarMaterial } from "../materials/materials";

const MODEL_URL = "/models/sign-avatar2.vrm";

/*
 * Each entry maps a MediaPipe direction to a VRM bone.
 * Runtime layout: pose 0–32, left hand 33–53, right hand 54–74.
 */
const BONE_MAPPINGS = [
  {
    bone: "leftUpperArm",
    child: "leftLowerArm",
    from: 13,
    to: 15,
  },
  {
    bone: "rightUpperArm",
    child: "rightLowerArm",
    from: 14,
    to: 16,
  },
];

function landmarkDirection(frame, fromIndex, toIndex, target) {

    const from = frame[fromIndex];
    const to = frame[toIndex];

    if (!from || !to) {

        return false;

    }

    target.set(

        to[0] - from[0],

        to[1] - from[1],

        to[2] - from[2]

    );

    if (target.lengthSq() < 1e-8) {

        return false;

    }

    target.normalize();

    return true;

}

export default function VRMSigner({ frameRef }) {
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
                scale={[1, 1, 1]}
            />
        </group>
    );
}
