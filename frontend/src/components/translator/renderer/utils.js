/**
 * Converts runtime landmark coordinates into Three.js positions.
 * Missing points stay null, so they never draw false lines at [0, 0, 0].
 */

export const SCALE = 1;

export const OFFSET = {
    x: 0,
    y: 1.35,
    z: 0,
};

export function isValidLandmark(landmark) {
    return (
        Array.isArray(landmark) &&
        landmark.length === 3 &&
        landmark.every(Number.isFinite) &&
        landmark.some((value) => Math.abs(value) > 0.000001)
    );
}

export function normalizeLandmark(landmark) {
    if (!isValidLandmark(landmark)) return null;

    const [x, y, z] = landmark;
    return [x * SCALE, -y * SCALE, z * SCALE];
}

export function normalizeFrame(frame) {
    return Array.isArray(frame) ? frame.map(normalizeLandmark) : [];
}

export function calculateCenter(frame) {
    const validPoints = frame.filter(Boolean);

    if (validPoints.length === 0) {
        return [0, 0, 0];
    }

    let x = 0;
    let y = 0;
    let z = 0;

    validPoints.forEach(([px, py, pz]) => {
        x += px;
        y += py;
        z += pz;
    });

    return [
        x / validPoints.length,
        y / validPoints.length,
        z / validPoints.length,
    ];
}

export function centerFrame(frame) {
    const [centerX, centerY, centerZ] = calculateCenter(frame);

    return frame.map((point) => {
        if (!point) return null;

        return [
            point[0] - centerX + OFFSET.x,
            point[1] - centerY + OFFSET.y,
            point[2] - centerZ + OFFSET.z,
        ];
    });
}

/*
 * Makes the whole captured avatar upright.
 * It applies one rotation to every landmark, preserving the exact
 * relative positions of arms, hands, and fingers.
 */
export function stabilizeUpright(frame) {
    const leftShoulder = frame[11];
    const rightShoulder = frame[12];
    const leftHip = frame[23];
    const rightHip = frame[24];

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
        return frame;
    }

    const shoulder = [
        (leftShoulder[0] + rightShoulder[0]) / 2,
        (leftShoulder[1] + rightShoulder[1]) / 2,
        (leftShoulder[2] + rightShoulder[2]) / 2,
    ];

    const hip = [
        (leftHip[0] + rightHip[0]) / 2,
        (leftHip[1] + rightHip[1]) / 2,
        (leftHip[2] + rightHip[2]) / 2,
    ];

    let tx = shoulder[0] - hip[0];
    let ty = shoulder[1] - hip[1];
    let tz = shoulder[2] - hip[2];

    const torsoLength = Math.hypot(tx, ty, tz);
    if (!Number.isFinite(torsoLength) || torsoLength < 0.00001) {
        return frame;
    }

    tx /= torsoLength;
    ty /= torsoLength;
    tz /= torsoLength;

    // Quaternion rotating torso direction to world-up [0, 1, 0].
    let qx = -tz;
    let qy = 0;
    let qz = tx;
    let qw = 1 + ty;

    const qLength = Math.hypot(qx, qy, qz, qw);

    if (qLength < 0.00001) {
        qx = 1;
        qy = 0;
        qz = 0;
        qw = 0;
    } else {
        qx /= qLength;
        qy /= qLength;
        qz /= qLength;
        qw /= qLength;
    }

    return frame.map((point) => {
        if (!point) return null;

        const [x, y, z] = point;

        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;

        return [
            ix * qw + iw * -qx + iy * -qz - iz * -qy,
            iy * qw + iw * -qy + iz * -qx - ix * -qz,
            iz * qw + iw * -qz + ix * -qy - iy * -qx,
        ];
    });
}

export function prepareFrame(backendFrame) {
    return centerFrame(normalizeFrame(backendFrame));
}