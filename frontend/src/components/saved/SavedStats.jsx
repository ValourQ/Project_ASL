import {
  FiBookmark,
  FiRepeat,
  FiType,
  FiStar
} from "react-icons/fi";

import styles from "../../styles/saved/SavedStats.module.css";


const SavedStats = () => {

  const stats = [
    {
      title: "Total Saved",
      value: 24,
      icon: <FiBookmark />
    },
    {
      title: "Sign → Text",
      value: 12,
      icon: <FiRepeat />
    },
    {
      title: "Text → Sign",
      value: 8,
      icon: <FiType />
    },
    {
      title: "Favourites",
      value: 4,
      icon: <FiStar />
    }
  ];


  return (
    <div className={styles.statsContainer}>

      {stats.map((item,index)=>(
        <div className={styles.card} key={index}>

          <div className={styles.iconBox}>
            {item.icon}
          </div>

          <div>
            <p>{item.title}</p>
            <h2>{item.value}</h2>
          </div>

        </div>
      ))}

    </div>
  );
};

export default SavedStats;