export default function Lighting() {
    return (
        <>
            {/* Soft base fill */}
            <ambientLight intensity={0.38} color="#E8EAED" />

            {/* Sky / ground bounce for natural shading on the mannequin */}
            <hemisphereLight
                intensity={0.42}
                color="#F4F5F7"
                groundColor="#2A2E34"
            />

            {/* Main key light — front-left, soft studio */}
            <directionalLight
                castShadow
                position={[-2.8, 4.2, 4.5]}
                intensity={0.95}
                color="#FFFFFF"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.5}
                shadow-camera-far={18}
                shadow-camera-left={-3}
                shadow-camera-right={3}
                shadow-camera-top={3}
                shadow-camera-bottom={-3}
                shadow-bias={-0.00025}
                shadow-normalBias={0.02}
            />

            {/* Fill light — front-right, lifts hand detail against torso */}
            <directionalLight
                position={[3.2, 2.8, 3.8]}
                intensity={0.32}
                color="#F0F2F5"
            />

            {/* Weak rim for shoulder / hand separation */}
            <directionalLight
                position={[0, 2.4, -4.2]}
                intensity={0.22}
                color="#D8DCE2"
            />
        </>
    );
}
