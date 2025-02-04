// src/pages/PostDetails.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// import useUserStore from '../store/User-store';
import usePostStore from '../store/Post-store';
import axiosClient from '../lib/axios';
import { getPostComments } from '../services/post-servise';
import { useTranslation } from 'react-i18next';

const PostDetails = () => {
  const { id } = useParams();
  // const {user } = useUserStore()
  const {posts} = usePostStore()
  const { t } = useTranslation();

  useEffect(()=>{
    const fetchComments = ()=>{
        getPostComments(id).then((response) => {
         const comments =  response.data.data.comment
        console.log('comment', comments)
         
        });
    }
  })




  return (
    <Container >
      <h2>{t("postDetails")}</h2>
      <p>{t("This is the details for postID")}  {id} </p>
      {/* <p>This is the details for post ID : {posts.id} </p> */}
      <p> {t("Comments")} : {posts.content} </p>
    </Container>
  );
};

export default PostDetails;
 