import React from "react";
import {
  RotateCcw,
  CalendarDays,
  Flame,
  TrendingUp,
} from "lucide-react";

import styles from "../../styles/history/History.module.css";

function HistoryStats() {
  const stats = [
    {
      title: "Total Translations",
      value: "128",
      subtitle: "All Time",
      icon: <RotateCcw size={30} />,
      color: styles.purple,
    },
    {
      title: "This Week",
      value: "24",
      subtitle: "Translations",
      icon: <CalendarDays size={30} />,
      color: styles.green,
    },
    {
      title: "Longest Streak",
      value: "7",
      subtitle: "Days",
      icon: <Flame size={30} />,
      color: styles.orange,
    },
    {
      title: "Most Used Sign",
      value: "Hello",
      subtitle: "18 Times",
      icon: <TrendingUp size={30} />,
      color: styles.blue,
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((item, index) => (
        <div className={styles.statCard} key={index}>
          <div className={`${styles.statIcon} ${item.color}`}>
            {item.icon}
          </div>

          <div className={styles.statContent}>
            <div className={styles.statTitle}>{item.title}</div>
            <div className={styles.statValue}>{item.value}</div>
            <div className={styles.statSubTitle}>{item.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryStats;