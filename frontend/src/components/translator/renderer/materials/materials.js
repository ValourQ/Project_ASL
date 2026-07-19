import * as THREE from "three";

/**
 * Shared studio mannequin palette — neutral gray, opaque,
 * matte with a slight metallic sheen. Used by VRM and any
 * skeleton-style fallback renderers.
 */
export const AVATAR_COLOR = "#8A8F96";
export const AVATAR_ROUGHNESS = 0.62;
export const AVATAR_METALNESS = 0.18;

export const COLORS = {
    body: AVATAR_COLOR,
    hand: "#7E848C",
    joint: "#949AA3",
    fingertip: "#6E737A",
    head: AVATAR_COLOR,
    platform: "#1C2430",
};

export function createAvatarMaterial(overrides = {}) {
    return new THREE.MeshStandardMaterial({
        color: AVATAR_COLOR,
        roughness: AVATAR_ROUGHNESS,
        metalness: AVATAR_METALNESS,
        emissive: "#000000",
        emissiveIntensity: 0,
        transparent: false,
        opacity: 1,
        ...overrides,
    });
}

export const BODY_MATERIAL = createAvatarMaterial();

export const HAND_MATERIAL = createAvatarMaterial({
    color: COLORS.hand,
});

export const JOINT_MATERIAL = createAvatarMaterial({
    color: COLORS.joint,
});

export const HEAD_MATERIAL = createAvatarMaterial({
    color: COLORS.head,
    roughness: 0.58,
});

export function createSurfaceMaterial(color = AVATAR_COLOR, overrides = {}) {
    return createAvatarMaterial({ color, ...overrides });
}
