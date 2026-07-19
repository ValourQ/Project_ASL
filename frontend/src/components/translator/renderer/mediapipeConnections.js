// -------------------------------
// Pose (Upper Body Only)
// -------------------------------

export const POSE_CONNECTIONS = [
    [11, 12],       // shoulders
    [11, 13], [13, 15], // left arm
    [12, 14], [14, 16], // right arm
    [11, 23],       // left torso side
    [12, 24],       // right torso side
    [23, 24],       // hips
];

// -------------------------------
// Left Hand
// Runtime index starts at 33
// -------------------------------

const L = 33;

export const LEFT_HAND_CONNECTIONS = [

    [L + 0, L + 1],
    [L + 1, L + 2],
    [L + 2, L + 3],
    [L + 3, L + 4],

    [L + 0, L + 5],
    [L + 5, L + 6],
    [L + 6, L + 7],
    [L + 7, L + 8],

    [L + 5, L + 9],
    [L + 9, L + 10],
    [L + 10, L + 11],
    [L + 11, L + 12],

    [L + 9, L + 13],
    [L + 13, L + 14],
    [L + 14, L + 15],
    [L + 15, L + 16],

    [L + 13, L + 17],
    [L + 17, L + 18],
    [L + 18, L + 19],
    [L + 19, L + 20],

    [L + 0, L + 17],

];

// -------------------------------
// Right Hand
// Runtime index starts at 54
// -------------------------------

const R = 54;

export const RIGHT_HAND_CONNECTIONS = [

    [R + 0, R + 1],
    [R + 1, R + 2],
    [R + 2, R + 3],
    [R + 3, R + 4],

    [R + 0, R + 5],
    [R + 5, R + 6],
    [R + 6, R + 7],
    [R + 7, R + 8],

    [R + 5, R + 9],
    [R + 9, R + 10],
    [R + 10, R + 11],
    [R + 11, R + 12],

    [R + 9, R + 13],
    [R + 13, R + 14],
    [R + 14, R + 15],
    [R + 15, R + 16],

    [R + 13, R + 17],
    [R + 17, R + 18],
    [R + 18, R + 19],
    [R + 19, R + 20],

    [R + 0, R + 17],

];

// -------------------------------
// Wrist Bridges
// -------------------------------

export const BRIDGE_CONNECTIONS =[];


// -------------------------------

export const ALL_CONNECTIONS = [

    ...POSE_CONNECTIONS,
    ...LEFT_HAND_CONNECTIONS,
    ...RIGHT_HAND_CONNECTIONS,
    ...BRIDGE_CONNECTIONS,

];