import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Container, Typography, Grid} from '@mui/material'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Nav from './Nav'
import axios from 'axios'
import moment from 'moment'

const SinglePost = () => {

    var params = useParams();
    var id = params.id;
    const apiUrl = `${process.env.REACT_APP_API}/posts`;

    const [posts, setPosts] = useState({});
    const [expanded, setExpanded] = useState(false);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        axios.get(`${apiUrl}/${id}`).then(response => {
            console.log(response);
            setPosts(response.data);
        })
        .catch(error => {
            alert('Error fetching posts')
            console.log(error)
        });
    }, [id]);

    return (
        <>
            <Nav/>
            <Grid container justifyContent="center">

                
                    <Card sx={{ maxWidth: 800 }}>
                    <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                        <MoreVertIcon />
                        </IconButton>
                    }
                    title={posts.title}
                    subheader={moment(posts.created_at).format("LL")}
                    />
                    <CardMedia
                    component="img"
                    height="400"
                    image="https://th.bing.com/th/id/R.bc71c1c1c50551a1d65e7b529ea29d08?rik=EU42gCFH4J%2bBZA&riu=http%3a%2f%2fwww.goodworklabs.com%2fwp-content%2fuploads%2f2016%2f10%2freactjs.png&ehk=qvQ5EVoUnJZ7k5L347zsU3f87YTckr1iQBzKdwXJd0w%3d&risl=&pid=ImgRaw&r=0"
                    alt="React js"
                    // sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                    />
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {posts.content}
                    </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                        <Typography>
                        {posts.slug}
                        </Typography>
                    </CardContent>
                    </Collapse>
                </Card>

            </Grid>
        </>
    )
}

export default SinglePost