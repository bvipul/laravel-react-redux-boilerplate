const axios = require('axios');

let headers = {};

const token = localStorage.getItem('token');

if (token) {
    headers['Authorization'] = 'Bearer ' + token;
}

let csrf_token = document.head.querySelector('meta[name="csrf-token"]');

if (csrf_token) {
    headers['X-CSRF-TOKEN'] = csrf_token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}


let client = axios.create({ headers });

export default client;