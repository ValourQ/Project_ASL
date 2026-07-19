import VrmSigner from "./VrmSigner";

export default function SkeletonRenderer({ frameRef }) {
    return frameRef ? <VrmSigner frameRef={frameRef} /> : null;
}