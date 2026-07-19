import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Very subtle neutral atmosphere — kept intentionally
 * faint so the avatar remains the focal point.
 */

const PARTICLE_COUNT = 48;
const FIELD_RADIUS = 3.2;
const FIELD_BOTTOM = -1.15;
const FIELD_TOP = 2.05;

export default function Environment() {
    const pointsRef = useRef();

    const { positions, speeds, colors } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const speeds = new Float32Array(PARTICLE_COUNT);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        const light = new THREE.Color("#6A727C");
        const dark = new THREE.Color("#3A4048");
        const mixed = new THREE.Color();

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const radius = Math.sqrt(Math.random()) * FIELD_RADIUS;
            const angle = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = FIELD_BOTTOM + Math.random() * (FIELD_TOP - FIELD_BOTTOM);
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            speeds[i] = 0.008 + Math.random() * 0.018;

            mixed.copy(light).lerp(dark, Math.random());
            colors[i * 3] = mixed.r;
            colors[i * 3 + 1] = mixed.g;
            colors[i * 3 + 2] = mixed.b;
        }

        return { positions, speeds, colors };
    }, []);

    useFrame((_, delta) => {
        const geometry = pointsRef.current?.geometry;
        if (!geometry) return;

        const positionAttr = geometry.attributes.position;
        const array = positionAttr.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const yIndex = i * 3 + 1;
            let y = array[yIndex] + speeds[i] * delta;
            if (y > FIELD_TOP) y = FIELD_BOTTOM;
            array[yIndex] = y;
        }

        positionAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={PARTICLE_COUNT}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.014}
                vertexColors
                transparent
                opacity={0.12}
                depthWrite={false}
                blending={THREE.NormalBlending}
                sizeAttenuation
            />
        </points>
    );
}
