import React from "react";
import styles from "../../styles/history/HistoryDetails.module.css";

import {
  FiCalendar,
  FiTarget,
  FiCopy,
  FiBookmark,
  FiShare2,
  FiVolume2,
  FiTrash2,
  FiCamera,
  FiStar,
  FiX,
} from "react-icons/fi";

const HistoryDetails = ({ selected, setSelected }) => {
  const handleCopy = () => {
    if (!selected) return;

    navigator.clipboard.writeText(selected.title || "");
    alert("Copied!");
  };

  const handleSave = () => {
    if (!selected) return;
    alert("Saved successfully!");
  };

  const handleShare = async () => {
    if (!selected) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: selected.title,
          text: "Check SignSync translation",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleSpeak = () => {
    if (!selected) return;

    const speech = new SpeechSynthesisUtterance(selected.title || "");
    window.speechSynthesis.speak(speech);
  };

  const handleDelete = () => {
    if (!selected) return;
    alert("Deleted");
  };

  if (!selected) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🖐️</div>

        <h3>Select a Translation</h3>

        <p>
          Click any translation from the history table to view its complete
          details.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.selectedContainer}>
      {/* Header */}

      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.dot}></span>
          <h2>Selected Translation</h2>
        </div>

        <div className={styles.headerIcons}>
          <FiStar />
          
          <button
  className={styles.closeButton}
  onClick={() => setSelected(null)}
>
  <FiX />
</button>

        </div>
      </div>

      {/* Top Section */}

      <div className={styles.topSection}>
        {/* Image */}

        <div className={styles.imageBox}>
          {selected.image ? (
            <img src={selected.image} alt={selected.title} />
          ) : (
            <div className={styles.placeholder}>
              <FiCamera size={42} />
              <p>Camera Preview</p>
              <span>Waiting for ML Detection...</span>
            </div>
          )}
        </div>

        {/* Right */}

        <div className={styles.rightSection}>
          <h1>{selected.title}</h1>

          <span className={styles.badge}>
            {selected.type}
          </span>

          <label>Translated Text</label>

          <div className={styles.inputBox}>
            <input
              type="text"
              value={selected.title}
              readOnly
            />

            <button
              type="button"
              className={styles.copyIcon}
              onClick={handleCopy}
            >
              <FiCopy />
            </button>
          </div>
        </div>
      </div>

      {/* Info Cards */}

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <FiCalendar />

          <div>
            <h4>{selected.date}</h4>
            <p>Date</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <FiCamera />

          <div>
            <h4>Live Camera</h4>
            <p>Source</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <FiTarget />

          <div>
            <h4>Good Match</h4>
            <p>{selected.confidence}</p>
          </div>
        </div>
      </div>

      {/* Details */}

      <div className={styles.details}>
  <h3>Details</h3>

  <div className={styles.detailRow}>
    <span>Confidence</span>
    <strong>High</strong>
  </div>

  <div className={styles.detailRow}>
    <span>Hands Detected</span>
    <strong>1</strong>
  </div>

  <div className={styles.detailRow}>
    <span>Processing Time</span>
    <strong>120 ms</strong>
  </div>

  <div className={styles.detailRow}>
    <span>Model Used</span>
    <strong>SignSync v2.0</strong>
  </div>
</div>

      {/* Action Buttons */}

      <div className={styles.actionGrid}>
        <button
          className={styles.actionButton}
          onClick={handleCopy}
        >
          <FiCopy />
          <span>Copy Text</span>
        </button>

        <button
          className={styles.actionButton}
          onClick={handleSave}
        >
          <FiBookmark />
          <span>Save</span>
        </button>

        <button
          className={styles.actionButton}
          onClick={handleShare}
        >
          <FiShare2 />
          <span>Share</span>
        </button>

        <button
          className={styles.actionButton}
          onClick={handleSpeak}
        >
          <FiVolume2 />
          <span>Speak</span>
        </button>

        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={handleDelete}
        >
          <FiTrash2 />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default HistoryDetails;