import React from "react";
import {
  Copy,
  Volume2,
  Bookmark,
  Share2,
  Trash2,
} from "lucide-react";

import styles from "../../styles/history/HistoryActions.module.css";

const HistoryActions = ({
  selectedRow,
  onCopy,
  onSpeak,
  onSave,
  onShare,
  onDelete,
}) => {
  const handleCopy = () => {
    if (onCopy) return onCopy(selectedRow);

    if (selectedRow?.description) {
      navigator.clipboard.writeText(selectedRow.description);
    }
  };

  const handleSpeak = () => {
    if (onSpeak) return onSpeak(selectedRow);

    if (!selectedRow?.description) return;

    const speech = new SpeechSynthesisUtterance(
      selectedRow.description
    );

    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleCopy}
        disabled={!selectedRow}
      >
        <Copy size={18} />
        Copy Text
      </button>

      <button
        className={styles.button}
        onClick={handleSpeak}
        disabled={!selectedRow}
      >
        <Volume2 size={18} />
        Speak
      </button>

      <button
        className={styles.button}
        onClick={() => onSave?.(selectedRow)}
        disabled={!selectedRow}
      >
        <Bookmark size={18} />
        Save
      </button>

      <button
        className={styles.button}
        onClick={() => onShare?.(selectedRow)}
        disabled={!selectedRow}
      >
        <Share2 size={18} />
        Share
      </button>

      <button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={() => onDelete?.(selectedRow)}
        disabled={!selectedRow}
      >
        <Trash2 size={18} />
        Delete
      </button>
    </div>
  );
};

export default HistoryActions;