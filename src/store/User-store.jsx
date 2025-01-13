import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,  //  User ko localStorage se load karein
  setUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));  //  User ko localStorage mein save karein
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem('user');  //  User data remove karein
    set({ user: null });
  }
}));

export default useUserStore;
 