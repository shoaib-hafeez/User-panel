// src/pages/PostDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const PostDetails = () => {
  const { id } = useParams();

  return (
    <Container>
      <h2>Post Details</h2>
      <p>This is the details for post ID: {id}</p>
    </Container>
  );
};

export default PostDetails;
 