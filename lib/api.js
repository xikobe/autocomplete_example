import axios from 'axios';

const URL = 'https://api.github.com';

const client = axios.create({
    baseURL: URL,
    timeout: 10000,
    mode: 'no-cors',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
});

export default client;
