import * as THREE from "three";

/**
 * ------------------------------------------------------------
 * Generic exponential smoothing helpers for VRM animation.
 * ------------------------------------------------------------
 */

export class SmoothValue {

    constructor(initial = 0, speed = 10) {

        this.value = initial;
        this.target = initial;
        this.speed = speed;

    }

    setTarget(v) {

        this.target = v;

    }

    update(delta) {

        const alpha = 1 - Math.exp(-this.speed * delta);

        this.value += (this.target - this.value) * alpha;

        return this.value;

    }

    reset(v = 0) {

        this.value = v;
        this.target = v;

    }

}

/* ============================================================
   VECTOR SMOOTHER
============================================================ */

export class SmoothVector3 {

    constructor(speed = 12) {

        this.speed = speed;

        this.value = new THREE.Vector3();
        this.target = new THREE.Vector3();

    }

    setTarget(v) {

        this.target.copy(v);

    }

    update(delta) {

        const alpha = 1 - Math.exp(-this.speed * delta);

        this.value.lerp(this.target, alpha);

        return this.value;

    }

    reset(v = new THREE.Vector3()) {

        this.value.copy(v);
        this.target.copy(v);

    }

}

/* ============================================================
   QUATERNION SMOOTHER
============================================================ */

export class SmoothQuaternion {

    constructor(speed = 15) {

        this.speed = speed;

        this.value = new THREE.Quaternion();
        this.target = new THREE.Quaternion();

    }

    setTarget(q) {

        this.target.copy(q);

    }

    update(delta) {

        const alpha = 1 - Math.exp(-this.speed * delta);

        this.value.slerp(this.target, alpha);

        return this.value;

    }

    reset(q = new THREE.Quaternion()) {

        this.value.copy(q);
        this.target.copy(q);

    }

}

/* ============================================================
   DAMPING HELPERS
============================================================ */

export function dampVector(current, target, delta, speed = 12) {

    const alpha = 1 - Math.exp(-speed * delta);

    current.lerp(target, alpha);

    return current;

}

export function dampQuaternion(current, target, delta, speed = 15) {

    const alpha = 1 - Math.exp(-speed * delta);

    current.slerp(target, alpha);

    return current;

}

export function dampScalar(current, target, delta, speed = 10) {

    const alpha = 1 - Math.exp(-speed * delta);

    return current + (target - current) * alpha;

}

/* ============================================================
   LOW PASS FILTER
============================================================ */

export class LowPassFilter {

    constructor(alpha = 0.25) {

        this.alpha = alpha;
        this.initialized = false;
        this.value = new THREE.Vector3();

    }

    update(sample) {

        if (!this.initialized) {

            this.value.copy(sample);
            this.initialized = true;

            return this.value;

        }

        this.value.lerp(sample, this.alpha);

        return this.value;

    }

    reset() {

        this.initialized = false;
        this.value.set(0, 0, 0);

    }

}

/* ============================================================
   FRAME TIMER
============================================================ */

export class DeltaTimer {

    constructor() {

        this.clock = new THREE.Clock();

    }

    getDelta() {

        return this.clock.getDelta();

    }

}

/* ============================================================
   COMMON CONFIG
============================================================ */

export const DEFAULT_SMOOTHING = {

    spine: 14,

    shoulders: 14,

    upperArm: 16,

    lowerArm: 18,

    hands: 20,

    fingers: 22,

    head: 12

};