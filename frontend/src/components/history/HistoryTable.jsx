import React, { useMemo, useState } from "react";
import styles from "../../styles/history/HistoryTable.module.css";

import {
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiBookmark,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { LuBookmarkCheck } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";

const placeholderImage = "https://placehold.co/80x80?text=ASL";

const HistoryTable = ({
  searchTerm,
  activeTab,
  sortOrder,
  onSelect,
}) => {

  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);

  const rowsPerPage = 6;

  const historyData = [
    {
      id: 1,
      image: null,
      title: "Hello",
      type: "Sign → Text",
      confidence: "98%",
      date: "12 Jan 2026",
      favorite: true,
      saved: false,
    },

    {
      id: 2,
      image: null,
      title: "Thank You",
      type: "Text → Sign",
      confidence: "96%",
      date: "15 Jan 2026",
      favorite: false,
      saved: false,
    },

    {
      id: 3,
      image: null,
      title: "Good Morning",
      type: "Sign → Text",
      confidence: "94%",
      date: "18 Jan 2026",
      favorite: true,
       saved: true,
    },

    {
      id: 4,
      image: null,
      title: "How are you?",
      type: "Text → Sign",
      confidence: "99%",
      date: "20 Jan 2026",
      favorite: false,
      saved: false,
    },

    {
      id: 5,
      image: null,
      title: "Yes",
      type: "Sign → Text",
      confidence: "95%",
      date: "22 Jan 2026",
      favorite: true,
      saved: false,
    },

    {
      id: 6,
      image: null,
      title: "Good",
      type: "Text → Sign",
      confidence: "97%",
      date: "25 Jan 2026",
      favorite: false,
       saved: true,
    },

    {
      id: 7,
      image: null,
      title: "I'm Fine",
      type: "Sign → Text",
      confidence: "96%",
      date: "28 Jan 2026",
      favorite: true,
      saved: false,
    },

    {
      id: 8,
      image: null,
      title: "Nice To Meet You",
      type: "Text → Sign",
      confidence: "99%",
      date: "30 Jan 2026",
      favorite: false,
      saved: true,
    },
  ];

  const filteredData = useMemo(() => {

    let data = historyData;

    if (searchTerm) {
      data = data.filter((item) =>
        item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab === "Sign → Text") {
  data = data.filter(
    (item) => item.type === "Sign → Text"
  );
}

else if (activeTab === "Text → Sign") {
  data = data.filter(
    (item) => item.type === "Text → Sign"
  );
}

else if (activeTab === "Saved") {
  data = data.filter(
    (item) => item.saved === true
  );
}




// Sorting

data = [...data].sort((a, b) => {

  const dateA = new Date(a.date);
  const dateB = new Date(b.date);


  if (sortOrder === "newest") {
    return dateB - dateA;
  }


  return dateA - dateB;

});


    return data;

  },  [searchTerm, activeTab, sortOrder]);

  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  );

  const currentRows = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>

      <div className={styles.tableWrapper}>

        <table className={styles.table}>

          <thead>

            <tr>

              <th>Translation</th>

              <th>Type</th>

              <th>Confidence</th>

              <th>Date</th>

              <th>Saved</th>

            </tr>

          </thead>

          <tbody>

            {currentRows.map((item) => (

              <tr
                key={item.id}
                onClick={() => onSelect(item)}
              >

                <td>

                  <div className={styles.translation}>

                    {item.image ? (
  <img
    src={item.image}
    alt={item.title}
  />
) : (
  <div className={styles.placeholder}></div>
)}
                    

                    <div>

                      <h4>{item.title}</h4>

                      <span>ID #{item.id}</span>

                    </div>

                  </div>

                </td>

                <td>

                  <span className={styles.type}>
                    {item.type}
                  </span>

                </td>

                <td>

                  <span className={styles.confidence}>
                    {item.confidence}
                  </span>

                </td>

                <td>{item.date}</td>

                <td>
  <div className={styles.actions}>

  <button
  className={`${styles.actionBtn} ${
    item.saved ? styles.savedBtn : ""
  }`}
>
  {item.saved ? (
    <LuBookmarkCheck />
  ) : (
    <FiBookmark />
  )}
</button>

  <div className={styles.menuWrapper}>

    <button
      className={styles.actionBtn}
      onClick={(e) => {
        e.stopPropagation();
        setMenuOpen(menuOpen === item.id ? null : item.id);
      }}
    >
      <FiMoreVertical />
    </button>

    {menuOpen === item.id && (
      <div className={styles.dropdown}>

        <button>
          <FiStar />
          Add to Favourites
        </button>

        <button
          onClick={() => onSelect(item)}
        >
          <FiEye />
          Visit
        </button>

        <button>
          <FiBookmark />
          Add to Saved
        </button>

        <button className={styles.deleteItem}>
          <FiTrash2 />
          Delete
        </button>

      </div>
    )}

  </div>

</div>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
     <div className={styles.showingText}>

  Showing{" "}
  {(page - 1) * rowsPerPage + 1}
  {" "}to{" "}
  {Math.min(page * rowsPerPage, filteredData.length)}
  {" "}of{" "}
  128 items

</div>
      {/* Pagination */}

      <div className={styles.pagination}>

        <button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <FiChevronLeft />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              className={`${styles.pageBtn} ${
                page === index + 1
                  ? styles.activePage
                  : ""
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          className={styles.pageBtn}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <FiChevronRight />
        </button>

      </div>

    </>

  );

};

export default HistoryTable;