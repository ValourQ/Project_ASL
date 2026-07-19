/**
 * Fresnel rim-glow has been removed from the renderer.
 * These exports remain as no-ops so legacy skeleton
 * components keep importing without shader injection.
 */

export function createFresnelInjector() {
    return undefined;
}

export const defaultFresnelGlow = undefined;
