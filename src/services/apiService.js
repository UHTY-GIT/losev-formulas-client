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
    AllPodcastPage: (token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.get(`${BASE_URL}/api/v1/podcasts`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час отримання всіх подкастів сталася помилка: ', error);
            });
    },

    // Функція для моїх подкастів користувача
    getUserPodcasts: (token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.get(`${BASE_URL}/api/v1/podcasts/user_podcasts`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час отримання подкастів користувача сталася помилка: ', error);
            });
    },


    // Функція для ТОПу подкастів всіх користувачів
    TopPodcastPage: (token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.get(`${BASE_URL}/api/v1/podcasts/top`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час отримання ТОПу подкастів сталася помилка: ', error);
            });
    },

    // Функція для Рекомендацій подкастів всіх користувачів
    RecomendationPodcastPage: (token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.get(`${BASE_URL}/api/v1/podcasts/recommendation`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час отримання ТОПу подкастів сталася помилка: ', error);
            });
    },

    // Функція для пошуку подкастів за назвою або автором
    searchPodcasts: (query, token) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.get(`${BASE_URL}/api/v1/podcasts?search=${query}`, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час отримання результатів пошуку подкастів сталася помилка: ', error);
            });
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
            headers: { 'authtoken': token }
        };
        return axios.post(`${BASE_URL}/api/v1/users/logout`, {}, config)
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

    // Функція для зміни імені користувача
    updateUserName: (token, name) => {
        const config = {
            headers: { 'authtoken': token },
        };
        const data = {
            name: name
        };
        return axios.put(`${BASE_URL}/api/v1/users/profile_update`, data, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час зміни імені сталася помилка: ', error);
            });
    },

    // Функція для рейтингування аудіо
    submitPodcastRating: (token, podcastId, rating) => {
        const config = {
            headers: { 'authtoken': token }, // Assuming you need an auth token
        };
        return axios.post(`${BASE_URL}/api/v1/ratings/set_rating`, { podcast_id: podcastId, rating_value: rating, }, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error submitting podcast rating:', error);
            });
    },

    // Функція для надсилання оплати
    submitPaymentPodcast: (token, podcastId, paymentMethod) => {
        const config = {
            headers: { 'authtoken': token },
        };
        return axios.post(`${BASE_URL}/api/v1/orders`, { podcast_id: podcastId, payment_method: paymentMethod }, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Під час відправки запиту на оплату сталася помилка: ', error);
            });
    },


    // Тут можна додати інші функції для різних API запитів
};

export default apiService;
