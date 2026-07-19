import * as THREE from "three";

import {
    shoulderVector
} from "../utils/PoseUtils";

import {
    bindDirection,
    bindQuaternion,
    worldToLocalQuaternion
} from "../utils/BoneMath";

import {
    SmoothQuaternion
} from "../utils/Smoothing";

export default class ShoulderSolver {

    constructor(vrm) {

        this.vrm = vrm;

        this.humanoid = vrm.humanoid;

        this.leftShoulder =
            this.humanoid.getNormalizedBoneNode("leftShoulder");

        this.rightShoulder =
            this.humanoid.getNormalizedBoneNode("rightShoulder");

        this.leftUpperArm =
            this.humanoid.getNormalizedBoneNode("leftUpperArm");

        this.rightUpperArm =
            this.humanoid.getNormalizedBoneNode("rightUpperArm");

        this.enabled =
            this.leftShoulder &&
            this.rightShoulder &&
            this.leftUpperArm &&
            this.rightUpperArm;

        if (!this.enabled) return;

        this.cacheRestPose();

        this.leftSmooth = new SmoothQuaternion(14);
        this.rightSmooth = new SmoothQuaternion(14);

        this.targetDirection = new THREE.Vector3();
        this.deltaQuat = new THREE.Quaternion();
        this.targetQuat = new THREE.Quaternion();

    }

    cacheRestPose() {

        this.leftRestDirection =
            bindDirection(
                this.leftShoulder,
                this.leftUpperArm
            );

        this.rightRestDirection =
            bindDirection(
                this.rightShoulder,
                this.rightUpperArm
            );

        this.leftRestQuat =
            bindQuaternion(this.leftShoulder);

        this.rightRestQuat =
            bindQuaternion(this.rightShoulder);

    }

    solve(frame, delta) {

        if (!this.enabled) return;

        shoulderVector(
            frame,
            this.targetDirection
        );

        this.solveLeft(delta);

        this.solveRight(delta);

    }

    solveLeft(delta) {

        this.deltaQuat.setFromUnitVectors(

            this.leftRestDirection,

            this.targetDirection

        );

        this.targetQuat
            .copy(this.leftRestQuat)
            .multiply(this.deltaQuat);

        const localQuat =
            worldToLocalQuaternion(

                this.leftShoulder,

                this.targetQuat

            );

        this.leftSmooth.setTarget(localQuat);

        this.leftShoulder.quaternion.copy(

            this.leftSmooth.update(delta)

        );

    }

    solveRight(delta) {

        this.deltaQuat.setFromUnitVectors(

            this.rightRestDirection,

            this.targetDirection.clone().negate()

        );

        this.targetQuat
            .copy(this.rightRestQuat)
            .multiply(this.deltaQuat);

        const localQuat =
            worldToLocalQuaternion(

                this.rightShoulder,

                this.targetQuat

            );

        this.rightSmooth.setTarget(localQuat);

        this.rightShoulder.quaternion.copy(

            this.rightSmooth.update(delta)

        );

    }

    reset() {

        if (!this.enabled) return;

        this.leftShoulder.quaternion.copy(
            this.leftRestQuat
        );

        this.rightShoulder.quaternion.copy(
            this.rightRestQuat
        );

    }

}