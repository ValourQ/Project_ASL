import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/translator/TranslatorToggle.module.css";

function TranslatorToggle({

    sourceMode,
    setSourceMode,
    animating,
    setAnimating

}) {

    const navigate = useNavigate();

    const handleSwap = () => {

        setAnimating(true);

        const nextMode =
            sourceMode === "sign"
                ? "text"
                : "sign";

        setTimeout(() => {

            setSourceMode(nextMode);

            navigate(`/translator/${nextMode}`);

            setAnimating(false);

        },250);

    };

    return (

        <div className={styles.toggleContainer}>

            {/* Sign → Text */}

            <button
                className={`${styles.modeButton} ${
                    sourceMode === "sign"
                        ? styles.active
                        : ""
                }`}
                onClick={() => {

                    if(sourceMode !== "sign"){

                        setSourceMode("sign");

                        navigate("/translator/sign");

                    }

                }}
            >
                Sign → Text
            </button>

            {/* Swap */}

            <button
                className={`${styles.switchButton} ${
                    animating
                        ? styles.rotate
                        : ""
                }`}
                onClick={handleSwap}
            >
                <ArrowLeftRight size={24}/>
            </button>

            {/* Text → Sign */}

            <button
                className={`${styles.modeButton} ${
                    sourceMode === "text"
                        ? styles.active
                        : ""
                }`}
                onClick={() => {

                    if(sourceMode !== "text"){

                        setSourceMode("text");

                        navigate("/translator/text");

                    }

                }}
            >
                Text → Sign
            </button>

        </div>

    );

}

export default TranslatorToggle;