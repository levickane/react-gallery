import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios';
import apiKey from '../config'
import PhotoList from './PhotoList';
import SearchForm from './SearchForm'

class Page extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            loading: true
        };

    }

    componentDidMount() {
        this.performSearch('Levi\'s')
    }
    componentDidUpdate(previousProps) {
        const { location } = this.props
        if (location.pathname !== '/' && previousProps.location.pathname === location.pathname) {
            return
        }
        const searchName = location.pathname.replace('/search/', '')
        if (searchName !== '/') {
            this.performSearch(searchName)
        }
    }

    performSearch = (query) => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo.map((p) => {
                        return {
                            id: p.id,
                            url: `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg
`
                        }
                    }),
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    handleSearch = (query) => {
        this.props.history.push(`/search/${query}`)
    }

    render() {

        return (
            <div>
                <SearchForm onSearch={this.handleSearch} />
                <nav className="main-nav">
                    <ul>
                        <li><NavLink to="/search/cats">Cats</NavLink></li>
                        <li><NavLink to="/search/dogs">Dog</NavLink></li>
                        <li><NavLink to="/search/computers">Computers</NavLink></li>
                    </ul>
                </nav>
                <div>
                    {
                        (this.state.loading)
                            ? <h1>Loading...</h1>
                            : <PhotoList photos={this.state.photos} />
                    }
                </div>
            </div>
        )
    }
}
export default withRouter(Page)