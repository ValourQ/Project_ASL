import * as THREE from "three";

import { spineVector } from "../utils/PoseUtils";

import {
    bindDirection,
    bindQuaternion,
    worldToLocalQuaternion,
} from "../utils/BoneMath";

import { SmoothQuaternion } from "../utils/Smoothing";

export default class SpineSolver {

    constructor(vrm) {

        this.humanoid = vrm.humanoid;

        this.spine = this.humanoid.getNormalizedBoneNode("spine");
        this.chest = this.humanoid.getNormalizedBoneNode("chest");
        this.upperChest = this.humanoid.getNormalizedBoneNode("upperChest");
        this.neck = this.humanoid.getNormalizedBoneNode("neck");

        this.enabled = !!this.spine;

        if (!this.enabled) return;

        this.rest = {};

        this.cacheRestPose();

        this.frameDirection = new THREE.Vector3();

        this.deltaQuat = new THREE.Quaternion();
        this.worldQuat = new THREE.Quaternion();

        this.localSpine = new THREE.Quaternion();
        this.localChest = new THREE.Quaternion();
        this.localUpper = new THREE.Quaternion();
        this.localNeck = new THREE.Quaternion();

        this.spineSmooth = new SmoothQuaternion(12);
        this.chestSmooth = new SmoothQuaternion(12);
        this.upperSmooth = new SmoothQuaternion(12);
        this.neckSmooth = new SmoothQuaternion(12);

    }

    cacheRestPose() {

        this.rest.direction = this.chest
            ? bindDirection(this.spine, this.chest)
            : new THREE.Vector3(0, 1, 0);

        this.rest.spine = bindQuaternion(this.spine);

        if (this.chest)
            this.rest.chest = bindQuaternion(this.chest);

        if (this.upperChest)
            this.rest.upper = bindQuaternion(this.upperChest);

        if (this.neck)
            this.rest.neck = bindQuaternion(this.neck);

    }

    

    solve(context) {

        if (!this.enabled) return;
        const frame = context.frame;
        const delta = context.delta;

        spineVector(frame, this.frameDirection);

        if (this.frameDirection.lengthSq() < 1e-6)
            return;

        this.frameDirection.normalize();

        this.deltaQuat.setFromUnitVectors(
            this.rest.direction,
            this.frameDirection
        );

        this.worldQuat
            .copy(this.rest.spine)
            .multiply(this.deltaQuat);

        //
        // Spine (30%)
        //

        this.localSpine.copy(
            worldToLocalQuaternion(
                this.spine,
                this.worldQuat
            )
        );

        this.localSpine.slerp(this.rest.spine, 0.70);

        this.spineSmooth.setTarget(this.localSpine);

        this.spine.quaternion.copy(
            this.spineSmooth.update(delta)
        );

        //
        // Chest (35%)
        //

        if (this.chest) {

            this.localChest.copy(
                worldToLocalQuaternion(
                    this.chest,
                    this.worldQuat
                )
            );

            this.localChest.slerp(
                this.rest.chest,
                0.65
            );

            this.chestSmooth.setTarget(this.localChest);

            this.chest.quaternion.copy(
                this.chestSmooth.update(delta)
            );

        }

        //
        // Upper Chest (25%)
        //

        if (this.upperChest) {

            this.localUpper.copy(
                worldToLocalQuaternion(
                    this.upperChest,
                    this.worldQuat
                )
            );

            this.localUpper.slerp(
                this.rest.upper,
                0.75
            );

            this.upperSmooth.setTarget(
                this.localUpper
            );

            this.upperChest.quaternion.copy(
                this.upperSmooth.update(delta)
            );

        }

        //
        // Neck (10%)
        //

        if (this.neck) {

            this.localNeck.copy(
                worldToLocalQuaternion(
                    this.neck,
                    this.worldQuat
                )
            );

            this.localNeck.slerp(
                this.rest.neck,
                0.90
            );

            this.neckSmooth.setTarget(
                this.localNeck
            );

            this.neck.quaternion.copy(
                this.neckSmooth.update(delta)
            );

        }

    }

    reset() {

        if (!this.enabled) return;

        this.spine.quaternion.copy(this.rest.spine);

        if (this.chest)
            this.chest.quaternion.copy(this.rest.chest);

        if (this.upperChest)
            this.upperChest.quaternion.copy(this.rest.upper);

        if (this.neck)
            this.neck.quaternion.copy(this.rest.neck);

    }

}