import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav';
import Title from './components/Title';
import axios from 'axios';
import { PostList } from './components/PostList';
import Container from '@mui/material/Container'
import { Typography } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([]);

  const apiUrl = `${process.env.REACT_APP_API}/posts`;
  console.log('Fetch URL:', apiUrl);
  
  const fetchPosts = () => {

    axios.get(apiUrl).then(response => {

      console.log(response);
      setPosts(response.data);

    }).catch(error => {

        alert('Error fetching posts') 
        console.log(error)
    
    });

  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
    <Nav />
      <Container maxWidth="lg">
        <Title title="Maligayang Pagtanggap!" user="Admin" />
        {posts.length > 0 ? posts.map(post => (
          <PostList post={post} key={post.id} fetchPosts={fetchPosts}/>

        )) : <Container><Typography>No posts yet</Typography></Container>}

        <Footer />
      </Container>
    </>
  );
}

export default App;