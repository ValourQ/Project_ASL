import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef } from "react";

const CAMERA_OFFSET = new Vector3(0, 0.9, 3.3);
const LOOK_OFFSET = new Vector3(0, 0.35, 0);

export default function CameraRig({ frame }) {
    const { camera } = useThree();

    const cameraTarget = useRef(new Vector3());
    const lookTarget = useRef(new Vector3());

    useFrame(() => {
        if (
            !Array.isArray(frame) ||
            frame.length < 25
        ) {
            return;
        }

        const leftShoulder = frame[11];
        const rightShoulder = frame[12];
        const leftHip = frame[23];
        const rightHip = frame[24];

        if (
            !leftShoulder ||
            !rightShoulder ||
            !leftHip ||
            !rightHip
        ) {
            return;
        }

        const center = new Vector3(
            (
                leftShoulder[0] +
                rightShoulder[0] +
                leftHip[0] +
                rightHip[0]
            ) / 4,

            (
                leftShoulder[1] +
                rightShoulder[1] +
                leftHip[1] +
                rightHip[1]
            ) / 4,

            (
                leftShoulder[2] +
                rightShoulder[2] +
                leftHip[2] +
                rightHip[2]
            ) / 4
        );

        cameraTarget.current
            .copy(center)
            .add(CAMERA_OFFSET);

        lookTarget.current
            .copy(center)
            .add(LOOK_OFFSET);

        camera.position.lerp(
            cameraTarget.current,
            0.08
        );

        camera.lookAt(lookTarget.current);
    });

    return null;
}