import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import SkeletonRenderer from "./components/SkeletonRenderer";
import Lighting from "./Lighting";
import Ground from "./Ground";
import Environment from "./Environment";
import CameraController from "./CameraController";
import Effects from "./Effects";
import useSkeletonFrameRef from "./useSkeletonFrameRef";
import { Suspense } from "react";

// Must stay in sync with CameraController defaults.
export const DEFAULT_CAMERA = {
    position: [0, 1.55, 1.65],
    fov: 28,
    near: 0.1,
    far: 100,
};

export default function CanvasScene() {
    // A ref, not state: animation playback updates this every
    // tick without ever causing CanvasScene (or anything below
    // it) to re-render. See useSkeletonFrameRef.js.
    const frameRef = useSkeletonFrameRef();

    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
            }}
            camera={{
                position: DEFAULT_CAMERA.position,
                fov: DEFAULT_CAMERA.fov,
                near: DEFAULT_CAMERA.near,
                far: DEFAULT_CAMERA.far,
            }}
            onCreated={({ gl }) => {
                gl.outputColorSpace = THREE.SRGBColorSpace;
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.05;
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
        >
            <color attach="background" args={["#0A0C10"]} />

            <fog attach="fog" args={["#0A0C10", 10, 28]} />

            <Lighting />

            <Ground />

            <Environment />

            <Suspense fallback={null}>
                <SkeletonRenderer frameRef={frameRef} />
            </Suspense>

            <CameraController />

            <Effects />
        </Canvas>
    );
}
