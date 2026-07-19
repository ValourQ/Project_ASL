import { useEffect, useRef } from "react";

import animationPlayer from "../../../services/animationPlayer";

import sampleFrame from "./sampleFrame";
import { prepareFrame } from "./utils";

/**
 * ==========================================================
 * useSkeletonFrameRef
 *
 * Bridges the existing animationPlayer service (unchanged,
 * untouched) into the renderer without going through React
 * state. animationPlayer.onFrame already fires once per
 * playback tick (with interpolation handled upstream) — if
 * we called setState here, every tick would re-render the
 * entire skeleton React tree.
 *
 * Instead we write the prepared frame into a ref. Every
 * InstancedMesh-based renderer reads that ref inside its own
 * useFrame callback, so the render (rAF) loop and the data
 * (playback) update are fully decoupled from React's
 * reconciliation cycle, per the spec's "animation updates
 * should happen directly inside Three.js" requirement.
 *
 * Falls back to a static idle pose (sampleFrame) whenever no
 * live frame has arrived yet, or after playback finishes.
 * ==========================================================
 */
export default function useSkeletonFrameRef() {
    const frameRef = useRef(prepareFrame(sampleFrame));

    useEffect(() => {
       animationPlayer.onFrame = (currentFrame) => {
       if (!currentFrame) return;
            frameRef.current = prepareFrame(currentFrame);
        };
        animationPlayer.onFinish = () => {
            // Playback state (loading/error/finished) is owned by the
            // translation page UI, not the renderer. We intentionally
            // do not reset frameRef here — the skeleton simply holds
            // its last pose, which reads as "hologram idling" rather
            // than snapping back or disappearing.
        };

        return () => {
            animationPlayer.onFrame = null;
            animationPlayer.onFinish = null;
        };
    }, []);

    return frameRef;
}
