import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import styles from "../../styles/saved/SavedPagination.module.css";

const SavedPagination = ({
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

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.info}>
        Showing <strong>{startItem}</strong> –
        <strong> {endItem}</strong> of{" "}
        <strong>{totalItems}</strong> saved items
      </div>

      <div className={styles.pagination}>
        {/* Previous */}

        <button
          className={styles.navButton}
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
        >
          <FiChevronLeft />
        </button>

        {/* Page Numbers */}

        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page
                ? styles.active
                : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Next */}

        <button
          className={styles.navButton}
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SavedPagination;