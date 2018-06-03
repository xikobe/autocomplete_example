import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Api from 'lib/api';

// Components
import ResultsList from 'components/results-list/ResultsList';

class Autocomplete extends Component {
    constructor() {
        super();

        this.state = {
            inputValue: '',
            searchResults: [],
            focusedID: -1,
        };

        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.searchValue = debounce(this.searchValue.bind(this), 200);
    }

    handleOnChange({ target: { value } }) {
        this.setState({
            inputValue: value,
        });

        this.searchValue(value);
    }

    handleOnKeyDown(event) {
        const { focusedID, searchResults } = this.state;

        if (event.key === 'ArrowDown' && !!searchResults.length && focusedID < searchResults.length) {
            event.preventDefault();
            this.setState({
                focusedID: focusedID + 1,
            });
        }

        if (focusedID > -1) {
            event.preventDefault();

            switch (event.key) {
            case 'ArrowUp':
                this.setState({
                    focusedID: focusedID - 1,
                });
                break;

            case 'Escape':
                this.setState({
                    focusedID: -1,
                });
                break;

            case 'Enter':
            case ' ': {
                const focusedItem = document.getElementById(`item_${focusedID}`);

                this.setState({
                    inputValue: focusedItem.getAttribute('value'),
                    focusedID: -1,
                });
                break;
            }
            default:
            }
        }
    }

    searchValue(value) {
        const { searchResults } = this.state;

        this.setState({
            isLoading: true,
        });

        Api.get('/search/repositories', {
            params: {
                q: value,
            },
        }).then(({ data }) => {
            this.setState({
                searchResults: data.items,
                focusedID: -1,
                isLoading: false,
            });
        }).catch((error) => {
            this.setState({
                error,
                isLoading: false,
                searchResults: !value ? [] : searchResults,
            });
        });
    }

    render() {
        const {
            inputValue,
            searchResults,
            focusedID,
            error,
            isLoading,
        } = this.state;

        return (
            <div>
                <input
                    value={ inputValue }
                    onChange={ this.handleOnChange }
                    onKeyDown={ this.handleOnKeyDown }
                />
                {
                    isLoading ?
                        <p>Fetching awesome repos with: { inputValue }</p> :
                        <ResultsList
                            list={ searchResults }
                            focusedID={ focusedID }
                            error={ error }
                        />
                }
            </div>
        );
    }
}

export default Autocomplete;
