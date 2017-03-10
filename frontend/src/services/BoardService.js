import axios from 'axios';
import Qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

let count = 0;

export default class BoardService {
  constructor() {
    this.http = axios.create({
      baseURL: '/api',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }),
    });

    this.http.interceptors.request.use((c) => {
      if (count === 0) {
        NProgress.start();
      }
      count += 1;
      return c;
    });

    this.http.interceptors.response.use((c) => {
      count -= 1;
      if (count === 0) {
        NProgress.done();
      }
      return c;
    });
  }

  getBoardList() {
    return this.http.get('/board');
  }

  saveBoard(data) {
    return this.http.post('/board', data);
  }
}