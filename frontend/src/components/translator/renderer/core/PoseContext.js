import * as THREE from "three";
import {
    shoulderCenter,
    hipCenter,
    shoulderVector,
    spineVector,
} from "../utils/PoseUtils";

export default class PoseContext {
    constructor() {
        this.frame = null;
        this.delta = 1 / 60;

        // Landmark-derived positions
        this.shoulderCenter = new THREE.Vector3();
        this.hipCenter = new THREE.Vector3();

        // Body axes
        this.spineUp = new THREE.Vector3();
        this.shoulderRight = new THREE.Vector3();
        this.bodyForward = new THREE.Vector3();

        // Orientation
        this.bodyMatrix = new THREE.Matrix4();
        this.bodyQuaternion = new THREE.Quaternion();
    }

    update(frame, delta = 1 / 60) {
        this.frame = frame;
        this.delta = delta;

        shoulderCenter(frame, this.shoulderCenter);
        hipCenter(frame, this.hipCenter);

        spineVector(frame, this.spineUp);
        shoulderVector(frame, this.shoulderRight);

        if (this.spineUp.lengthSq() > 0) {
            this.spineUp.normalize();
        }

        if (this.shoulderRight.lengthSq() > 0) {
            this.shoulderRight.normalize();
        }

        // Forward = Right × Up
        this.bodyForward.crossVectors(
            this.shoulderRight,
            this.spineUp
        );

        if (this.bodyForward.lengthSq() > 0) {
            this.bodyForward.normalize();
        }

        // Recompute right axis to guarantee an orthonormal basis
        this.shoulderRight.crossVectors(
            this.spineUp,
            this.bodyForward
        );

        if (this.shoulderRight.lengthSq() > 0) {
            this.shoulderRight.normalize();
        }

        this.bodyMatrix.makeBasis(
            this.shoulderRight,
            this.spineUp,
            this.bodyForward
        );

        this.bodyQuaternion.setFromRotationMatrix(
            this.bodyMatrix
        );
    }
}