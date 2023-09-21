import React from 'react'
import App from './App'
import Create from './components/Create';
import SinglePost from './components/SinglePost';
import UpdatePost from './UpdatePost';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const RoutedApp = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/posts/:id" element={<SinglePost/>}/>
            <Route path="/posts/edit/:id" element={<UpdatePost/>}/>
        </Routes>
    </Router>
  )
}

export default RoutedApp