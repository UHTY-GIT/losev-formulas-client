<template>
  <div class="page_title">
    <p>
      Категорії
    </p>
  </div>
  <div class="all-categories-block">
    <div class="dropdown-container">
      <div class="dropdown">
        <span>Сортування:</span>
        <div class="selected-item-name" @click="toggleDropdown('name')">
          <span>{{ sortDisplayNames[sortType] }}</span>
          <a :class="['arrow-icon', { 'open': dropdowns.name }]">
            <span class="left-bar"></span>
            <span class="right-bar"></span>
          </a>
        </div>
        <div class="dropdown-content" v-show="dropdowns.name">
          <a href="#" @click="sortPodcasts('default')">За замовчуванням</a>
          <a href="#" @click="sortPodcasts('title')">За назвою</a>
          <a href="#" @click="sortPodcasts('rating')">За популярністю</a>
        </div>
      </div>
      <div class="dropdown">
        <span>Фільтр:</span>
        <div class="selected-item-category" @click="toggleDropdown('filterPrice')">
          <span class="selected-item-filter">{{ selectedFilterPrice }}</span>
          <a :class="['arrow-icon', { 'open': dropdowns.filterPrice }]">
            <span class="left-bar"></span>
            <span class="right-bar"></span>
          </a>
        </div>
        <div class="dropdown-content dropdown-filter" v-show="dropdowns.filterPrice">
          <a href="#" @click="filterByPriceType('all')">Всі подкасти</a>
          <a href="#" @click="filterByPriceType('free')">Безкоштовні</a>
          <a href="#" @click="filterByPriceType('paid')">Платні</a>
        </div>
      </div>

    </div>
    <div class="categories-list-block">
      <span @click="filterPodcasts('all')">Всі подкасти</span>
      <span v-for="category in allcategories" :key="category.id" @click="filterPodcasts(category.name)">{{ category.name }}</span>
    </div>

  </div>
  <div
      class="podcast-block-with-categories"
      v-for="category in allcategories"
      :key="category.id"
  >
    <div class="block-podcasts">
      <div class="title-category">
        <p>
          <span>{{ category.name }}</span>
        </p>
      </div>
      <div class="block-of-podcasts-by-category">
        <div class="block_content_podcast">
          <div
              v-for="podcast in filteredPodcasts(category.name)"
              :key="podcast.id"
              :class="['podcast', `id_${podcast.id}`]"
              :style="{ backgroundImage: `url(${podcast.image_url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
              v-show="podcast.isVisible"
          >
            <div class="positions_in_block">
              <div class="upper_tittle">
                <div class="context">
                  <button class="play-button" aria-label="Play podcast">
                    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                      <path class="play-path" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                    </svg>
                  </button>
                  <div class="info_podcast">
                  <span class="title_podcast">
                    {{ truncateTitle(podcast.title) }}
                  </span>
                    <span class="author_podcast">
                    {{ podcast.author }}
                  </span>
                  </div>
                </div>
                <span class="time_podcast">
                  55:15
                </span>
              </div>
              <div class="under_title">
                <div class="rating_and_categories">
                  <div class="podcast-rating">{{ podcast.rating }}</div>
                  <span class="categories_podcast">{{ podcast.categories[0].name }}</span>
                </div>
                <button
                    :class="['heart-button', podcast.isFavorite ? 'active' : '']"
                    aria-label="favorite"
                    @click="handleHeartButtonClick(podcast, $event)"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService.js';
import M from 'materialize-css';

export default {
  name: "AllCategoriesPage",
  data() {
    return {
      podcasts: [],
      loading: false,
      dropdowns: {
        name: false,
        filterPrice: false
      },
      sortType: 'default',
      allcategories: [],
      selectedFilterPrice: 'Всі подкасти',
      sortDisplayNames: {
        'default': 'За замовчуванням',
        'title': 'За назвою',
        'rating': 'За популярністю'
      },
      initialPodcasts: [],
      selectedCategory: 'all'
    };
  },
  methods: {
    // Метод для анімації кнопки лайку на блоці постів
    async handleHeartButtonClick(podcast, event) {
      podcast.isFavorite = !podcast.isFavorite;
      console.log(podcast.isFavorite);

      event.target.classList.toggle('active');

      const token = localStorage.getItem('token');

      try {
        const response = await apiService.addAndRemoveToFavorite(token, podcast.id, `${podcast.isFavorite}`);

        if (response.data === true) {
          console.log('Операція успішна', response);
        } else if (
            response.error &&
            response.error.message &&
            response.error.message === "You need to login before continue"
        ) {
          M.toast({ html: `Ви не авторизовані` });
        } else {
          console.error('Отримана неочікувана відповідь з сервера:', response);
        }
      } catch (error) {
        console.error('Помилка при додаванні або видаленні з улюблених:', error);
      }
    },

    async toggleDropdown(type) {
      console.log("Toggle dropdown called with:", type);
      this.dropdowns[type] = !this.dropdowns[type];
    },
    // Сортування за рейтингом і назвою
    sortPodcasts(type) {
      this.sortType = type;
      if (type === 'title') {
        console.log("Сортування по тайтл ", type);
        this.podcasts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (type === 'rating') {
        console.log("Сортування по рейтингу ", type);
        this.podcasts.sort((a, b) => b.rating - a.rating);  // assuming higher rating is better
      } else if (type === 'default') {
        console.log("Сортування за замовчуванням");
        this.podcasts = JSON.parse(JSON.stringify(this.initialPodcasts));
        this.podcasts.forEach(p => p.isVisible = true);
      }
    },
    // Фільтр по цінам з категорій та імені категорії
    filterByPriceType(priceType) {
      this.selectedCategory = 'all'; // Скидаємо фільтр категорії при зміні типу
      if (priceType === 'all') {
        this.podcasts.forEach(p => p.isVisible = true);
        this.selectedFilterPrice = 'Всі подкасти';
      } else if (priceType === 'free' || priceType === 'paid') {
        this.podcasts.forEach(podcast => {
          if (podcast.categories[0].category_type === priceType) {
            podcast.isVisible = true;
          } else {
            podcast.isVisible = false;
          }
        });
        this.selectedFilterPrice = priceType === 'free' ? 'Безкоштовні' : 'Платні';
      }
    },

    // Фільтр по категоріям і цінам
    filterPodcasts(categoryName) {
      this.selectedCategory = categoryName; // Запам'ятовуємо обрану категорію
      this.applyFilters();
    },
    filteredPodcasts(categoryName) {
      return this.podcasts.filter(podcast => podcast.categories[0].name === categoryName && podcast.isVisible);
    },
    // Застосовуємо фільтри для категорій та цін
    applyFilters() {
      this.podcasts.forEach(podcast => {
        if ((this.selectedCategory === 'all' || podcast.categories[0].name === this.selectedCategory) &&
            (this.selectedFilterPrice === 'Всі подкасти' || podcast.categories[0].category_type === (this.selectedFilterPrice === 'Безкоштовні' ? 'free' : 'paid'))) {
          podcast.isVisible = true;
        } else {
          podcast.isVisible = false;
        }
      });
    },
    //Метод для обрізання довгих назв подкастів
    truncateTitle(title) {
      if (title.length > 14) {
        return title.substring(0, 14) + '...';
      }
      return title;
    }
  },
  async created() {
    this.loading = true;

    const token = localStorage.getItem('token');
    // Отримуємо улюблені подкасти
    const favoritePodcastsResponse = await apiService.getFavoritePodcasts(token);
    //console.log(favoritePodcastsResponse);
    const DatafavoritePodcasts = favoritePodcastsResponse.data ? favoritePodcastsResponse.data.map(podcast => podcast.id) : [];
    console.log(DatafavoritePodcasts);

    // отримання даних всіх подкастів
    const responseAllPodcast = await apiService.AllPodcastPage();
    // this.podcasts = responseAllPodcast.data.data;
    if(responseAllPodcast && responseAllPodcast.data && responseAllPodcast.data.data) {
      this.podcasts = responseAllPodcast.data.data.map(podcast => {
        return {
          ...podcast,
          isVisible: true,
          isFavorite: DatafavoritePodcasts.includes(podcast.id)
        };
      });

      console.log(this.podcasts);

      // Зберігаємо первісний список
      this.initialPodcasts = JSON.parse(JSON.stringify(responseAllPodcast.data.data));

      // Отримання даних всіх категорій
      const responseCategories = await apiService.allCategories();
      this.allcategories = responseCategories.data.data;

      console.log(this.allcategories);

      // Ініціалізація методу сортування
      this.sortPodcasts(this.sortType);
    }
  }
}
</script>