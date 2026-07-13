import React from "react";
import {
  FiSearch,
  FiRefreshCw,
  FiFilter,
} from "react-icons/fi";

import styles from "../../styles/saved/SavedSearch.module.css";

const SavedSearch = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  onRefresh,
}) => {
  return (
    <div className={styles.searchContainer}>
      {/* Search */}
      <div className={styles.searchBox}>
        <FiSearch className={styles.icon} />

        <input
          type="text"
          placeholder="Search saved translations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className={styles.selectBox}>
        <FiFilter className={styles.icon} />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Sign → Text">Sign → Text</option>
          <option value="Text → Sign">Text → Sign</option>
          <option value="Favorites">Favorites</option>
        </select>
      </div>

      {/* Sort */}
      <div className={styles.selectBox}>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {/* Refresh */}
      <button
        className={styles.refreshBtn}
        onClick={onRefresh}
      >
        <FiRefreshCw />
      </button>
    </div>
  );
};

export default SavedSearch;