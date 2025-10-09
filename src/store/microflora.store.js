const { create } = require("zustand");

const useMicrofloraStore = create((set) => ({
    microflora: [],
    setMicroflora: (microflora) => set({ microflora }),
    currentFlora: {},
    setCurrentFlora: (newItem) => set({ currentFlora: newItem }),
}));

export default useMicrofloraStore;