import axios from 'axios';
import { api, tokenStorage, refreshTokenStorage, serverLogout, listPostPage } from './api';

const token = (sid, id) => `header.${btoa(JSON.stringify({sid, id}))}.signature`;
const oldAccess = token('session-a', 0);
const newAccess = token('session-a', 1);
const denied = (config) => Promise.reject({ config, response: {status:401}, message:'unauthorized' });
let post;
beforeEach(() => {
  localStorage.clear(); tokenStorage.set(oldAccess); refreshTokenStorage.set('refresh-0');
  post = jest.spyOn(axios, 'post');
  api.defaults.adapter = (config) => config._retry
    ? Promise.resolve({ config, status:200, data:{ok:true}, headers:{} }) : denied(config);
});
afterEach(() => { jest.restoreAllMocks(); delete navigator.locks; });

test('20 concurrent failures share one refresh and persist both tokens', async () => {
  post.mockResolvedValue({data:{data:{accessToken:newAccess, refreshToken:'refresh-1'}}});
  await Promise.all(Array.from({length:20}, () => api.get('/api/users/test')));
  expect(post).toHaveBeenCalledTimes(1);
  expect(post.mock.calls[0][1]).toEqual({refreshToken:'refresh-0'});
  expect(tokenStorage.get()).toBe(newAccess); expect(refreshTokenStorage.get()).toBe('refresh-1');
});
test('login errors do not refresh a different session', async () => {
  await expect(api.post('/api/users/login', {email:'wrong'})).rejects.toBeTruthy();
  expect(post).not.toHaveBeenCalled(); expect(refreshTokenStorage.get()).toBe('refresh-0');
});
test('lost response clears the session without replaying the consumed RT', async () => {
  const ended=jest.fn(); window.addEventListener('fitapet:session-ended',ended);
  post.mockRejectedValue(new Error('timeout'));
  await expect(api.get('/api/users/test')).rejects.toThrow('timeout');
  expect(post).toHaveBeenCalledTimes(1);
  expect(tokenStorage.get()).toBeNull(); expect(refreshTokenStorage.get()).toBeNull();
  expect(ended).toHaveBeenCalledTimes(1);window.removeEventListener('fitapet:session-ended',ended);
});
test('late refresh response cannot restore a logged-out session', async () => {
  let resolve;
  post.mockImplementation(() => new Promise((r) => { resolve=r; }));
  const pending=api.get('/api/users/test');
  while(!resolve) await Promise.resolve();
  tokenStorage.clear(); refreshTokenStorage.clear();
  resolve({data:{data:{accessToken:newAccess,refreshToken:'refresh-1'}}});
  await expect(pending).rejects.toThrow('Session changed');
  expect(tokenStorage.get()).toBeNull(); expect(refreshTokenStorage.get()).toBeNull();
});
test('a delayed 401 uses the already rotated access token without another refresh', async () => {
  api.defaults.adapter = (config) => {
    if(config._retry)return Promise.resolve({config,status:200,data:{},headers:{}});
    tokenStorage.set(newAccess);refreshTokenStorage.set('refresh-1');return denied(config);
  };
  await api.get('/api/users/test');expect(post).not.toHaveBeenCalled();
});
test('cross-tab lock rechecks storage before submitting a refresh', async () => {
  Object.defineProperty(navigator,'locks',{configurable:true,value:{request:jest.fn(async (name,perform) => {
    tokenStorage.set(newAccess);refreshTokenStorage.set('refresh-1');return perform();
  })}});
  await api.get('/api/users/test');expect(navigator.locks.request).toHaveBeenCalledTimes(1);
  expect(post).not.toHaveBeenCalled();
});
test('an old request is not retried under a newly logged-in account', async () => {
  api.defaults.adapter = (config) => {
    tokenStorage.set(token('session-b',0));refreshTokenStorage.set('other-account');return denied(config);
  };
  await expect(api.get('/api/users/test')).rejects.toBeTruthy();
  expect(post).not.toHaveBeenCalled();expect(refreshTokenStorage.get()).toBe('other-account');
});
test('logout captures the access token before local storage is cleared', async () => {
  let sent;
  api.defaults.adapter = (config) => { sent=config.headers.Authorization;return Promise.resolve({config,status:200,data:{},headers:{}}); };
  const pending=serverLogout();tokenStorage.clear();refreshTokenStorage.clear();await pending;
  expect(sent).toBe(`Bearer ${oldAccess}`);
});
test('cursor page maps bounded API items and forwards both cursor fields', async () => {
  let params;
  api.defaults.adapter = (config) => { params=config.params;return Promise.resolve({config,status:200,headers:{},data:{data:{
    items:[{postId:7,postTitle:'title',postCategory:'FREE'}],hasNext:true,nextDate:'2026-11-01T00:00:00',nextId:7
  }}}); };
  const page=await listPostPage({category:'FREE',cursorDate:'2026-11-02T00:00:00',cursorId:10});
  expect(params).toMatchObject({categoryType:'FREE',cursorId:10,cursorDate:'2026-11-02T00:00:00',size:20});
  expect(page.items[0].post_id).toBe(7);expect(page.nextId).toBe(7);expect(page.hasNext).toBe(true);
});

test('a cross-tab account change while waiting for the lock does not replay the old request', async () => {
  Object.defineProperty(navigator,'locks',{configurable:true,value:{request:jest.fn(async (name,perform) => {
    tokenStorage.set(token('session-b',0));refreshTokenStorage.set('other-account');return perform();
  })}});
  await expect(api.get('/api/users/test')).rejects.toThrow('Session changed');
  expect(post).not.toHaveBeenCalled();expect(refreshTokenStorage.get()).toBe('other-account');
});
