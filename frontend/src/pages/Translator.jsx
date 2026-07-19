import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AssistantCard from "../components/translator/AssistantCard";
import TranslatorToggle from "../components/translator/TranslatorToggle";
import CameraFeed from "../components/translator/CameraFeed";
import TranslationPanel from "../components/translator/TranslationPanel";
import SessionAnalytics from "../components/translator/SessionAnalytics";
import RecentPredictions from "../components/translator/RecentPredictions";
import TextInput from "../components/translator/TextInput";
import AvatarPreview from "../components/translator/AvatarPreview";
import styles from "../styles/translator/Translator.module.css";
import { useParams } from "react-router-dom";
import useTextToSign from "../hooks/useTextToSign";

function Translator() {
    /*============Translator=========*/
    const navigate = useNavigate();
    const [translatorMode, setTranslatorMode] = useState("sign");
    const {text,setText,loading,error,translation,sequence,statistics,
        runtime,summary,supportedWords,translate, clearTranslation,} = useTextToSign();
    const onGenerate = async () => {
    await translate();};

    /* ================= MODE ================= */

    const { mode } = useParams();
    const [sourceMode, setSourceMode] = useState(
    mode === "text" ? "text" : "sign");
    useEffect(() => {

        setSourceMode(
            mode === "text"
                ? "text"
                : "sign"
        );

    }, [mode]);
    const [animating, setAnimating] = useState(false);

    const targetMode = sourceMode === "sign" ? "text" : "sign";

    const swapModes = () => {

        setAnimating(true);

        setTimeout(() => {

            setSourceMode(prev =>
                prev === "sign" ? "text" : "sign"
            );

            setAnimating(false);

        },200);

    };

    /* ================= TRANSLATION ================= */

    const [prediction, setPrediction] = useState("Waiting...");
    const history = [

    {

        sign:"Hello",

        accuracy:98,

        time:"10:26 AM",

        source:"camera"

    },

    {

        sign:"Thank You",

        accuracy:96,

        time:"10:24 AM",

        source:"image"

    },

    {

        sign:"Good Morning",

        accuracy:95,

        time:"10:21 AM",

        source:"video"

    }

];
    /* ================= ANALYTICS ================= */

    const [accuracy, setAccuracy] = useState(98);
    const [latency, setLatency] = useState(28);
    const [sessionTime] = useState("05:13");
    const [signsDetected] = useState(12);

    /* ================= CAMERA ================= */

    const webcamRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);

    /* ================= BACKEND ================= */

        const fetchPrediction = async () => {

        if (!webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();

        if (!imageSrc) return;

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":"application/json"
                    },

                    body: JSON.stringify({
                        image:imageSrc
                    })

                }
            );

            const data = await response.json();

            setPrediction(data.sign);

            setAccuracy(data.accuracy);

            setLatency(data.latency);

        }

        catch(err){

            console.error(err);

        }

      };

     useEffect(() => {

        if(!cameraReady){

            setIsDetecting(false);

            return;

        }

        setIsDetecting(true);

        const interval=setInterval(()=>{

            fetchPrediction();

        },300);

        return ()=>{

            clearInterval(interval);

            setIsDetecting(false);

        };

    },[cameraReady]);

    
    return (

        <AppLayout>

            <div className={styles.container}>

                {/* Header */}

                <div className={styles.header}>

                    <h1 className={styles.pageTitle}>
                        Translator
                    </h1>

                    <p className={styles.subtitle}>
                        Seamless Sign ⇄ Text Translation
                    </p>

                </div>

                {/* Toggle */}

                <TranslatorToggle
                    sourceMode={sourceMode}
                    setSourceMode={setSourceMode}
                    animating={animating}
                    setAnimating={setAnimating}
                />

                {/* Assistant */}

                <AssistantCard
                    sourceMode={sourceMode}
                />

                {/* Workspace */}

                <div
                    className={`
                        ${styles.mainGrid}
                        ${
                            sourceMode === "sign"
                                ? styles.signMainGrid
                                : styles.textMainGrid
                        }
                        ${
                            animating
                                ? styles.fadeOut
                                : styles.fadeIn
                        }
                    `}
                >

                    {sourceMode === "sign" ? (

                        <>
                            <CameraFeed
                               webcamRef={webcamRef}
                               cameraReady={cameraReady}
                               setCameraReady={setCameraReady}
                               isDetecting={isDetecting}
                            />

                           <TranslationPanel
                                prediction={prediction}
                            />
                        </>

                    ) : (
                        <>
                        <div className={styles.textInput}>
                            <TextInput

                                text={text}

                                setText={setText}

                                onGenerate={onGenerate}

                                error={error}

                                loading={loading}

                            />
                        </div>

                        <div className={styles.avatarPreview}>
                           <AvatarPreview
                                translation={translation}
                                sequence={sequence}
                                statistics={statistics}
                                runtime={runtime}
                                loading={loading}
                                onClear={clearTranslation}
                            />
                        </div>
                      </>
                    )}

                </div>

                {/* Bottom */}

                <div
                    className={`${styles.bottomGrid}
                    ${
                        sourceMode==="sign"

                        ? styles.signModeGrid

                        : styles.textModeGrid
                    }`}
                >
  
                    <SessionAnalytics
                        accuracy={accuracy}
                        latency={latency}
                        sessionTime={sessionTime}
                        signsDetected={signsDetected}
                    />

                    <RecentPredictions
                        history={history}
                    />

                </div>

                <footer className={styles.footer}>

                    <p>
                        SignSync © {new Date().getFullYear()} · Making communication accessible for everyone
                    </p>

                </footer>

            </div>

        </AppLayout>

    );

}

export default Translator;