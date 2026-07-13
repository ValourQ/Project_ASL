import React, { useState } from "react";

import AppLayout from "../components/layout/AppLayout";

import { FiSearch, FiFilter } from "react-icons/fi";

import SavedStats from "../components/saved/SavedStats";
import SavedFilters from "../components/saved/SavedFilters";
import SavedTable from "../components/saved/SavedTable";
import SavedDetails from "../components/saved/SavedDetails";

import styles from "../styles/saved/Saved.module.css";

const Saved = () => {

  const [selectedItem, setSelectedItem] = useState(null);

  const [activeFilter, setActiveFilter] = useState("All");

  const [sortOrder, setSortOrder] = useState("Newest First");

  const [showFilter, setShowFilter] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedTag, setSelectedTag] = useState("All");

  const [showTags, setShowTags] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const savedData = [

    {
      id: 1,
      title: "Hello",
      type: "Sign → Text",
      preview: "Hello!",
      transcript: "Hello!",
      date: "May 20, 2026",
      time: "10:26 AM",
      source: "Live Camera",
      favorite: true,
      tags: ["Greeting", "Common"],
      notes: ""
    },

    {
      id: 2,
      title: "Thank You",
      type: "Sign → Text",
      preview: "Thank You!",
      transcript: "Thank You!",
      date: "May 20, 2026",
      time: "10:24 AM",
      source: "Live Camera",
      favorite: false,
      tags: ["Polite"],
      notes: ""
    },

    {
      id: 3,
      title: "How are you?",
      type: "Text → Sign",
      preview: "How are you?",
      transcript: "How are you?",
      date: "May 20, 2026",
      time: "10:22 AM",
      source: "Translator",
      favorite: false,
      tags: ["Conversation"],
      notes: ""
    },

    {
      id: 4,
      title: "Good Morning",
      type: "Text → Sign",
      preview: "Good Morning",
      transcript: "Good Morning",
      date: "May 20, 2026",
      time: "10:20 AM",
      source: "Translator",
      favorite: true,
      tags: ["Greeting"],
      notes: ""
    },

    {
      id: 5,
      title: "Nice to meet you",
      type: "Text → Sign",
      preview: "Nice to meet you",
      transcript: "Nice to meet you",
      date: "May 19, 2026",
      time: "09:45 PM",
      source: "Translator",
      favorite: false,
      tags: ["Conversation"],
      notes: ""
    },

    {
      id: 6,
      title: "Yes",
      type: "Sign → Text",
      preview: "Yes",
      transcript: "Yes",
      date: "May 19, 2026",
      time: "09:30 PM",
      source: "Live Camera",
      favorite: false,
      tags: ["Common"],
      notes: ""
    }

    
  ];

  const [items, setItems] = useState(savedData);

  const allTags = [
    "All",
    ...new Set(items.flatMap(item => item.tags || []))
  ];
    const filteredData = items.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;

    if (activeFilter === "Favorites") {
      matchesFilter = item.favorite;
    } else if (activeFilter !== "All") {
      matchesFilter = item.type === activeFilter;
    }

    const matchesTag =
      selectedTag === "All" ||
      (item.tags || []).includes(selectedTag);

    return matchesSearch && matchesFilter && matchesTag;

  });

  const sortedData = [...filteredData].sort((a, b) => {
  const dateA = new Date(`${a.date}, ${a.time}`);
  const dateB = new Date(`${b.date}, ${b.time}`);

  switch (sortOrder) {
    case "Newest First":
      return dateB - dateA;

    case "Oldest First":
      return dateA - dateB;

    case "Recent":
      return dateB - dateA;

    default:
      return 0;
  }
});

  const handleDelete = (id) => {

    if (!window.confirm("Delete this translation?")) return;

    const updated = items.filter((item) => item.id !== id);

    setItems(updated);

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }

  };

  const toggleFavorite = (id) => {

    const updated = items.map((item) =>
      item.id === id
        ? { ...item, favorite: !item.favorite }
        : item
    );

    setItems(updated);

    if (selectedItem?.id === id) {
      setSelectedItem(updated.find((item) => item.id === id));
    }

  };

  const handleCopy = (text) => {

    navigator.clipboard.writeText(text);

    alert("Copied successfully.");

  };

  const handlePlay = (item) => {

    if (!item) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      item.transcript || item.preview
    );

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

  };

  const handleShare = (item) => {

    if (!item) return;

    const text =
      `${item.title}\n\n${item.transcript || item.preview}`;

    const whatsapp =
      `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(whatsapp, "_blank");

  };

 const handleAddTag = (item) => {
  const tag = prompt("Enter tag name");

  if (!tag) return;

  const updatedItems = items.map((data) =>
    data.id === item.id
      ? {
          ...data,
          tags: [...data.tags, tag],
        }
      : data
  );

  setItems(updatedItems);
};

    return (

    <AppLayout>

      <div className={styles.page}>

        <div className={styles.header}>

  <div>
    <h1>Saved Translations</h1>
    <p>All your saved sign and text translations in one place.</p>
  </div>

  <div className={styles.headerActions}>
    <div className={styles.searchWrapper}>
  <FiSearch className={styles.searchIcon} />

  <input
    type="text"
    className={styles.searchBox}
    placeholder="Search saved items..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

    <div className={styles.filterWrapper}>
      

  <button
  className={styles.filterBtn}
  onClick={() => setShowFilter(!showFilter)}
>
  <FiFilter className={styles.filterIcon} />
  <span>Filters</span>
</button>

  {showFilter && (

    <div className={styles.filterMenu}>

      <button
        onClick={()=>{
          setSortOrder("Newest First");
          setShowFilter(false);
        }}
      >
        Newest First
      </button>


      <button
        onClick={()=>{
          setSortOrder("Oldest First");
          setShowFilter(false);
        }}
      >
        Oldest First
      </button>


      <button
        onClick={()=>{
          setSortOrder("Recent");
          setShowFilter(false);
        }}
      >
        Recent
      </button>


      <button
        onClick={()=>{
          setShowTags(!showTags);
        }}
      >
        Search by Tag
      </button>


      {showTags && (

        <div className={styles.tagMenu}>

          {allTags.map((tag)=>(

            <button
              key={tag}
              onClick={()=>{
                setSelectedTag(tag);
                setShowTags(false);
                setShowFilter(false);
              }}
            >
              {tag}
            </button>

          ))}

        </div>

      )}

    </div>

  )}

</div>
</div>

</div>

        <SavedStats />

      

<div className={styles.content}>

  <div className={styles.left}>

    <SavedFilters
  activeFilter={activeFilter}
  setActiveFilter={setActiveFilter}

  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}

  showFilter={showFilter}
  setShowFilter={setShowFilter}

  showTags={showTags}
  setShowTags={setShowTags}

  allTags={allTags}
  setSelectedTag={setSelectedTag}

  setSortOrder={setSortOrder}
/>

  <SavedTable
  items={items}
  setItems={setItems}
  selectedItem={selectedItem}
  setSelectedItem={setSelectedItem}
/>
  </div>

  <div className={styles.right}>

    <SavedDetails
      selected={selectedItem}
      setSelected={setSelectedItem}
      toggleFavorite={toggleFavorite}
      handleCopy={handleCopy}
      handleShare={handleShare}
      handleDelete={handleDelete}
    />

  </div>

</div>

                <footer>
          SignSync © 2024 • Making communication accessible for everyone
        </footer>

      </div>

    </AppLayout>

  );

};

export default Saved;