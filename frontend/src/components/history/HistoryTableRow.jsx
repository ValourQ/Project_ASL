import React from "react";
import { Bookmark, MoreVertical } from "lucide-react";
import styles from "../../styles/history/HistoryTable.module.css";

const HistoryTableRow = ({
  item,
  isSelected,
  onSelect,
}) => {
  const getBadgeClass = () => {
    switch (item.type) {
      case "Sign → Text":
        return styles.signBadge;

      case "Text → Sign":
        return styles.textBadge;

      case "Practice":
        return styles.practiceBadge;

      case "Uploads":
        return styles.uploadBadge;

      default:
        return "";
    }
  };

  return (
    <tr
      className={isSelected ? styles.activeRow : ""}
      onClick={() => onSelect(item)}
    >
      {/* Content */}
      <td>
        <div className={styles.content}>
          <img
            src={item.thumbnail}
            alt={item.title}
            className={styles.thumbnail}
          />

          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      </td>

      {/* Type */}
      <td>
        <span className={`${styles.badge} ${getBadgeClass()}`}>
          {item.type}
        </span>
      </td>

      {/* Date */}
      <td>
        <div className={styles.date}>
          <span>{item.date}</span>
          <small>{item.time}</small>
        </div>
      </td>

      {/* Actions */}
      <td>
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="Save"
          >
            <Bookmark size={18} />
          </button>

          <button
            className={styles.iconButton}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="More"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default HistoryTableRow;