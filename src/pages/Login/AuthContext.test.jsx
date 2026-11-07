import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { tokenStorage, refreshTokenStorage } from '../../lib/api';

const Status = () => {
  const {isLoggedIn, me}=useAuth();
  return <div data-testid="status">{isLoggedIn ? me?.email : 'signed-out'}</div>;
};
beforeEach(() => {
  localStorage.clear(); tokenStorage.set('synthetic'); refreshTokenStorage.set('synthetic-RT');
  localStorage.setItem('me',JSON.stringify({email:'test@example.com'}));
});
test.each(['fitapet:session-ended','storage'])('%s synchronizes an ended session with React state', (event) => {
  render(<AuthProvider><Status/></AuthProvider>);
  expect(screen.getByTestId('status').textContent).toBe('test@example.com');
  act(() => {tokenStorage.clear();refreshTokenStorage.clear();window.dispatchEvent(new Event(event));});
  expect(screen.getByTestId('status').textContent).toBe('signed-out');
  expect(localStorage.getItem('me')).toBeNull();
});
