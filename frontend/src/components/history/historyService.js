const placeholderImage = "https://placehold.co/80x80?text=ASL";
const historyData = [
  {
    id: 1,
    image: helloImg,
    title: "Hello",
    type: "Sign → Text",
    confidence: 98,
    date: "12 Jan 2026",
    time: "10:20 AM",
    favorite: true,
    status: "Completed",
  },
  {
    id: 2,
    image: thanksImg,
    title: "Thank You",
    type: "Text → Sign",
    confidence: 96,
    date: "15 Jan 2026",
    time: "11:35 AM",
    favorite: false,
    status: "Completed",
  },
  {
    id: 3,
    image: morningImg,
    title: "Good Morning",
    type: "Sign → Text",
    confidence: 94,
    date: "18 Jan 2026",
    time: "09:15 AM",
    favorite: true,
    status: "Completed",
  },
  {
    id: 4,
    image: howImg,
    title: "How are you?",
    type: "Text → Sign",
    confidence: 99,
    date: "20 Jan 2026",
    time: "03:40 PM",
    favorite: false,
    status: "Completed",
  },
  {
    id: 5,
    image: yesImg,
    title: "Yes",
    type: "Sign → Text",
    confidence: 95,
    date: "22 Jan 2026",
    time: "12:05 PM",
    favorite: true,
    status: "Completed",
  },
  {
    id: 6,
    image: goodImg,
    title: "Good",
    type: "Text → Sign",
    confidence: 97,
    date: "25 Jan 2026",
    time: "08:40 AM",
    favorite: false,
    status: "Completed",
  },
  {
    id: 7,
    image: fineImg,
    title: "I'm Fine",
    type: "Sign → Text",
    confidence: 96,
    date: "28 Jan 2026",
    time: "05:30 PM",
    favorite: true,
    status: "Completed",
  },
  {
    id: 8,
    image: meetImg,
    title: "Nice To Meet You",
    type: "Text → Sign",
    confidence: 99,
    date: "30 Jan 2026",
    time: "02:15 PM",
    favorite: false,
    status: "Completed",
  },
];

/* ============================
   GET ALL HISTORY
============================ */

export const getHistory = () => {
  return Promise.resolve(historyData);
};

/* ============================
   GET BY ID
============================ */

export const getHistoryById = (id) => {
  return Promise.resolve(
    historyData.find((item) => item.id === id)
  );
};

/* ============================
   SEARCH
============================ */

export const searchHistory = (keyword) => {
  return Promise.resolve(
    historyData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

/* ============================
   FILTER BY TYPE
============================ */

export const filterHistory = (type) => {
  if (type === "All") {
    return Promise.resolve(historyData);
  }

  return Promise.resolve(
    historyData.filter((item) => item.type === type)
  );
};

/* ============================
   FAVORITES
============================ */

export const getFavorites = () => {
  return Promise.resolve(
    historyData.filter((item) => item.favorite)
  );
};

/* ============================
   DELETE
============================ */

export const deleteHistory = (id) => {
  return Promise.resolve({
    success: true,
    message: `History ${id} deleted successfully.`,
  });
};

/* ============================
   DOWNLOAD
============================ */

export const downloadHistory = (id) => {
  return Promise.resolve({
    success: true,
    message: `Downloading history ${id}...`,
  });
};

/* ============================
   SHARE
============================ */

export const shareHistory = (id) => {
  return Promise.resolve({
    success: true,
    message: `Sharing history ${id}...`,
  });
};

export default {
  getHistory,
  getHistoryById,
  searchHistory,
  filterHistory,
  getFavorites,
  deleteHistory,
  downloadHistory,
  shareHistory,
};