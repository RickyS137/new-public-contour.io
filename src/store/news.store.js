const { create } = require("zustand");

const useNewsStore = create((set) => ({
    news: [],
    setNews: (news) => set({ news }),
    currentNew: {},
    setCurrentNew: (newItem) => set({ currentNew: newItem }),
}));

export default useNewsStore;