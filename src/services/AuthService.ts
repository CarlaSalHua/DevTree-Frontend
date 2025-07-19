import devtreeAPI from '../config/axios';
import type { LoginUser, RegisterUser } from '../types/User';


export const registerUser = async (data: RegisterUser) => {
  return await devtreeAPI.post('/auth/register', data);
};

export const loginUser = async (data: LoginUser) => {
  return await devtreeAPI.post('/auth/login', data);
};