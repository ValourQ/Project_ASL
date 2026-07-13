// ==========================================
// Mock Saved Data
// ==========================================

const mockSavedItems = [
  {
    id: 1,
    title: "Hello",
    type: "Sign → Text",

    image: "https://via.placeholder.com/500x300?text=Hello",

    transcript: "Hello!",

    date: "May 20, 2024 • 10:26 AM",

    source: "Live Camera",

    favorite: true,

    tags: ["Greeting", "Common", "Friendly"],

    notes: "",

    confidence: 98,

    model: "MediaPipe Holistic",
  },

  {
    id: 2,
    title: "Thank You",
    type: "Sign → Text",

    image: "https://via.placeholder.com/500x300?text=Thank+You",

    transcript: "Thank You!",

    date: "May 18, 2024 • 02:40 PM",

    source: "Live Camera",

    favorite: false,

    tags: ["Polite", "Common"],

    notes: "",

    confidence: 97,

    model: "MediaPipe Holistic",
  },

  {
    id: 3,
    title: "Good Morning",
    type: "Text → Sign",

    image: "https://via.placeholder.com/500x300?text=Good+Morning",

    transcript: "Good Morning",

    date: "May 15, 2024 • 09:00 AM",

    source: "Translator",

    favorite: true,

    tags: ["Greeting"],

    notes: "",

    confidence: 99,

    model: "SignSync AI",
  },

  {
    id: 4,
    title: "How Are You?",
    type: "Practice",

    image: "https://via.placeholder.com/500x300?text=Practice",

    transcript: "How are you?",

    date: "May 12, 2024 • 06:15 PM",

    source: "Practice",

    favorite: false,

    tags: ["Practice"],

    notes: "",

    confidence: 95,

    model: "Practice AI",
  },
];

// ==========================================
// Get All Saved Items
// ==========================================

export const getSavedItems = async () => {
  return Promise.resolve(mockSavedItems);
};

// ==========================================
// Get Single Saved Item
// ==========================================

export const getSavedItem = async (id) => {
  return Promise.resolve(
    mockSavedItems.find((item) => item.id === id)
  );
};

// ==========================================
// Save Item
// ==========================================

export const saveItem = async (item) => {
  mockSavedItems.unshift({
    id: Date.now(),
    favorite: false,
    notes: "",
    ...item,
  });

  return Promise.resolve({
    success: true,
    message: "Saved Successfully",
  });
};

// ==========================================
// Remove Item
// ==========================================

export const removeItem = async (id) => {
  const index = mockSavedItems.findIndex((item) => item.id === id);

  if (index !== -1) {
    mockSavedItems.splice(index, 1);
  }

  return Promise.resolve({
    success: true,
    message: "Deleted Successfully",
  });
};

// ==========================================
// Search
// ==========================================

export const searchSaved = async (query) => {
  const q = query.toLowerCase();

  return Promise.resolve(
    mockSavedItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.transcript.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
    )
  );
};

// ==========================================
// Filter
// ==========================================

export const filterSaved = async (category) => {
  if (category === "All") return Promise.resolve(mockSavedItems);

  if (category === "Favorites") {
    return Promise.resolve(
      mockSavedItems.filter((item) => item.favorite)
    );
  }

  return Promise.resolve(
    mockSavedItems.filter((item) => item.type === category)
  );
};

// ==========================================
// Sort
// ==========================================

export const sortSaved = async (order) => {
  const data = [...mockSavedItems];

  switch (order) {
    case "Newest":
      data.sort((a, b) => b.id - a.id);
      break;

    case "Oldest":
      data.sort((a, b) => a.id - b.id);
      break;

    case "AZ":
      data.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "ZA":
      data.sort((a, b) => b.title.localeCompare(a.title));
      break;

    default:
      break;
  }

  return Promise.resolve(data);
};

export default {
  getSavedItems,
  getSavedItem,
  saveItem,
  removeItem,
  searchSaved,
  filterSaved,
  sortSaved,
};