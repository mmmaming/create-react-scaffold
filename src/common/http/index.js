import axios from 'axios';
var http = axios.create();

const requestInterceptor = () => {

}

const responseInterceptor = response => {
  const data = {
    success: response.statusText === 'OK',
    data: response.data
  };
  return data;
}

http.interceptors.response.use(responseInterceptor);

export default http;