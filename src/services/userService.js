import api from './api';

export const getUserList = (limit = 15, page = 1) => api.get(`/user?limit=${limit}&page=${page}`);
export const getUserById = (id) => api.get(`/user/${id}`);
export const createUser = (user) => api.post('/user/create', user);
export const updateUser = (id, user) => api.put(`/user/${id}`, user);
export const deleteUser = (id) => api.delete(`/user/${id}`);
