import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient from '../lib/axios';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";
import useUserStore from '../store/User-store'; // Zustand store for user
import usePostStore from '../store/Post-store';

const Posts = () => {

  const { user } = useUserStore();
  const { comment, setComment } = usePostStore()
  const [posts, setPosts,] = useState([]);
  console.log('posts ', posts)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState({});

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

  const handleCommentSubmit = async (postId) => {
    if (!comment.trim()) {
      alert("Comment content is required.");
      return;
    }

    if (!user) { // Check if user is logged in
      alert("Please login or sign up first to comment.");
      return;
    }

    try {
      const response = await axiosClient.post(`/social-media/comments/post/${postId}`,
        { content: comment }
      );
      if (response.data.success) {
        // Update posts with the new comments
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: response.data.data.comments } : post
          )
        );
        setComment(''); // Clear comment field after successful submission
        setEditingPostId(null); // Hide input field after submission
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleLike = async (postId) => {
    if (!user) { // Check if user is logged in
      alert("Please login or sign up first to like.");
      return;
    }

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
            <Card key={post.id} className="mb-3 post_card borderd">
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
                <Card.Text>{post.content}</Card.Text>
                <hr />
                <div className="card_button">

                  {/* Like Button */}
                  {/* <Button variant="primary"  className="me-2"> */}
                 <span> <FaRegHeart onClick={() => handleLike(post._id)} /><span className='likes_Qty'>{post.likes}</span></span>
                  {/* </Button> */}


                  {/* <Button variant="primary" onClick={() => setEditingPostId(post.id)} className="me-2"> */}
                  <span><FaRegComment onClick={() => setEditingPostId(post.id)} /> <span className='likes_Qty'>{post.comments}</span></span>
                  {/* </Button> */}
                  <span><Link to={`/posts/${post._id}`} >
                    <MdReadMore />
                  </Link></span> 

                  {/* Render Input Field if Editing this Post */}
                  {editingPostId === post.id && (
                    <Form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post._id); }}>
                      <Form.Group controlId="comment">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write your comment here"
                        />
                      </Form.Group>
                      <Button variant="success" type="submit" className="mt-2">
                        Submit Comment
                      </Button>
                    </Form>
                  )}
                </div>

              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </Container >
  );
};

export default Posts;