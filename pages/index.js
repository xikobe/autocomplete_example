import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const URL = 'https://api.github.com';

const myApi = axios.create({
    baseURL: URL,
    timeout: 10000,
    mode: 'no-cors',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
});

class Index extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: '',
            searchResults: [],
        };
    }

    handleOnChange = ({ target: { value } }) => {
        this.setState({
            inputValue: value,
        });

        this.searchValue(value);
    }

    searchValue = debounce((value) => {
        myApi.get(`${URL}/search/repositories`, {
            params: {
                q: value,
            },
        }).then(({ data }) => {
            this.setState({
                searchResults: data.items,
            });
        });
    }, 200);

    render() {
        const { inputValue, searchResults } = this.state;

        return (
            <div>
                <input value={ inputValue } onChange={ this.handleOnChange } />

                <ul>
                    {
                        searchResults.map(result => <li>{ result.name }</li>)
                    }
                </ul>

            </div>
        );
    }
}

export default Index;
