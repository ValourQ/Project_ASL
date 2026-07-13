import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "../../styles/history/HistoryPagination.module.css";

const HistoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - currentPage) <= 1
      ) {
        pages.push(
          <button
            key={i}
            className={`${styles.pageButton} ${
              currentPage === i ? styles.active : ""
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        pages.push(
          <span
            key={i}
            className={styles.dots}
          >
            ...
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          className={styles.iconButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        {renderPages()}

        <button
          className={styles.iconButton}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className={styles.info}>
        Showing {startItem} to {endItem} of {totalItems} items
      </div>
    </div>
  );
};

export default HistoryPagination;