// services/apiService.js
import axios from 'axios';

const BASE_URL = 'http://dev-api.losev-formulas.com';

const apiService = {
    // Функція для входу користувача
    loginUser: (email, password) => {
        return axios.post(`${BASE_URL}/api/v1/users/sign_in`, {
            email: email,
            password: password
        });
    },

    // Функція для реєстрації користувача
    registerUser: (email, password, name) => {
        return axios.post(`${BASE_URL}/api/v1/users/sign_up`, {
            email: email,
            password: password,
            name: name
        });
    },

    // Функція для реєстрації користувача
    mainPage: () => {
        return axios.get(`${BASE_URL}/api/v1/podcasts`);
    },

    // Тут можна додати інші функції для різних API запитів
};

export default apiService;
