
import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import AppLayout from "../components/layout/AppLayout";

import HistoryStats from "../components/history/HistoryStats";
import HistorySearch from "../components/history/HistorySearch";
import HistoryTabs from "../components/history/HistoryTabs";
import HistoryTable from "../components/history/HistoryTable";
import HistoryDetails from "../components/history/HistoryDetails";

import styles from "../styles/history/History.module.css";


function History() {

  const { theme } = useContext(ThemeContext);

  const [selectedHistory, setSelectedHistory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState("All");

  const [selectedDate, setSelectedDate] = useState("");

  const [sortOrder, setSortOrder] = useState("newest");


  return (

    <AppLayout>

      <div
        className={`${styles.pageContent} ${
          theme === "dark" ? styles.dark : ""
        }`}
      >

        {/* Header */}

        <div className={styles.header}>

  <div className={styles.headerLeft}>

    <h1>
      History
    </h1>

    <p>
      Browse all your previous Sign Text translations.
    </p>

  </div>


  <HistorySearch

    searchTerm={searchTerm}

    setSearchTerm={setSearchTerm}

    selectedDate={selectedDate}

    setSelectedDate={setSelectedDate}

    sortOrder={sortOrder}

    setSortOrder={setSortOrder}

  />

</div>


        {/* Statistics */}

        <HistoryStats />


        {/* Tabs */}

        <HistoryTabs

          activeTab={activeTab}

          setActiveTab={setActiveTab}

        />


        {/* Table + Details */}

        <div className={styles.historyLayout}>


          <div className={styles.tableSection}>


            <HistoryTable

              searchTerm={searchTerm}

              activeTab={activeTab}

              sortOrder={sortOrder}

              onSelect={setSelectedHistory}

            />


          </div>



          <div className={styles.detailsSection}>


            <HistoryDetails 
   selected={selectedHistory}
   setSelected={setSelectedHistory}
/>

          </div>


        </div>


      </div>


    </AppLayout>

  );

}


export default History;