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

    // Функція для всіх подкастів користувача
    AllPodcastPage: () => {
        return axios.get(`${BASE_URL}/api/v1/podcasts`);
    },

    // Функція для ТОПу подкастів всіх користувачів
    TopPodcastPage: () => {
        return axios.get(`${BASE_URL}/api/v1/podcasts/top`);
    },

    // Функція для Рекомендацій подкастів всіх користувачів
    RecomendationPodcastPage: () => {
        return axios.get(`${BASE_URL}/api/v1/podcasts/recommendation`);
    },

    // Функція для пошуку подкастів за назвою або автором
    searchPodcasts: (query) => {
        return axios.get(`${BASE_URL}/api/v1/podcasts?search=${query}`);
    },

    // Функція для всіх категорій і їх типу
    allCategories: () => {
        return axios.get(`${BASE_URL}/api/v1/categories`);
    },

    //Функція для завантаження  даних профілю
    async getUserProfile(token) {
        const config = {
            headers: { 'authtoken': token },
        };
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/users/profile`, config);
            return response.data;
        } catch (error) {
            console.error('Під час отримання даних сталася помилка: ', error);
        }
    },

    // Функція для виходу користувача
    logoutUser: (token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.post(`${BASE_URL}/api/v1/users/logout`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час виходу сталася помилка: ', error);
            });
    },

    // Функція для отримання улюблених подкастів
    getFavoritePodcasts: (token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.get(`${BASE_URL}/api/v1/podcasts/favorite`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час отримання улюблених подкастів сталася помилка: ', error);
            });
    },

    // Функція для додавання і видалення подкасту з улюблених
    addAndRemoveToFavorite: (token, podcastId, isFavorite) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.post(`${BASE_URL}/api/v1/podcasts/add_to_favorite`, { podcast_id: podcastId, add_podcast: isFavorite }, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час додавання до улюблених сталася помилка: ', error);
            });
    },

    // Функція для зміни паролю користувача
    changeUserPassword: (token, oldPassword, newPassword) => {
        const config = {
            headers: { 'authtoken': token },
        };
        const data = {
            old_password: oldPassword,
            new_password: newPassword
        };
        return axios.post(`${BASE_URL}/api/v1/users/change_password`, data, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час зміни паролю сталася помилка: ', error);
            });
    },


    // Тут можна додати інші функції для різних API запитів
};

export default apiService;
