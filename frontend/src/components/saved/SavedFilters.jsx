import React from "react";
import styles from "../../styles/saved/SavedFilters.module.css";


const SavedFilters = ({
  activeFilter,
  setActiveFilter,
}) => {

  const tabs = [
    "All",
    "Sign → Text",
    "Text → Sign",
    "Favorites",
  ];


  return (
    <div className={styles.filterArea}>

      <div className={styles.topBar}>

        <div className={styles.tabs}>

          {tabs.map((tab) => (

            <button
              key={tab}

              className={
                activeFilter === tab
                  ? styles.active
                  : ""
              }

              onClick={() => setActiveFilter(tab)}
            >

              {tab}

            </button>


          ))}

        </div>
        

      </div>

    </div>
  );
};


export default SavedFilters;