import React from "react";
import styles from "../../styles/saved/SavedTabs.module.css";

const tabs = [
  "All",
  "Sign → Text",
  "Text → Sign",
  "Favorites",
];

const SavedTabs = ({
  activeTab,
  setActiveTab,
  counts = {},
}) => {
  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tabButton} ${
            activeTab === tab ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          <span>{tab}</span>

          <span className={styles.count}>
            {counts[tab] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SavedTabs;