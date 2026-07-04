import { ArrowLeftRight } from "lucide-react";
import styles from "../../styles/translator/TranslatorToggle.module.css";

function TranslatorToggle({

    sourceMode,
    setSourceMode,
    animating,
    setAnimating

}) {

    const handleSwap = () => {

        setAnimating(true);

        setTimeout(() => {

            setSourceMode(prev =>
                prev === "sign" ? "text" : "sign"
            );

            setAnimating(false);

        }, 250);

    };

    return (

        <div className={styles.toggleContainer}>

            {/* Left Side */}

            <button
                className={`${styles.modeButton} ${
                    sourceMode === "sign" ? styles.active : ""
                }`}
            >
                Sign → Text
            </button>

            {/* Swap Button */}

            <button
                className={`${styles.switchButton} ${
                    animating ? styles.rotate : ""
                }`}
                onClick={handleSwap}
            >
                <ArrowLeftRight size={24}/>
            </button>

            {/* Right Side */}

            <button
                className={`${styles.modeButton} ${
                    sourceMode === "text" ? styles.active : ""
                }`}
            >
                Text → Sign
            </button>

        </div>

    );

}

export default TranslatorToggle;