import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient from '../lib/axios';
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Added filled heart icon
import { FaRegComment } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";
import useUserStore from '../store/User-store'; // Zustand store for user
import usePostStore from '../store/Post-store';
import { useTranslation } from 'react-i18next';

const Posts = () => {
  const { user } = useUserStore();
  const { comment, setComment } = usePostStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const { t, i18n } = useTranslation(); // Initialize translation hook

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosClient.get('/social-media/posts');
        setPosts(response.data.data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(t('errorFetchingPosts')); // Localized error message
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [t]);

  const handleCommentSubmit = async (postId) => {
    if (!comment.trim()) {
      alert(t('commentRequired')); // Localized alert message
      return;
    }

    if (!user) { // Check if user is logged in
      alert(t('loginToComment')); // Localized alert message
      return;
    }

    try {
      const response = await axiosClient.post(`/social-media/comments/post/${postId}`,
        { content: comment }
      );
      if (response.data.success) {
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
      alert(t('loginToLike')); // Localized alert message
      return;
    }

    try {
      const response = await axiosClient.post(`/social-media/like/post/${postId}`);
      if (response.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: response.data.data.likes, liked: !post.liked } // Toggle 'liked' status
              : post
          )
        );
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  if (loading) return <p className="loading">{t('loadingPosts')}</p>; // Localized loading message
  if (error) return <p className="text-danger">{error}</p>; // Localized error message

  // Determine if the current language is Urdu
  const isUrdu = i18n.language === 'ur';

  return (
    <Container className={isUrdu ? 'rtl' : ''}>
      <h2>{t("posts")}</h2>
      <div className="post_container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="mb-3 post_card borderd">
              {post.images.length > 0 ? (
                <img
                  src={post.images[0]?.url || 'placeholder-image-url.jpg'}
                  alt={t('postImage')} // Localized alt text for image
                  className="card_image"
                />
              ) : (
                t('noImage') // Localized message for no image
              )}
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
                <Card.Text>{post.tags}</Card.Text>
                <hr />
                <div className="card_button">
                  {/* Like Button */}
                  <span onClick={() => handleLike(post._id)}>
                    {post.isLiked ? (
                      <FaHeart color="red" /> // Filled heart icon for liked posts
                    ) : (
                      <FaRegHeart /> // Regular heart icon for unliked posts
                    )}
                    <span className='likes_Qty'>{post.likes}</span>
                  </span>

                  <span><FaRegComment onClick={() => setEditingPostId(post.id)} /> <span className='likes_Qty'>{post.comments}</span></span>
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
                          placeholder='writeComment'

                        />
                      </Form.Group>
                      <Button variant="success" type="submit" className="mt-2">
                       submitComment
                      </Button>
                    </Form>
                  )}
                </div>

              </Card.Body>
            </Card>
          ))
        ) : (
          <p>{t('noPosts')}</p> // Localized message for no posts
        )}
      </div>
    </Container>
  );
};

export default Posts;
