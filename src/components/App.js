import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  baseUrl = `https://practiceapi.devmountain.com/api`

  componentDidMount() {
    axios.get(`${this.baseUrl}/posts`)
      .then(response => {
        // console.log(response)
        this.setState({
          posts: response.data
        })
      })
      .catch((error) => console.log(error))
  }

  updatePost( id, text ) {
    axios.put(`${this.baseUrl}/posts?id=${ id }`, { text })
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch((error) => console.log(error))
  }

  deletePost( id ) {
    axios.delete(`${this.baseUrl}/posts?id=${ id }`)
      .then( response => {
        this.setState({
          posts: response.data
        })
      })
      .catch((error) => console.log(error))
  }

  createPost( text ) {
    axios.post(`${this.baseUrl}/posts`, { text })
      .then( response => {
        this.setState({
          posts: response.data
        })
      })
      .catch((error) => console.log(error))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {this.state.posts.map( post => (
            <Post 
              id={ post.id } 
              updatePostFn={ this.updatePost } 
              text={post.text} 
              date={post.date} 
              key={ post.id } 
              deletePostFn={ this.deletePost } />
          ))}
          
        </section>
      </div>
    );
  }
}

export default App;
