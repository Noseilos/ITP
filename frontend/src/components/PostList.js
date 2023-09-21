import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Container, Typography, Link, Button } from '@mui/material';
import '../assets/css/custom.css';
import axios from 'axios';

export const PostList = ({post, fetchPosts}) => {
    
    const deletePost = id => {
        axios  
            .delete(`${process.env.REACT_APP_API}/posts/${id}`)
            .then(response => {
                console.log(response)
                fetchPosts()
            })
            .catch(error => alert('Error deleting post'));
    }

    const deleteConfirm = (id) => {
        let answer = window.confirm('Delete this post?')
        if (answer) {
            deletePost(id);
        }
    };

    const getGradientClass = () => {
        const classIndex = post.id % 3 + 1;
        return `gradient-${classIndex}`;
    };

    return (
        <>
        <Container maxWidth="lg" sx={{mb:'2rem'}}>

            <Link href={`/posts/${post.id}`} underline="hover">
                <Typography variant='h4' gutterBottom component="h5">
                    {post.title}
                </Typography>
            </Link>
            <Card sx={{ minWidth: 275 }} className={`${getGradientClass()} card-with-outline`}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {post.title}
                    </Typography>
                    <Typography variant="subtitle1">
                    {post.title}
                    </Typography>
                    <Typography variant="body2">
                    {post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">read More</Button>
                </CardActions>
            </Card>
            <Link href={`/posts/edit/${post.id}`}>
            <Button  variant="contained" color="primary">Edit</Button>
            </Link>
            <Button  variant="contained" color="error" onClick={() => deleteConfirm(post.id)}>Delete</Button>
        </Container >
        </>
    );
  
}