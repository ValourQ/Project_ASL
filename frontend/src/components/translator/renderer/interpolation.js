import * as THREE from "three";

const previousFrame = [];

const LERP_FACTOR = 0.22;

export function interpolateFrame(frame) {
    if (!Array.isArray(frame)) {
        return [];
    }

    return frame.map((point, index) => {
        if (
            !Array.isArray(point) ||
            point.length !== 3
        ) {
            return [0, 0, 0];
        }

        if (!previousFrame[index]) {
            previousFrame[index] = [...point];
            return [...point];
        }

        const current = new THREE.Vector3(...point);

        const previous = new THREE.Vector3(
            ...previousFrame[index]
        );

        previous.lerp(current, LERP_FACTOR);

        previousFrame[index] = [
            previous.x,
            previous.y,
            previous.z,
        ];

        return previousFrame[index];
    });
}

export function resetInterpolation() {
    previousFrame.length = 0;
}