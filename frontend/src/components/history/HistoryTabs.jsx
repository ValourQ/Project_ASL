import React from "react";
import styles from "../../styles/history/HistoryTabs.module.css";

import {
  FiGrid,
  FiRepeat,
  FiType,
  FiBookmark,
} from "react-icons/fi";

const HistoryTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 1,
      name: "All",
      icon: <FiGrid />,
    },
    {
      id: 2,
      name: "Sign → Text",
      icon: <FiRepeat />,
    },
    {
      id: 3,
      name: "Text → Sign",
      icon: <FiType />,
    },
    {
      id: 4,
      name: "Saved",
      icon: <FiBookmark />,
    },
    
  ];

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.name ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          <span className={styles.icon}>
            {tab.icon}
          </span>

          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default HistoryTabs;