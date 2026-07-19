import { Grid } from "@react-three/drei";

export default function Ground() {
    return (
        <>
            {/* Subtle infinite floor grid — low contrast, wide spacing */}
            <Grid
                position={[0, -1.15, 0]}
                args={[36, 36]}
                cellSize={0.42}
                cellThickness={0.12}
                cellColor="#1A2230"
                sectionSize={2.1}
                sectionThickness={0.35}
                sectionColor="#243040"
                fadeDistance={42}
                fadeStrength={2.8}
                infiniteGrid
            />

            {/* Soft platform disc */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.146, 0]}
            >
                <circleGeometry args={[3.4, 128]} />
                <meshBasicMaterial
                    color="#141A22"
                    transparent
                    opacity={0.22}
                />
            </mesh>

            {/* Inner platform ring */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.144, 0]}
            >
                <ringGeometry args={[1.05, 1.12, 128]} />
                <meshBasicMaterial
                    color="#243040"
                    transparent
                    opacity={0.18}
                />
            </mesh>

            {/* Outer platform ring */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.143, 0]}
            >
                <ringGeometry args={[2.45, 2.55, 160]} />
                <meshBasicMaterial
                    color="#1E2836"
                    transparent
                    opacity={0.12}
                />
            </mesh>
        </>
    );
}
