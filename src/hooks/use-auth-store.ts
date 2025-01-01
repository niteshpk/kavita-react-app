import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCredentials, updateUser, logout } from '../store/slices/auth-slice';
import { User } from '../types/auth';

export function useAuthStore() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const login = (token: string, userData: User) => {
    dispatch(setCredentials({ user: userData, token }));
    localStorage.setItem('token', token);
  };

  const updateUserData = (userData: User) => {
    dispatch(updateUser(userData));
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    login,
    logout: logoutUser,
    updateUser: updateUserData,
  };
}