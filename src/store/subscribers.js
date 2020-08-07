import store from '@/store';
import axios from 'axios';

store.subscribe((mutation) => {
  console.log('MUTATION', mutation);
  console.log(axios.defaults.headers);
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        axios.defaults.headers.common.Authorization = `Bearer ${mutation.payload}`;
        localStorage.setItem('token', mutation.payload);
      } else {
        axios.defaults.headers.common.Authorization = '';
        localStorage.removeItem('token');
      }
      break;
    default:
      console.log('default');
  }
});
