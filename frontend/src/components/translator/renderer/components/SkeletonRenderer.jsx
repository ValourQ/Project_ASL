import VRMSigner from "./VRMSigner";

export default function SkeletonRenderer({ frameRef }) {
    return frameRef ? <VRMSigner frameRef={frameRef} /> : null;
}