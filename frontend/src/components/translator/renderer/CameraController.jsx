import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * ==========================================================
 * CameraController
 *
 * Default framing targets a professional sign-language
 * interpreter shot: head fully visible, hands centered,
 * waist near the bottom edge. Orbit/zoom/keyboard reset
 * behaviour is unchanged from the original controller.
 * ==========================================================
 */

// Chest / signing-space focal point — hands sit near viewport center.
const DEFAULT_TARGET = [0, 1.06, 0];
const DEFAULT_POSITION = [0, 1.42, 2.45];

const MIN_DISTANCE = 2.0;
const MAX_DISTANCE = 4.5;
// Limit steep bird's-eye angles that crop the head.
const MIN_POLAR_ANGLE = Math.PI / 2.35;
const MAX_POLAR_ANGLE = Math.PI / 1.72;

const KEYBOARD_ROTATE_STEP = THREE.MathUtils.degToRad(4);
const KEYBOARD_ZOOM_STEP = 0.15;

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return undefined;

        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleChange = (event) => setReduced(event.matches);

        query.addEventListener("change", handleChange);
        return () => query.removeEventListener("change", handleChange);
    }, []);

    return reduced;
}

export default function CameraController() {
    const controlsRef = useRef();
    const { camera, gl } = useThree();
    const reducedMotion = usePrefersReducedMotion();

    const defaultPosition = useMemo(
        () => new THREE.Vector3(...DEFAULT_POSITION),
        []
    );
    const defaultTarget = useMemo(
        () => new THREE.Vector3(...DEFAULT_TARGET),
        []
    );

    const resetCamera = useCallback(() => {
        camera.position.copy(defaultPosition);
        if (controlsRef.current) {
            controlsRef.current.target.copy(defaultTarget);
            controlsRef.current.update();
        }
    }, [camera, defaultPosition, defaultTarget]);

    useEffect(() => {
        resetCamera();
    }, [resetCamera]);

    useEffect(() => {
        const dom = gl.domElement;

        dom.tabIndex = 0;
        dom.style.outline = "none";
        dom.setAttribute(
            "aria-label",
            "SignSync sign language avatar viewer. Use arrow keys to orbit, " +
                "plus and minus to zoom, and Home or R to reset the view."
        );

        const offset = new THREE.Vector3();
        const spherical = new THREE.Spherical();

        const handleKeyDown = (event) => {
            const controls = controlsRef.current;
            if (!controls) return;

            if (event.key === "Home" || event.key === "r" || event.key === "R") {
                event.preventDefault();
                resetCamera();
                return;
            }

            let handled = true;

            offset.subVectors(camera.position, controls.target);
            spherical.setFromVector3(offset);

            switch (event.key) {
                case "ArrowLeft":
                    spherical.theta -= KEYBOARD_ROTATE_STEP;
                    break;
                case "ArrowRight":
                    spherical.theta += KEYBOARD_ROTATE_STEP;
                    break;
                case "ArrowUp":
                    spherical.phi = THREE.MathUtils.clamp(
                        spherical.phi - KEYBOARD_ROTATE_STEP,
                        MIN_POLAR_ANGLE,
                        MAX_POLAR_ANGLE
                    );
                    break;
                case "ArrowDown":
                    spherical.phi = THREE.MathUtils.clamp(
                        spherical.phi + KEYBOARD_ROTATE_STEP,
                        MIN_POLAR_ANGLE,
                        MAX_POLAR_ANGLE
                    );
                    break;
                case "+":
                case "=":
                    spherical.radius = THREE.MathUtils.clamp(
                        spherical.radius - KEYBOARD_ZOOM_STEP,
                        MIN_DISTANCE,
                        MAX_DISTANCE
                    );
                    break;
                case "-":
                case "_":
                    spherical.radius = THREE.MathUtils.clamp(
                        spherical.radius + KEYBOARD_ZOOM_STEP,
                        MIN_DISTANCE,
                        MAX_DISTANCE
                    );
                    break;
                default:
                    handled = false;
            }

            if (!handled) return;

            event.preventDefault();
            spherical.makeSafe();
            offset.setFromSpherical(spherical);
            camera.position.copy(controls.target).add(offset);
            controls.update();
        };

        const handleDoubleClick = () => resetCamera();

        dom.addEventListener("keydown", handleKeyDown);
        dom.addEventListener("dblclick", handleDoubleClick);

        return () => {
            dom.removeEventListener("keydown", handleKeyDown);
            dom.removeEventListener("dblclick", handleDoubleClick);
        };
    }, [camera, gl, resetCamera]);

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom
            enableRotate
            enableDamping={!reducedMotion}
            dampingFactor={0.08}
            rotateSpeed={0.6}
            zoomSpeed={0.8}
            target={DEFAULT_TARGET}
            minDistance={MIN_DISTANCE}
            maxDistance={MAX_DISTANCE}
            minPolarAngle={MIN_POLAR_ANGLE}
            maxPolarAngle={MAX_POLAR_ANGLE}
        />
    );
}
