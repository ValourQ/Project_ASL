import * as THREE from "three";

/**
 * MediaPipe landmark indices
 */
export const POSE = {
    NOSE: 0,

    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,

    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,

    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,

    LEFT_HIP: 23,
    RIGHT_HIP: 24
};

const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();

/* ===========================================================
   BASIC ACCESS
=========================================================== */

export function landmark(frame, index) {

    const p = frame[index];

    return _v1.set(
        p[0],
        p[1],
        p[2]
    );

}

export function cloneLandmark(frame, index) {

    const p = frame[index];

    return new THREE.Vector3(
        p[0],
        p[1],
        p[2]
    );

}

export function midpoint(frame, a, b, target = new THREE.Vector3()) {

    const p1 = frame[a];
    const p2 = frame[b];

    target.set(
        (p1[0] + p2[0]) * 0.5,
        (p1[1] + p2[1]) * 0.5,
        (p1[2] + p2[2]) * 0.5
    );

    return target;

}

/* ===========================================================
   BODY CENTERS
=========================================================== */

export function shoulderCenter(frame, target = new THREE.Vector3()) {

    return midpoint(
        frame,
        POSE.LEFT_SHOULDER,
        POSE.RIGHT_SHOULDER,
        target
    );

}

export function hipCenter(frame, target = new THREE.Vector3()) {

    return midpoint(
        frame,
        POSE.LEFT_HIP,
        POSE.RIGHT_HIP,
        target
    );

}

export function bodyCenter(frame, target = new THREE.Vector3()) {

    shoulderCenter(frame, _v1);
    hipCenter(frame, _v2);

    target.copy(_v1).add(_v2).multiplyScalar(0.5);

    return target;

}

/* ===========================================================
   BODY AXES
=========================================================== */

export function spineVector(frame, target = new THREE.Vector3()) {

    shoulderCenter(frame, _v1);
    hipCenter(frame, _v2);

    target.copy(_v1).sub(_v2);

    if (target.lengthSq() < 1e-8)
        return target.set(0, 1, 0);

    return target.normalize();

}

export function shoulderVector(frame, target = new THREE.Vector3()) {

    const l = frame[POSE.LEFT_SHOULDER];
    const r = frame[POSE.RIGHT_SHOULDER];

    target.set(
        r[0] - l[0],
        r[1] - l[1],
        r[2] - l[2]
    );

    if (target.lengthSq() < 1e-8)
        return target.set(1, 0, 0);

    return target.normalize();

}

export function forwardVector(frame, target = new THREE.Vector3()) {

    spineVector(frame, _v1);
    shoulderVector(frame, _v2);

    target.crossVectors(_v2, _v1);

    if (target.lengthSq() < 1e-8)
        return target.set(0, 0, 1);

    return target.normalize();

}

/* ===========================================================
   ARM VECTORS
=========================================================== */

export function upperArmVector(frame, left = true, target = new THREE.Vector3()) {

    const shoulder = left
        ? POSE.LEFT_SHOULDER
        : POSE.RIGHT_SHOULDER;

    const elbow = left
        ? POSE.LEFT_ELBOW
        : POSE.RIGHT_ELBOW;

    const s = frame[shoulder];
    const e = frame[elbow];

    target.set(
        e[0] - s[0],
        e[1] - s[1],
        e[2] - s[2]
    );

    if (target.lengthSq() < 1e-8)
        return target.set(0, -1, 0);

    return target.normalize();

}

export function lowerArmVector(frame, left = true, target = new THREE.Vector3()) {

    const elbow = left
        ? POSE.LEFT_ELBOW
        : POSE.RIGHT_ELBOW;

    const wrist = left
        ? POSE.LEFT_WRIST
        : POSE.RIGHT_WRIST;

    const e = frame[elbow];
    const w = frame[wrist];

    target.set(
        w[0] - e[0],
        w[1] - e[1],
        w[2] - e[2]
    );

    if (target.lengthSq() < 1e-8)
        return target.set(0, -1, 0);

    return target.normalize();

}

/* ===========================================================
   VALIDATION
=========================================================== */

export function hasPose(frame) {

    return Array.isArray(frame) && frame.length >= 33;

}

export function hasHands(frame) {

    return Array.isArray(frame) && frame.length >= 75;

}

/* ===========================================================
   DEBUG
=========================================================== */

export function debugPose(frame) {

    console.table({

        shoulderCenter: shoulderCenter(frame).toArray(),

        hipCenter: hipCenter(frame).toArray(),

        spine: spineVector(frame).toArray(),

        shoulders: shoulderVector(frame).toArray(),

        forward: forwardVector(frame).toArray()

    });

}