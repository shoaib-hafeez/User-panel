// src/services/post-service.js
import axiosClient from '../lib/axios';

// Fetch comments for a specific post
export const getPostComments = (postId) => {
  return axiosClient.get(`/social-media/comments/post/${postId}`);
};

// Add a new comment to a specific post
export const addCommentToPost = (postId, commentData) => {
  return axiosClient.post(`/social-media/comments/post/${postId}`, commentData);
};

// Fetch a specific post (if needed)
export const getPostById = (postId) => {
  return axiosClient.get(`/social-media/posts/${postId}`);
};

// Like a specific post
export const likePost = (postId) => {
  return axiosClient.post(`/social-media/like/post/${postId}`);
};
