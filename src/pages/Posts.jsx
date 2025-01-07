import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient from '../lib/axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const id = posts.id;
    console.log('id is ', id)
  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosClient.get('/social-media/posts');
        setPosts(response.data.data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle like functionality
  const handleLike = async (postId) => {
    try {
      const response = await axiosClient.post(`/social-media/like/post/${postId}`);
      if (response.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: response.data.data.likes } : post
          )
        );
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container>
      <h2>Posts</h2>
      <div className="post_container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="mb-3 post_card">
              {post.images.length > 0 ? (
                <img
                  src={post.images[0]?.url || 'placeholder-image-url.jpg'}
                  alt="Post"
                  className="card_image"
               
                />
              ) : (
                'No Image'
              )}
              <Card.Body>
                {/* <Card.Title>{post.title}</Card.Title> */}
                <Card.Text>{post.content}</Card.Text>

                {/* Like Button */}
                <Button variant="primary" onClick={() => handleLike(post.id)} className="me-2">
                  Like ({post.likes})
                </Button>

                {/* Read More Link */}
                <Link to={`/posts/${post.id}`} className="btn btn-secondary me-2">
                  Read More
                </Link>

               
                  
               
                
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </Container>
  );
};

export default Posts;
