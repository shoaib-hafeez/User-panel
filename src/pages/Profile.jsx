// src/pages/Profile.js
import React from 'react';
import { Container } from 'react-bootstrap';
import useUserStore from '../store/User-store';

const Profile = () => {
  const { user } = useUserStore();
  console.log('user is ', user)
  return (
    <Container>
      <h2>Profile</h2>
      {user ? <p>Email: {user.username} <br />
        Username: {user.email} 

      </p>  : <p>Please login to view your profile.</p>}
    </Container>
  );
};

export default Profile;
