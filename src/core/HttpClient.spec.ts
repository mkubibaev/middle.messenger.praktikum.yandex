import { expect } from 'chai';
import HttpClient from './HttpClient';

global.XMLHttpRequest = require('xhr2');

const http = new HttpClient('https://jsonplaceholder.typicode.com/posts');
type Post = {
  id?: number;
  title: string;
  body: string,
  userId: number,
};
const testPost: Post = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

describe('HttpClient', () => {
  it('Check GET request', async () => {
    const response = await http.get<Post>('/1');
    expect(response.data.id).to.eq(1);
  });

  it('Check POST request', async () => {
    const response = await http.post<Post>('', {
      data: testPost,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    expect(response.data.hasOwnProperty('id')).to.eq(true);
  });

  it('Check PUT request', async () => {
    const post = { ...testPost, id: 1, title: 'newTitle' };
    const updatedPost = await http.put<Post>('/1', {
      data: post,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    expect(updatedPost.data.title).to.eq('newTitle');
  });

  it('Check DELETE request', async () => {
    const response = await http.delete('/1');
    expect(response.status).to.eq(200);
  });
});
