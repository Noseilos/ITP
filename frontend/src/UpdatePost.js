import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Nav from './components/Nav'
import axios from 'axios'
import Title from './components/Title'
const UpdatePost = () => {
    let {id} = useParams();
    const [posts, setPosts] = useState({});
    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
        userId: ''
    });
    let navigate = useNavigate();
    const {title, content, user} = state;
    
    const handleChange = name => event => {
        console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value});
    }
    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/posts/${id}`, {title, content, user, userId: posts.user_id}).then(response => {
            console.log(response);
            setState({...state, title: '', content: '', user: '', userId: ''});
            

            return navigate('/');

        }).catch(error=>{

            alert('Error creating posts')
            console.log(error.response.data.error)
          });
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/posts/${id}/edit`).then(response => {
            console.log(response);
            setPosts(response.data);
            const {title,content,slug,user} = response.data;
            setState({...state, title, content, slug, user:user.name, userId: user.id});
          })
            .catch(error => {
              alert('Error fetching posts')
              console.log(error)
            });
      }, [id]);
  return (
    <>
    <Nav/>
    <div className="container p-5">

        <Title title="Update Post"/>
        <br />
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" placeholder="Post title" required onChange={handleChange('title')} value={title}/>

            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <textarea type="text" className="form-control" placeholder="Write content" required onChange={handleChange('content')} value={content}/>
            </div>
            <div className="form-group">
                <label className="text-muted">User</label>
                <input type="text" className="form-control" placeholder="Your name" required onChange={handleChange('user')} value={user}/>
            </div>
            <div className="mt-3">
                <button className="btn btn-primary" >Update</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default UpdatePost