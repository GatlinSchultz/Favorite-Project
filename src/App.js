import React, { Component } from 'react';
import './App.css';

const urlString = "https://api.themoviedb.org/3/search/movie?api_key=0ecf9584908dba19a06191b6d71c95cf&query="

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchTerm: 'Tron',
      isLoading: false,
      error: null
    }
  }

  performSearch = (search) => {
    this.setState({isLoading: true})
    return fetch(urlString + (search || 'Tron'))
    .then(response => {
      this.setState({isLoading: false})
      return response.json()
    })
    .catch(error => {
      this.setState({error})
    })
  }

  componentDidMount(){
    this.performSearch(this.state.searchTerm)
    .then(data => {
      this.setState({'results': data.results})
      this.refs.searchTermInput.value = this.state.searchTerm
    });
  }

  handleChange = (event) => {
    let value = event.target.value
    this.performSearch(value)
    .then(data => {
      this.setState({'results': data.results})
    });
  }

  render() {


    let results = this.state.results || [];

    const isLoadingJSX = this.state.isLoading ? 
      <div>Loading...</div> :
      '';

    const moviesJSX = results.map(movie => {
      movie.poster_src = "https://image.tmdb.org/t/p/w185" + (movie.poster_path || "/cTF8lpXvAwT1SLH9kVFZZl0AO0D.jpg");
      return(
        <div key={movie.id} className="movieList">
        <img alt={movie.id} src={movie.poster_src}></img>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        </div>
      )
    });

    // const errorJSX = this.state.error ?
    // <div>Error occurred, please try again later...</div> :
    // '';

    return (
      <div className="App">
        <input
          id="inputField"
          ref="searchTermInput"
          placeholder="Enter movie name"
          onChange={this.handleChange}
        ></input>
        {isLoadingJSX}
        {moviesJSX}
      </div>
    );
  }
}

export default App;
