import * as THREE from "three";

/**
 * Global reusable vectors
 */
export const WORLD_UP = new THREE.Vector3(0, 1, 0);
export const WORLD_RIGHT = new THREE.Vector3(1, 0, 0);
export const WORLD_FORWARD = new THREE.Vector3(0, 0, 1);

/**
 * Reusable temporary objects to reduce allocations.
 */
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();

const _q1 = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();

const _m1 = new THREE.Matrix4();

/* ===========================================================
   VECTOR HELPERS
=========================================================== */

/**
 * Creates normalized direction vector.
 */
export function direction(from, to, target = new THREE.Vector3()) {

    target.set(
        to[0] - from[0],
        to[1] - from[1],
        to[2] - from[2]
    );

    if (target.lengthSq() < 1e-8) {
        return target.set(0, 1, 0);
    }

    return target.normalize();

}

/**
 * Midpoint between two landmarks.
 */
export function midpoint(a, b, target = new THREE.Vector3()) {

    target.set(
        (a[0] + b[0]) * 0.5,
        (a[1] + b[1]) * 0.5,
        (a[2] + b[2]) * 0.5
    );

    return target;

}

/**
 * Distance between two landmarks.
 */
export function distance(a, b) {

    _v1.set(a[0], a[1], a[2]);
    _v2.set(b[0], b[1], b[2]);

    return _v1.distanceTo(_v2);

}

/**
 * Clamp vector magnitude.
 */
export function clampLength(vector, maxLength) {

    if (vector.length() > maxLength) {
        vector.setLength(maxLength);
    }

    return vector;

}

/* ===========================================================
   QUATERNION HELPERS
=========================================================== */

/**
 * Quaternion rotating one direction into another.
 */
export function quaternionBetween(from, to, target = new THREE.Quaternion()) {

    target.setFromUnitVectors(
        from.clone().normalize(),
        to.clone().normalize()
    );

    return target;

}

/**
 * Smoothly interpolate.
 */
export function slerp(current, target, alpha = 0.15) {

    current.slerp(target, alpha);

    return current;

}

/**
 * Copies world rotation into local space.
 */
export function worldToLocalQuaternion(node, worldQuaternion) {

    if (!node.parent) {
        return worldQuaternion.clone();
    }

    node.parent.updateWorldMatrix(true, false);

    node.parent.getWorldQuaternion(_q1);

    _q1.invert();

    return _q1.multiply(worldQuaternion.clone());

}

/**
 * Local rotation → world rotation.
 */
export function localToWorldQuaternion(node) {

    node.updateWorldMatrix(true, false);

    node.getWorldQuaternion(_q1);

    return _q1.clone();

}

/* ===========================================================
   BONE HELPERS
=========================================================== */

/**
 * Returns normalized bone direction.
 */
export function boneDirection(parentBone, childBone, target = new THREE.Vector3()) {

    parentBone.getWorldPosition(_v1);
    childBone.getWorldPosition(_v2);

    target.copy(_v2).sub(_v1);

    if (target.lengthSq() < 1e-8) {
        return target.set(0, 1, 0);
    }

    return target.normalize();

}

/**
 * Returns world position.
 */
export function bonePosition(bone, target = new THREE.Vector3()) {

    bone.getWorldPosition(target);

    return target;

}

/**
 * Returns world quaternion.
 */
export function boneQuaternion(bone, target = new THREE.Quaternion()) {

    bone.getWorldQuaternion(target);

    return target;

}

/**
 * Computes bind direction.
 */
export function bindDirection(parentBone, childBone) {

    parentBone.updateWorldMatrix(true, false);
    childBone.updateWorldMatrix(true, false);

    parentBone.getWorldPosition(_v1);
    childBone.getWorldPosition(_v2);

    return _v2.sub(_v1).normalize().clone();

}

/**
 * Computes bind quaternion.
 */
export function bindQuaternion(bone) {

    bone.updateWorldMatrix(true, false);

    bone.getWorldQuaternion(_q1);

    return _q1.clone();

}

/* ===========================================================
   MATRIX HELPERS
=========================================================== */

/**
 * Builds rotation matrix from three axes.
 */
export function basisMatrix(right, up, forward) {

    _m1.makeBasis(
        right.clone().normalize(),
        up.clone().normalize(),
        forward.clone().normalize()
    );

    return _m1.clone();

}

/**
 * Quaternion from orthogonal basis.
 */
export function basisQuaternion(right, up, forward) {

    return new THREE.Quaternion().setFromRotationMatrix(
        basisMatrix(right, up, forward)
    );

}

/* ===========================================================
   DEBUG HELPERS
=========================================================== */

export function printVector(name, vector) {

    console.log(
        `${name}:`,
        vector.x.toFixed(4),
        vector.y.toFixed(4),
        vector.z.toFixed(4)
    );

}

export function printQuaternion(name, q) {

    console.log(
        `${name}:`,
        q.x.toFixed(4),
        q.y.toFixed(4),
        q.z.toFixed(4),
        q.w.toFixed(4)
    );

}