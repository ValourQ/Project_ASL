import React from "react";
import styles from "../../styles/saved/SavedCard.module.css";

import {
  Bookmark,
  Hand,
  MessageCircle,
  Star,
  Heart,
  MoreVertical,
  Calendar,
} from "lucide-react";

const SavedCard = ({
  item,
  selected,
  onClick,
  view = "grid",
}) => {

 const getIcon = () => {
  const type = item.type?.toLowerCase();

  if (type.includes("favorite") || type.includes("star")) {
    return <Star size={32} strokeWidth={2} />;
  }

  if (type.includes("sign") || type.includes("hand")) {
    return <Hand size={32} strokeWidth={2} />;
  }

  if (type.includes("text") || type.includes("chat")) {
    return <MessageCircle size={32} strokeWidth={2} />;
  }

  return <Bookmark size={32} strokeWidth={2} />;
};

  return (
    <div
      className={`${styles.card} ${
        selected ? styles.selected : ""
      } ${
        view === "list" ? styles.listCard : ""
      }`}
      onClick={onClick}
    >

      {/* Icon Area */}
      <div className={styles.imageContainer}>

        <div className={styles.iconBox}>
          {getIcon()}
        </div>


        <button
          className={styles.favoriteBtn}
          onClick={(e) => e.stopPropagation()}
        >
          <Heart
            size={18}
            fill={item.favorite ? "currentColor" : "none"}
          />
        </button>

      </div>



      {/* Content */}
      <div className={styles.content}>

        <div className={styles.header}>

          <h3>
            {item.title}
          </h3>


          <button
            className={styles.menuBtn}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical size={18} />
          </button>

        </div>



        <span className={styles.badge}>
          {item.type}
        </span>



        <p className={styles.description}>
          {item.description}
        </p>



        <div className={styles.footer}>

          <div className={styles.date}>
            <Calendar size={15} />
            <span>
              {item.date}
            </span>
          </div>

        </div>


      </div>


    </div>
  );
};


export default SavedCard;