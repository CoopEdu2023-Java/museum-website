import axios from 'axios';

const http = axios.create({
  baseURL: 'http://43.140.225.61:1919',
});

export default http;