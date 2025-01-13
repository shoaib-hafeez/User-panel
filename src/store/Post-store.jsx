import { create } from 'zustand';

const usePostStore = create((set) => ({
  posts: [],
  comment:[],
  setComment: (comment) => set({comment}),
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
}));

export default usePostStore;
