import * as THREE from "three";

/* ----------------------------------------------------------
   Temporary reusable math objects
---------------------------------------------------------- */

const LEFT_SHOULDER = new THREE.Vector3();
const RIGHT_SHOULDER = new THREE.Vector3();

const LEFT_HIP = new THREE.Vector3();
const RIGHT_HIP = new THREE.Vector3();

const SHOULDER_CENTER = new THREE.Vector3();
const HIP_CENTER = new THREE.Vector3();

const X = new THREE.Vector3();
const Y = new THREE.Vector3();
const Z = new THREE.Vector3();

const DIR = new THREE.Vector3();

const TORSO_MATRIX = new THREE.Matrix4();

const TORSO_QUAT = new THREE.Quaternion();
const INV_TORSO = new THREE.Quaternion();

const WORLD_QUAT = new THREE.Quaternion();
const LOCAL_QUAT = new THREE.Quaternion();

const TARGET_QUAT = new THREE.Quaternion();

const REST_DIR = new THREE.Vector3();

const TMP_A = new THREE.Vector3();
const TMP_B = new THREE.Vector3();

/* ----------------------------------------------------------
   Pose landmark indices
---------------------------------------------------------- */

export const POSE = {

    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,

    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,

    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,

    LEFT_HIP: 23,
    RIGHT_HIP: 24,

};

/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */

function point(frame, index, out) {

    const p = frame[index];

    if (!p) return false;

    out.set(

        p[0],
        p[1],
        p[2]

    );

    return true;

}

function direction(frame, a, b, out) {

    if (
        !point(frame, a, TMP_A) ||
        !point(frame, b, TMP_B)
    ) {

        return false;

    }

    out.subVectors(TMP_B, TMP_A);

    if (out.lengthSq() < 1e-8)
        return false;

    out.normalize();

    return true;

}

function midpoint(a, b, out) {

    out.copy(a)
        .add(b)
        .multiplyScalar(0.5);

}

/* ----------------------------------------------------------
   Torso Coordinate Frame
---------------------------------------------------------- */

function buildTorsoBasis(frame) {

    if (
        !point(frame, POSE.LEFT_SHOULDER, LEFT_SHOULDER) ||
        !point(frame, POSE.RIGHT_SHOULDER, RIGHT_SHOULDER) ||
        !point(frame, POSE.LEFT_HIP, LEFT_HIP) ||
        !point(frame, POSE.RIGHT_HIP, RIGHT_HIP)
    ) {
        return false;
    }

    midpoint(
        LEFT_SHOULDER,
        RIGHT_SHOULDER,
        SHOULDER_CENTER
    );

    midpoint(
        LEFT_HIP,
        RIGHT_HIP,
        HIP_CENTER
    );

    Y.subVectors(
        SHOULDER_CENTER,
        HIP_CENTER
    ).normalize();

    X.subVectors(
        RIGHT_SHOULDER,
        LEFT_SHOULDER
    ).normalize();

    Z.crossVectors(
        X,
        Y
    ).normalize();

    X.crossVectors(
        Y,
        Z
    ).normalize();

    TORSO_MATRIX.makeBasis(
        X,
        Y,
        Z
    );

    TORSO_QUAT.setFromRotationMatrix(
        TORSO_MATRIX
    );

    INV_TORSO
        .copy(TORSO_QUAT)
        .invert();

    return true;

}

/* ----------------------------------------------------------
   Bone Cache
---------------------------------------------------------- */

export function cacheRig(vrm) {

    const humanoid = vrm.humanoid;

    const names = [

        "hips",

        "spine",

        "chest",

        "upperChest",

        "neck",

        "head",

        "leftShoulder",

        "rightShoulder",

        "leftUpperArm",

        "rightUpperArm",

        "leftLowerArm",

        "rightLowerArm",

        "leftHand",

        "rightHand"

    ];

    const rig = {

        humanoid,

        bones: {}

    };

    for (const name of names) {

        const bone =
            humanoid.getNormalizedBoneNode(name);

        if (!bone)
            continue;

        rig.bones[name] = {

            node: bone,

            restQuaternion:
                bone.quaternion.clone(),

            restWorld:
                new THREE.Quaternion(),

            parentWorld:
                new THREE.Quaternion(),

            restDirection:
                new THREE.Vector3(),

            worldPosition:
                new THREE.Vector3()

        };

    }

    vrm.scene.updateMatrixWorld(true);

    return rig;

}

/* ----------------------------------------------------------
   Compute Rest Directions
---------------------------------------------------------- */

export function computeRestDirections(rig) {

    const pairs = [

        ["leftUpperArm","leftLowerArm"],

        ["leftLowerArm","leftHand"],

        ["rightUpperArm","rightLowerArm"],

        ["rightLowerArm","rightHand"]

    ];

    for (const [a,b] of pairs) {

        const first = rig.bones[a];
        const second = rig.bones[b];

        if (!first || !second)
            continue;

        first.node.getWorldPosition(
            TMP_A
        );

        second.node.getWorldPosition(
            TMP_B
        );

        first.restDirection
            .subVectors(
                TMP_B,
                TMP_A
            )
            .normalize();

        first.node.getWorldQuaternion(
            first.restWorld
        );

    }

}

