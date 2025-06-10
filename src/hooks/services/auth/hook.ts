import { useMutation } from '@tanstack/react-query';
import api from '../api';

interface AuthInterface {
  email: string;
  password: string;
}

export const useLogin = () => {
  const login = async (authData: AuthInterface) => {
    const request = api.post('auth/login', { ...authData });
    const response = await request;
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ['USER LOGIN'],
  });
  return mutation;
};
