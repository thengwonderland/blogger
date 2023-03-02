import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import http from '../lib/http';
import formatDate from '../lib/formatDate';

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/api/posts/${postId}`);
      setPost(data.data.post);
    }
    fetchData();
  }, [postId]);

  const deletePost = async () => {
    await http.delete(`/api/posts/${postId}`);
    navigate('/');
  }
  
  
  return (
    <>
      <Container className="my-5 text-justified" style={{ maxWidth: '800px' }}>
        <h1>{post.title}</h1>
        <div className="text-secondary mb-4">{formatDate(post.createdAt)}</div>
        {post.tags?.map((tag) => <span>{tag} </span>)}
        <div className="h4 mt-5">{post.content}</div>
        <div className="text-secondary mb-5">- {post.author}</div>
        <div className="mb-5">
          <Link
            variant="primary"
            className=" btn btn-primary m-2"
            to={`/posts/${postId}/edit`}
          >
            Edit
          </Link>
          <Button variant="danger" onClick={deletePost}>Delete</Button>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>&#8592; Back to Home</Link>
      </Container>
    </>
  );
};

export default Post;