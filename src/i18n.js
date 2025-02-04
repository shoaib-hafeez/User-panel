import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome, {{name}}!",
      logout: "Logout",
      posts: "Posts",
      profile: "Profile",
      login: "Login",
      signup: "Signup",
      confirmLogout: "Confirm Logout",
      sureLogout: "Are you sure you want to logout?",
      cancel: "Cancel",
      selectLanguage: "Language",
      // ✅ Add Post Related Translations
      postTitle: "Post Title",
      postDescription: "Description",
      readMore: "Read More",
      myProfile: "My Profile",
      postId: "Post ID",
      postContent: "Post Content",
      postDetails: "Post Details",
    "This is the details for postID": "This is the details for post ID",
    Comments: "Comments",
    Comment: "Comment",
    "No comments available": "No comments available",
    loadingPosts: "Loading posts...",



    },
  },
  ur: {
    translation: {
      welcome: "خوش آمدید، {{name}}!",
      logout: "لاگ آؤٹ",
      posts: "پوسٹس",
      profile: "پروفائل",
      login: "لاگ ان",
      signup: "سائن اپ",
      confirmLogout: "لاگ آؤٹ کی تصدیق کریں",
      sureLogout: "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟",
      cancel: "منسوخ کریں",
      selectLanguage: "زبان ",
      postTitle: "پوسٹ کا عنوان",
      postDescription: "تفصیل",
      readMore: "مزید پڑھیں",
      myProfile: "میرا پروفائل",
      postDetails: "پوسٹ کی تفصیلات",
      "This is the details for postID": "یہ پوسٹ کی تفصیلات ہیں آئی ڈی :",
      Comments: "تبصرے",
      Comment: "تبصرہ",
      "No comments available": "کوئی تبصرے دستیاب نہیں ہیں",
      postId: "پوسٹ آئی ڈی",
      postContent: "پوسٹ کا مواد",
      loadingPosts: "پوسٹس لوڈ ہو رہی ہیں...",
      // ✅ Add Urdu Post Translations
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
