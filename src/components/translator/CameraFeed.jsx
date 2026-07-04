import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import {
  Camera,
  CameraOff,
  Image,
  Video,
  Maximize2,
  Play,
  Square,
  Hand,
  SlidersHorizontal,
  X
} from "lucide-react";

import styles from "../../styles/translator/CameraFeed.module.css";

function CameraFeed({
  webcamRef,
  cameraReady,
  setCameraReady,
  isDetecting,
}) {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const cameraStageRef = useRef(null);

  const [inputMode, setInputMode] = useState("camera");
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [sharpness, setSharpness] = useState(100);
  const [mirror, setMirror] = useState(true);

  const webcamConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const shouldShowPlaceholder =
    (inputMode === "camera" && !cameraReady) ||
    (inputMode === "image" && !imagePreview) ||
    (inputMode === "video" && !videoPreview);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreview, videoPreview]);

  useEffect(() => {
    if (inputMode !== "camera") {
      setShowSettings(false);
    }
  }, [inputMode]);

  const handleImageUpload = (event) => {

      const file = event.target.files[0];

      if (!file) return;

      setCameraReady(false);

      setVideoPreview(null);

      setInputMode("image");

      setImagePreview(URL.createObjectURL(file));
  };
  
  const handleVideoUpload = (event) => {

      const file = event.target.files[0];

      if (!file) return;

      setCameraReady(false);

      setImagePreview(null);

      setInputMode("video");

      setVideoPreview(URL.createObjectURL(file));
  };

  const handleFullscreen = () => {
    if (!cameraStageRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    cameraStageRef.current.requestFullscreen();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.iconBox}>
            <Hand size={20} />
          </div>
          
          <div>
            <h3>Sign Input</h3>
            <p>Capture signs in real time</p>
          </div>
        </div>
      </div>

      <div className={styles.inputModes}>
        <button
          className={`${styles.modeButton} ${
            inputMode === "camera" ? styles.active : ""
          }`}
         onClick={() => {

              setImagePreview(null);

              setVideoPreview(null);

              setInputMode("camera");

          }}
          type="button"
        >
          <Camera size={16} />
          Live Camera
        </button>

        <button
          className={`${styles.modeButton} ${
            inputMode === "image" ? styles.active : ""
          }`}
          onClick={() => imageInputRef.current?.click()}
          type="button"
        >
          <Image size={16} />
          Upload Image
        </button>

        <button
          className={`${styles.modeButton} ${
            inputMode === "video" ? styles.active : ""
          }`}
          onClick={() => videoInputRef.current?.click()}
          type="button"
        >
        <Video size={16} />
          Upload Video
        </button>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />

        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={handleVideoUpload}
        />
      </div>

      <div className={styles.cameraContainer} ref={cameraStageRef}>
        {inputMode === "camera" && (
        <div className={styles.statusBar}>
          <span
            className={`${styles.status} ${
              isDetecting
                ? styles.detecting
                : cameraReady
                  ? styles.live
                  : styles.offline
            }`}
          >
            <span className={styles.statusDot} />
            {isDetecting ? "Detecting" : cameraReady ? "Live" : "Camera Off"}
          </span>

          <span className={styles.fps}>FPS : 30</span>
        </div>
        )}
          <div
           className={`${styles.preview} ${
           inputMode !== "camera" ? styles.uploadPreview : ""
           }`}
           style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${sharpness}%)`,
           }}
          >
          {inputMode === "camera" && cameraReady && (
            <Webcam
              ref={webcamRef}
              mirrored={mirror}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={webcamConstraints}
              className={styles.webcam}
            />
          )}

          {inputMode === "image" && imagePreview && (
            <div className={styles.imageWrapper}>
              <button
                  className={styles.removePreview}
                  onClick={() => {

                      setImagePreview(null);

                      setInputMode("image");

                      imageInputRef.current.value = "";

                  }}
              >

                  <X size={18}/>

              </button>

              <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className={styles.previewImage}
              />

          </div>
          )}

          {inputMode === "video" && videoPreview && (

          <div className={styles.videoWrapper}>
              <button
                  className={styles.removePreview}
                  onClick={() => {

                      setVideoPreview(null);

                      setInputMode("video");

                      videoInputRef.current.value = "";

                  }}
              >

                  <X size={18}/>

              </button>
            <video className={styles.previewVideo} controls>
              <source src={videoPreview} />
            </video>
          </div>
          )}

          {shouldShowPlaceholder && (
            <div className={styles.placeholder}>
              <CameraOff size={72} />
              <h2>
                {inputMode === "camera"
                  ? "Camera Ready"
                  : inputMode === "image"
                    ? "Upload an Image"
                    : "Upload a Video"}
              </h2>
              <p>
                {inputMode === "camera"
                  ? "Click Start Camera to begin live recognition."
                  : inputMode === "image"
                    ? "Choose an image to preview and translate."
                    : "Choose a video to preview and translate."}
              </p>
            </div>
          )}
        </div>
        <div className={styles.overlayButtons}>
          {inputMode === "camera" && (
            <button
              className={`${styles.overlayButton} ${
                showSettings ? styles.overlayButtonActive : ""
              }`}
              onClick={() => setShowSettings((current) => !current)}
              title="Camera settings"
              type="button"
              aria-label="Toggle camera settings"
            >
              <SlidersHorizontal size={18} />
            </button>
          )}

          <button
            className={styles.overlayButton}
            onClick={handleFullscreen}
            title="Fullscreen"
            type="button"
            aria-label="Open camera preview in fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>

        {inputMode === "camera" && showSettings && (
          <div className={styles.settingsPanel}>
            <div className={styles.setting}>
              <label htmlFor="camera-brightness">Brightness</label>
              <input
                id="camera-brightness"
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(event) => setBrightness(Number(event.target.value))}
              />
            </div>

            <div className={styles.setting}>
              <label htmlFor="camera-contrast">Contrast</label>
              <input
                id="camera-contrast"
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(event) => setContrast(Number(event.target.value))}
              />
            </div>

            <div className={styles.setting}>
              <label htmlFor="camera-sharpness">Sharpness</label>
              <input
                id="camera-sharpness"
                type="range"
                min="50"
                max="150"
                value={sharpness}
                onChange={(event) => setSharpness(Number(event.target.value))}
              />
            </div>

            <label className={styles.toggleSetting}>
              <input
                type="checkbox"
                checked={mirror}
                onChange={(event) => setMirror(event.target.checked)}
              />
              <span>Mirror</span>
            </label>
          </div>
        )}


        {inputMode === "camera" && (
        <div className={styles.controls}>
          {!cameraReady ? (
            <button
              className={styles.startButton}
              onClick={() => {
                setInputMode("camera");
                setCameraReady(true);
              }}
              type="button"
            >
              <Play size={18} />
              Start Camera
            </button>
          ) : (
            <button
              className={styles.stopButton}
              onClick={() => setCameraReady(false)}
              type="button"
            >
              <Square size={18} />
              Stop Camera
            </button>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default CameraFeed;
