import wretch from 'wretch';

import { BASE_URL } from '../constants';

export const loginApi = wretch(`${BASE_URL}/user_token`);

export const baseApi = wretch(BASE_URL);

export const usersApi = wretch(`${BASE_URL}/users`)

export const ordersApi = wretch(`${BASE_URL}/orders`)
