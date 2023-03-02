import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import http from '../lib/http';

const Edit = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/api/posts/${postId}`);
      reset(data.data.post);
    }
    fetchData();
  }, [postId, reset]);
  
  const onSubmit = async ({ title, author, tags, content }) => {
    const payload = {
      title,
      author,
      tags: tags.split(',').map((tag) => tag.trim()),
      content,
    };
    await http.put(`/api/posts/${postId}`, { data: payload });
    navigate(`/posts/${postId}`);
  };
  
  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <h1>Edit your Post</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" {...register('title')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Enter author" {...register('author')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control type="text" placeholder="Enter tags" {...register('tags')} />
          <Form.Text className="text-muted">
            Enter them separately them with ","
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your content..." {...register('content')} />
        </Form.Group>
        <Button variant="primary" type="submit">Save</Button>
      </Form>
      <Link to="/" style={{ textDecoration: 'none' }}>&#8592; Back to Home</Link>
    </Container>
  );
};

export default Edit;