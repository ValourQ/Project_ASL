import React, { useState } from "react";
import Calendar from "./Calendar";

import {
  FiSearch,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

import styles from "../../styles/history/HistorySearch.module.css";


const HistorySearch = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  sortOrder,
  setSortOrder,
}) => {
    const [showFilter, setShowFilter] = useState(false);

  return (

    <div className={styles.searchContainer}>


      {/* Left Side */}

      <div className={styles.leftSection}>


        {/* Search */}

        <div className={styles.searchBox}>

          <FiSearch className={styles.searchIcon} />

          <input

            type="text"

            placeholder="Search translations..."

            value={searchTerm}

            onChange={(e)=>setSearchTerm(e.target.value)}

          />

        </div>



        {/* Calendar */}

        <Calendar

          selectedDate={selectedDate}

          setSelectedDate={setSelectedDate}

        />



        {/* Filter */}

       {/* Filter */}

<div className={styles.filterWrapper}>

<button
  className={styles.filterButton}
  onClick={() => setShowFilter(!showFilter)}
>

  <FiFilter />

  Filter

  <FiChevronDown />

</button>



{showFilter && (

<div className={styles.filterMenu}>


<button
 onClick={()=>{
   setSortOrder("newest");
   setShowFilter(false);
 }}
>
 Newest First
</button>



<button
 onClick={()=>{
   setSortOrder("oldest");
   setShowFilter(false);
 }}
>
 Oldest First
</button>


</div>

)}

</div>



      </div>


    </div>

  );

};


export default HistorySearch;