import axios from './api';

export const getCategories = () => axios.get('/categories');
export const createCategory = (categoryData) => axios.post('/categories', categoryData);
