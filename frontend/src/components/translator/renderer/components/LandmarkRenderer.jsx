import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSurfaceMaterial, COLORS } from "../materials/materials";

const FINGERTIP_LOCAL = [4, 8, 12, 16, 20];

function buildCategories() {
    const categories = {
        shoulder: {
            indices: [],
            radius: 0.035,
            color: COLORS.joint,
        },
        elbow: {
            indices: [],
            radius: 0.028,
            color: COLORS.joint,
        },
        wrist: {
            indices: [],
            radius: 0.028,
            color: COLORS.hand,
        },
        hip: {
            indices: [],
            radius: 0.032,
            color: COLORS.joint,
        },
        bodyGeneric: {
            indices: [],
            radius: 0.020,
            color: COLORS.body,
        },
        handGeneric: {
            indices: [],
            radius: 0.014,
            color: COLORS.hand,
        },
        fingertip: {
            indices: [],
            radius: 0.020,
            color: COLORS.fingertip,
        },
    };

    const special = {
        11: "shoulder",
        12: "shoulder",
        13: "elbow",
        14: "elbow",
        15: "wrist",
        16: "wrist",
        23: "hip",
        24: "hip",
    };

    const visibleBodyIndices = [11, 12, 13, 14, 15, 16, 23, 24];

    for (const i of visibleBodyIndices) {
        const key = special[i];
        categories[key].indices.push(i);
    }

    for (const base of [33, 54]) {
        for (let local = 0; local < 21; local++) {
            const idx = base + local;
            const key = FINGERTIP_LOCAL.includes(local) ? "fingertip" : "handGeneric";
            categories[key].indices.push(idx);
        }
    }

    return categories;
}

const CATEGORIES = buildCategories();

function CategoryInstances({ category, frameRef }) {
    const coreRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const material = useMemo(
        () => createSurfaceMaterial(category.color),
        [category.color]
    );
    const count = category.indices.length;

    useFrame(() => {
        const frame = frameRef.current;
        if (!frame || !coreRef.current) return;

        for (let i = 0; i < count; i++) {
            const point = frame[category.indices[i]];
            if (!point) {
                dummy.position.set(0, 0, 0);
                dummy.scale.setScalar(0.0001);
                dummy.updateMatrix();
                coreRef.current.setMatrixAt(i, dummy.matrix);
                continue;
            }

            dummy.position.set(point[0], point[1], point[2]);
            dummy.scale.setScalar(1);
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
            <sphereGeometry args={[category.radius, 16, 16]} />
            <primitive object={material} attach="material" />
        </instancedMesh>
    );
}

export default function LandmarkRenderer({ frameRef }) {
    if (!frameRef) return null;

    return (
        <group>
            {Object.entries(CATEGORIES).map(([name, category]) =>
                category.indices.length > 0 ? (
                    <CategoryInstances
                        key={name}
                        category={category}
                        frameRef={frameRef}
                    />
                ) : null
            )}
        </group>
    );
}
