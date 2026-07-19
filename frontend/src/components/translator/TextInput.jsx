import {
    Sparkles,
    FileText,
    Clipboard,
    Type,
    Wand2,
    
} from "lucide-react";

import styles from "../../styles/translator/TextInput.module.css";

function TextInput({

    text,

    setText,

    onGenerate,

    error,

    loading

}) {

    const handlePaste = async () => {

        const clipboard = await navigator.clipboard.readText();

        setText(clipboard);

    };

    const handleUpload = (e) => {

        const file = e.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {

            setText(event.target.result);

        };

        reader.readAsText(file);

    };

    const wordCount = text.trim()

    ? text.trim().split(/\s+/).length

    : 0;

    return (

        <div className={styles.card}>

            {/* ================= HEADER ================= */}

            <div className={styles.header}>

                <div className={styles.headerLeft}>

                    <div className={styles.iconBox}>

                        <Sparkles size={28}/>

                    </div>

                    <div>

                        <h2>

                            Text Input

                        </h2>

                        <p>

                            Convert text into sign language

                        </p>

                    </div>

                </div>

            </div>

            {/* ================= TOOLS ================= */}

            <div className={styles.toolbar}>

                <input
                    id="uploadTxt"
                    type="file"
                    accept=".txt"
                    hidden
                    onChange={handleUpload}
                />

                <label
                    htmlFor="uploadTxt"
                    className={styles.toolButton}
                >

                    <FileText size={18} />

                    Upload TXT

                </label>

                <button
                    className={styles.toolButton}
                    onClick={handlePaste}
                >

                    <Clipboard size={18}/>

                    Paste

                </button>

            </div>

            {/* ================= INPUT ================= */}

            <textarea

               className={styles.textArea}
               value={text}
               placeholder="Type your message here..."
               onChange={(e) => {

                    setText(e.target.value);

                }}></textarea>
            {/* ================= INFO ================= */}

            <div className={styles.infoRow}>

               <span>
                    {text.length}
                    {" "}
                    {text.length === 1 ? "Character" : "Characters"}
                </span>

                <span>
                    {wordCount}
                    {" "}
                    {wordCount === 1 ? "Word" : "Words"}
                </span>
            </div>

            {/* ================= TIP ================= */}

            <div className={styles.tip}>

                <Type size={18}/>

                <span>

                    Short sentences generate more natural sign animations.

                </span>

            </div>

            {/* ================= BUTTON ================= */}

            <button

                className={styles.generateButton}

                onClick={onGenerate}

                disabled={loading}

            >
                <Wand2 size={20}/>
                {

                    loading

                        ? "Generating..."

                        : "Generate Sign Animation"

                }
            </button>
              
            {
                
                error &&
                <p className={styles.errorMessage}>
                    {error}
                </p>
            }

        </div>

    );

}

export default TextInput;