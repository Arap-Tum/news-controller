import axios from './api';

export const getCategories = () => axios.get('/categories');