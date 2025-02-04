// src/pages/Profile.js
import React from 'react';
import { Container } from 'react-bootstrap';
import useUserStore from '../store/User-store';

const Profile = () => {
  const { user } = useUserStore();
  
  return (
    <Container>
      <h2>Profile</h2>
      {user ? <p>Username : {user.username} <br />
        Email : {user.email} <br />
      

      </p>  : <p>Please login to view your profile.</p>}
    </Container>
  );
};

export default Profile;
