import * as THREE from "three";

import {
    upperArmVector,
    lowerArmVector
} from "../utils/PoseUtils";

import {
    bindDirection,
    bindQuaternion,
    worldToLocalQuaternion
} from "../utils/BoneMath";

import {
    SmoothQuaternion
} from "../utils/Smoothing";

export default class ArmSolver {

    constructor(vrm) {

        this.vrm = vrm;

        const h = vrm.humanoid;

        this.leftUpperArm = h.getNormalizedBoneNode("leftUpperArm");
        this.rightUpperArm = h.getNormalizedBoneNode("rightUpperArm");

        this.leftLowerArm = h.getNormalizedBoneNode("leftLowerArm");
        this.rightLowerArm = h.getNormalizedBoneNode("rightLowerArm");

        this.leftHand = h.getNormalizedBoneNode("leftHand");
        this.rightHand = h.getNormalizedBoneNode("rightHand");

        this.cacheRestPose();

        this.tempVec = new THREE.Vector3();

        this.deltaQuat = new THREE.Quaternion();

        this.targetQuat = new THREE.Quaternion();

        this.leftUpperSmooth = new SmoothQuaternion(16);
        this.rightUpperSmooth = new SmoothQuaternion(16);

        this.leftLowerSmooth = new SmoothQuaternion(18);
        this.rightLowerSmooth = new SmoothQuaternion(18);

    }

    cacheRestPose() {

        this.leftUpperDir =
            bindDirection(
                this.leftUpperArm,
                this.leftLowerArm
            );

        this.rightUpperDir =
            bindDirection(
                this.rightUpperArm,
                this.rightLowerArm
            );

        this.leftLowerDir =
            bindDirection(
                this.leftLowerArm,
                this.leftHand
            );

        this.rightLowerDir =
            bindDirection(
                this.rightLowerArm,
                this.rightHand
            );

        this.leftUpperQuat =
            bindQuaternion(this.leftUpperArm);

        this.rightUpperQuat =
            bindQuaternion(this.rightUpperArm);

        this.leftLowerQuat =
            bindQuaternion(this.leftLowerArm);

        this.rightLowerQuat =
            bindQuaternion(this.rightLowerArm);

    }

    update(frame, delta) {

        this.solveLeft(frame, delta);

        this.solveRight(frame, delta);

    }

    solveLeft(frame, delta) {

        upperArmVector(frame, true, this.tempVec);

        this.deltaQuat.setFromUnitVectors(

            this.leftUpperDir,

            this.tempVec

        );

        this.targetQuat.copy(
            this.leftUpperQuat
        ).multiply(
            this.deltaQuat
        );

        const localUpper =
            worldToLocalQuaternion(

                this.leftUpperArm,

                this.targetQuat

            );

        this.leftUpperSmooth.setTarget(
            localUpper
        );

        this.leftUpperArm.quaternion.copy(

            this.leftUpperSmooth.update(delta)

        );

        lowerArmVector(frame, true, this.tempVec);

        this.deltaQuat.setFromUnitVectors(

            this.leftLowerDir,

            this.tempVec

        );

        this.targetQuat.copy(
            this.leftLowerQuat
        ).multiply(
            this.deltaQuat
        );

        const localLower =
            worldToLocalQuaternion(

                this.leftLowerArm,

                this.targetQuat

            );

        this.leftLowerSmooth.setTarget(
            localLower
        );

        this.leftLowerArm.quaternion.copy(

            this.leftLowerSmooth.update(delta)

        );

    }

    solveRight(frame, delta) {

        upperArmVector(frame, false, this.tempVec);

        this.deltaQuat.setFromUnitVectors(

            this.rightUpperDir,

            this.tempVec

        );

        this.targetQuat.copy(
            this.rightUpperQuat
        ).multiply(
            this.deltaQuat
        );

        const localUpper =
            worldToLocalQuaternion(

                this.rightUpperArm,

                this.targetQuat

            );

        this.rightUpperSmooth.setTarget(
            localUpper
        );

        this.rightUpperArm.quaternion.copy(

            this.rightUpperSmooth.update(delta)

        );

        lowerArmVector(frame, false, this.tempVec);

        this.deltaQuat.setFromUnitVectors(

            this.rightLowerDir,

            this.tempVec

        );

        this.targetQuat.copy(
            this.rightLowerQuat
        ).multiply(
            this.deltaQuat
        );

        const localLower =
            worldToLocalQuaternion(

                this.rightLowerArm,

                this.targetQuat

            );

        this.rightLowerSmooth.setTarget(
            localLower
        );

        this.rightLowerArm.quaternion.copy(

            this.rightLowerSmooth.update(delta)

        );

    }

}