import axiosClient from '../lib/axios';

// export const fetchPosts = () =>

//     axiosClient.get('/social-media/posts');

export const fetchPostById = (id) =>

    axiosClient.get(`/social-media/posts/${id}`);

    // export const likePostAPI = (postId) =>{
    
    //     axiosClient.post(`/social-media/like/post/${postId}`)

    // }