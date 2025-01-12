import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {

    posts: []
  };


  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postAndPhotos = postsJson.map((post, index) => {
       return { ... post, cover: photosJson[index].url }
    });

    this.setState({ posts: postAndPhotos });
  }


  render() {
    const { posts, photos } = this.state;

    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <div className='post'>
              <img src={post.cover} alt={post.title}/>
              <div key={post.id} className='post-content'>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

}
export default App;