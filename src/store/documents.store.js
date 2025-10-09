const { create } = require("zustand");

const useDocumentsStore = create((set) => ({
    documents: [],
    setDocuments: (documents) => set({ documents }),
    currentDocument: {},
    setCurrentDocument: (newItem) => set({ currentDocument: newItem }),
}));

export default useDocumentsStore;