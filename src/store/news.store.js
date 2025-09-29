const { create } = require("zustand");

const useNewsStore = create((set) => ({
    news: [],
    setNews: (news) => set({ news }),
}));

export default useNewsStore;