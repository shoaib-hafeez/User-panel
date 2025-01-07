import { create } from 'zustand';

const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
}));

export default usePostStore;
