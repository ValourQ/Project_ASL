import React, { useState, useRef } from "react";
import {
  FiStar,
  FiCopy,
  FiTag,
  FiFileText,
  FiEdit2,
  FiShare2,
  FiTrash2,
  FiPlay,
  FiMessageSquare,
  FiX,
} from "react-icons/fi";

import styles from "../../styles/saved/SavedDetails.module.css";

const SavedDetails = ({
  selected,
  setSelected,
  toggleFavorite,
  handleCopy,
  handleShare,
  handleDelete,
}) => {
  const [showNoteMenu, setShowNoteMenu] = useState(false);
  const [noteFocused, setNoteFocused] = useState(false);
  const noteRef = useRef(null);

  const [note, setNote] = useState(selected?.notes || "");

  if (!selected) {
    return (
      <div className={styles.emptyState}>
        <h3>Select a Saved Translation</h3>
        <p>Choose an item from the list.</p>
      </div>
    );
  }

  const handleSaveNote = () => {
    setSelected({
      ...selected,
      notes: note,
    });

    setShowNoteMenu(false);
  };

  const handleDeleteNote = () => {
    setNote("");

    setSelected({
      ...selected,
      notes: "",
    });

    setShowNoteMenu(false);
  };

  const handlePlay = () => {
    const text =
      selected.preview ||
      selected.transcript ||
      selected.title;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const handleEditTag = () => {
    const newTags = prompt(
      "Enter tags (comma separated)",
      (selected.tags || []).join(", ")
    );

    if (newTags === null) return;

    setSelected({
      ...selected,
      tags: newTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    });
  };

  return (
    <div className={styles.container}>
  {/* Preview */}

  {/* Preview */}
<div className={styles.previewCard}>
  {selected.image ? (
    <img
      src={selected.image}
      alt={selected.title}
      className={styles.previewImage}
    />
  ) : (
    <div className={styles.previewImage}></div>
  )}

  <div className={styles.info}>
    {/* Star & Close */}
    <div className={styles.header}>
      <div className={styles.headerButtons}>
        <button
          className={styles.star}
          onClick={() => toggleFavorite(selected.id)}
        >
          <FiStar />
        </button>

        <button
          className={styles.close}
          onClick={() => setSelected(null)}
        >
          <FiX />
        </button>
      </div>
    </div>

    {/* Content */}
    <div className={styles.contentInfo}>
      <h2>{selected.title}</h2>

      <span className={styles.badge}>
        {selected.type}
      </span>

      <div className={styles.meta}>
        <span>Saved on</span>
        <strong>{selected.date}</strong>
      </div>

      <div className={styles.meta}>
        <span>Source</span>
        <strong>{selected.source}</strong>
      </div>
    </div>
  </div>
</div>


  {/* Transcript */}

  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <div>
        <FiMessageSquare />
        <span>Transcript</span>
      </div>

      <FiCopy
        className={styles.icon}
        onClick={() => handleCopy(selected.transcript)}
      />
    </div>

    <textarea
      className={styles.box}
      value={selected.transcript || ""}
      onChange={(e) =>
        setSelected({
          ...selected,
          transcript: e.target.value,
        })
      }
      placeholder="Enter transcript..."
    />
  </div>
        {/* Tags */}

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <FiTag />
            <span>Tags</span>
          </div>

          <FiEdit2
            className={styles.icon}
            onClick={handleEditTag}
          />
        </div>

        <div className={styles.tags}>
          {(selected.tags || []).map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Notes */}

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <FiFileText />
            <span>Notes</span>
          </div>

          <div className={styles.noteActions}>
            <FiEdit2
              className={styles.icon}
              onClick={() => {
                setShowNoteMenu(!showNoteMenu);
                setNoteFocused(true);

                setTimeout(() => {
                  noteRef.current?.focus();
                }, 0);
              }}
            />

            {showNoteMenu && (
              <div className={styles.noteMenu}>
                <button onClick={handleSaveNote}>
                  Save
                </button>

                <button
                  className={styles.deleteOption}
                  onClick={handleDeleteNote}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <textarea
          ref={noteRef}
          className={`${styles.notes} ${
            noteFocused ? styles.activeNote : ""
          }`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => setNoteFocused(false)}
          placeholder="Add a note..."
        />
      </div>
            {/* Action Buttons */}

      <div className={styles.actions}>
        <button
          className={styles.play}
          onClick={handlePlay}
        >
          <FiPlay />
          <span>Play Again</span>
        </button>

        <button
          className={styles.share}
          onClick={() => handleShare(selected)}
        >
          <FiShare2 />
          <span>Share</span>
        </button>

        <button
          className={styles.delete}
          onClick={() => handleDelete(selected.id)}
        >
          <FiTrash2 />
          <span>Delete</span>
        </button>
      </div>
    </div>
);
};


export default SavedDetails;
