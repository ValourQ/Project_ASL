import {

    Hand,

    Circle,

    RotateCcw,

    Pause,

    Download,

    Trash2,

    Sparkles

} from "lucide-react";
import CanvasScene from "./renderer/CanvasScene";
import styles from "../../styles/translator/AvatarPreview.module.css";

function AvatarPreview({

    translation = null,

    sequence = [],

    statistics = null,

    runtime = null,

    loading = false,

    onClear = () => {},

}) {

    const generated = sequence.length > 0;
    const animationName =
        generated
            ? `${sequence.length} Sign${sequence.length > 1 ? "s" : ""}`
            : "None";
    const status =
        loading
            ? "Generating..."
            : generated
                ? "Ready"
                : "Waiting";

    return (

        <div className={styles.card}>

            {/* ================= HEADER ================= */}

            <div className={styles.header}>

                <div className={styles.headerLeft}>

                    <div className={styles.iconBox}>

                        <Hand size={28}/>

                    </div>

                    <div>

                        <h2>

                            Sign Output

                        </h2>

                        <p>

                            View sign language animation

                        </p>

                    </div>

                </div>

                <div className={styles.statusBadge}>

                    <Circle
                        size={8}
                        fill="currentColor"
                    />

                    {status}

                </div>

            </div>

            {/* ================= PREVIEW ================= */}

            <div className={styles.previewContainer}>

                {

                    generated

                    ?

                    <div className={styles.avatarPlaceholder}>

                        {/* Future Avatar / Video / Lottie */}

                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <CanvasScene />
                        </div>

                    </div>

                    :

                    <div className={styles.emptyState}>

                        <Sparkles size={70}/>

                        <h3>

                            No Animation Generated

                        </h3>

                        <p>

                            Enter some text and press
                            <strong> Generate Sign Animation </strong>
                            to preview the translation.

                        </p>

                    </div>

                }

            </div>

            {/* ================= DETAILS ================= */}

            <div className={styles.infoSection}>

                <div className={styles.infoRow}>

                    <span>Status</span>

                    <strong>{status}</strong>

                </div>

                <div className={styles.infoRow}>

                    <span>Animations</span>

                    <strong>{sequence.length}</strong>

                </div>

                <div className={styles.infoRow}>

                    <span>Recognized Words</span>

                    <strong>

                        {statistics?.recognized_words ?? 0}

                    </strong>

                </div>

                <div className={styles.infoRow}>

                    <span>Unknown Words</span>

                    <strong>

                        {statistics?.unknown_words ?? 0}

                    </strong>

                </div>

                <div className={styles.infoRow}>

                    <span>Runtime</span>

                    <strong>

                        {runtime?.runtime_version ?? "--"}

                    </strong>

                </div>

            </div>

            {/* ================= CONTROLS ================= */}

            <div className={styles.actions}>

                <button>

                    <RotateCcw size={18}/>

                    Replay

                </button>

                <button>

                    <Pause size={18}/>

                    Pause

                </button>

                <button>

                    <Download size={18}/>

                    Download

                </button>

                <button
                    className={styles.clearButton}
                    onClick={onClear}
                    disabled={!generated}
                >

                    <Trash2 size={18}/>

                    Clear

                </button>

            </div>

        </div>

    );

}

export default AvatarPreview;