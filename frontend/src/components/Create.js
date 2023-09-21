import React, { useState } from 'react';
import Nav from './Nav';
import Title from './Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const apiUrl = `${process.env.REACT_APP_API}/posts`;

    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
    });
    
    let navigate = useNavigate();
    const { title, content, user } = state;
    
    const handleChange = name => event => {
        console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });

    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post(apiUrl, { title, content, user })
          .then(response => {
            console.log(response);
            setState({ ...state, title: '', content: '', user: '' });
      
            return navigate('/');
      
          })
          .catch(error=>{
            alert('Error creating posts')
            console.log(error.response.data.error)
          });
      }
      
    return (
        <>
        <Nav/>
        <div className="container p-5">
          <Title title="Create a New Post" user="Jonas"/>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        required
                        onChange={handleChange('title')}
                        value={title}
                    />

                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Write something.."
                        required
                        onChange={handleChange('content')}
                        value={content} />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                        onChange={handleChange('user')}
                        value={user} />
                </div>
                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
        
        </>
    );
}

export default Create;
