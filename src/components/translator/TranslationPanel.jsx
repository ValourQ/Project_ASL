import {
    Clipboard,
    Volume2,
    Save,
    Trash2,
    RefreshCcw,
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Sparkles,
    Circle,
    Check,
    HeartPlus,
    HeartHandshake
} from "lucide-react";
import { useState } from "react";
import styles from "../../styles/translator/TranslationPanel.module.css";

function TranslationPanel({

    prediction,
    accuracy,
    isDetecting,
    sourceMode

}) {
    
    /* ================= ACTIONS ================= */

    const copyText = () => {

        navigator.clipboard.writeText(prediction);

    };

    const speakText = () => {

        if (!prediction || prediction === "Waiting...") return;

        const speech = new SpeechSynthesisUtterance(prediction);

        speech.lang = "en-US";

        window.speechSynthesis.speak(speech);

    };

    const clearText = () => {

        window.location.reload();

    };
    
    const [feedback, setFeedback] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [retrying,setRetrying]=useState(false);
    const handleRetry=()=>{
        setRetrying(true);
        setFeedback(null);
        setTimeout(()=>{
            setRetrying(false);
        },700);
    };
    const handleLike = () => {
        setFeedback("like");
       setFeedbackMessage(
            <>
                <HeartPlus size={16} />
                <span>Thanks for your feedback!</span>
            </>
        );

        setTimeout(() => {

            setFeedbackMessage("");

        }, 2500);

    };

    const handleDislike = () => {

        setFeedback("dislike");

        setFeedbackMessage(
            <>
                <HeartHandshake size={16} />
                <span>Thanks! We'll use this to improve.</span>
            </>
        );

        setTimeout(() => {

            setFeedbackMessage("");

        }, 2500);

    };

    return (

        <div className={styles.card}>

            {/* ================= HEADER ================= */}

            <div className={styles.header}>

                <div className={styles.headerLeft}>

                    <div className={styles.headerIcon}>

                        <MessageCircle size={30}/>

                    </div>

                    <div>

                        <h2>

                            {sourceMode === "sign"

                                ? "Sign Output"

                                : "Text Output"

                            }

                        </h2>

                        <p>

                            Live Translation

                        </p>

                    </div>

                </div>

                <span
                    className={`${styles.statusBadge}
                    ${
                        isDetecting
                            ? styles.detecting
                            : styles.ready
                    }`}
                >

                    <Circle
                        size={8}
                        fill="currentColor"
                    />

                    {

                        isDetecting

                            ? "Detecting"

                            : "Ready"

                    }

                </span>

            </div>

            {/* ================= DETECTED SIGN ================= */}

            <div className={styles.section}>

                <div className={styles.sectionTitle}>

                    <Sparkles size={16}/>

                    <span>

                        Detected Sign

                    </span>

                </div>

                <div className={styles.detectedGrid}>

                    {/* LEFT */}

                    <div className={styles.handPreview}>

                        <img
                            src="/hand-placeholder.png"
                            alt="Detected Sign"
                        />

                    </div>

                    {/* RIGHT */}

                    <div className={styles.detectedInfo}>

                        <div className={styles.wordRow}>

                            <h1>

                                {prediction || "Waiting..."}

                            </h1>

                            {

                                prediction &&
                                prediction !== "Waiting..." &&

                                <span className={styles.looksRight}>

                                    <Check size={16}/>

                                    Looks right?

                                </span>

                            }

                        </div>

                        <div className={styles.infoBlock}>

                           
                            <span className={styles.accuracyBadge}>

                                {accuracy}% Accurate

                            </span>

                        </div>

                        <div className={styles.feedbackButtons}>
                           {
                                feedbackMessage && (

                                    <div className={styles.feedbackMessage}>

                                        {feedbackMessage}

                                    </div>

                                )
                            }
                           <button

                                className={`${styles.likeButton}
                                ${
                                    feedback === "like"
                                        ? styles.activeLike
                                        : ""
                                }`}

                                onClick={handleLike}

                            >

                                <ThumbsUp size={18}/>

                            </button>

                            <button

                                className={`${styles.dislikeButton}
                                ${
                                    feedback === "dislike"
                                        ? styles.activeDislike
                                        : ""
                                }`}

                                onClick={handleDislike}

                            >

                                <ThumbsDown size={18}/>

                            </button>

                           <button

                                className={`${styles.retryButton}
                                ${
                                    retrying
                                    ?styles.retrying
                                    :""
                                }`}

                                onClick={handleRetry}

                            > <RefreshCcw/>
                                Try Again
                            </button>

                        </div>

                    </div>

                </div>

            </div>

                {/* ================= TRANSCRIPT ================= */}

            <div className={styles.transcriptSection}>

                <h4>

                    Transcript

                </h4>

                <div className={styles.transcriptCard}>

                    <div className={styles.transcriptIcon}>

                        <MessageCircle size={26}/>

                    </div>

                    <div className={styles.transcriptContent}>

                        {

                            prediction &&
                            prediction !== "Waiting..."

                            ?

                            <>

                                <h3>

                                    {prediction}!

                                </h3>

                                <p>

                                    The sign has been successfully translated.

                                </p>

                            </>

                            :

                            <>

                                <h3>

                                    Waiting...

                                </h3>

                                <p>

                                    Start your camera to begin recognizing sign language.

                                </p>

                            </>

                        }

                    </div>

                </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className={styles.actions}>

                <button

                    className={styles.actionButton}

                    onClick={copyText}

                >

                    <Clipboard size={20}/>

                    Copy

                </button>

                <button

                    className={styles.actionButton}

                    onClick={speakText}

                >

                    <Volume2 size={20}/>

                    Speak

                </button>

                <button

                    className={styles.actionButton}

                >

                    <Save size={20}/>

                    Save

                </button>

                <button

                    className={`${styles.actionButton} ${styles.clearButton}`}

                    onClick={clearText}

                >

                    <Trash2 size={20}/>

                    Clear

                </button>

            </div>

        </div>

    );

}

export default TranslationPanel;