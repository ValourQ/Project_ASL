import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import PoseRetargeter from "../solvers/PoseRetargeter";

const MODEL_URL = "/models/sign-avatar2.vrm";

export default function VRMSigner({ frameRef }) {

    const gltf = useLoader(GLTFLoader, MODEL_URL, (loader) => {
        loader.register((parser) => new VRMLoaderPlugin(parser));
    });

    const vrm = gltf.userData.vrm;

    const retargeterRef = useRef(null);

    useEffect(() => {

        if (!vrm) return;

        vrm.scene.traverse((object) => {

            if (!object.isMesh) return;

            object.castShadow = true;
            object.receiveShadow = true;

        });

        vrm.scene.updateMatrixWorld(true);

        retargeterRef.current = new PoseRetargeter(vrm);

        console.log("✅ PoseRetargeter initialized");

        return () => {

            retargeterRef.current = null;

        };

    }, [vrm]);

    useFrame((_, deltaTime) => {

        if (!vrm) return;

        const frame = frameRef.current;

        if (frame && retargeterRef.current) {

            retargeterRef.current.update(frame);

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