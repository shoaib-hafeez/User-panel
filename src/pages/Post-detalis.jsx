// src/pages/PostDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// import useUserStore from '../store/User-store';
import usePostStore from '../store/Post-store';

const PostDetails = () => {
  const { id } = useParams();
  // const {user } = useUserStore()
  const {comment} = usePostStore()


  return (
    <Container >
      <h2>Post Details</h2>
      <p>This is the details for post ID : {id} </p>
      <p>  Comments : {comment} </p>
    </Container>
  );
};

export default PostDetails;
 