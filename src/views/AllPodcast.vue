<template>
  <div class="page_title">
    <p>
      Всі подкасти
    </p>
  </div>
  <div class="all-podcast-block">
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

    <div class="block_content_podcast">
      <div
          v-for="podcast in podcasts"
          :key="podcast.id"
          :class="['podcast', `id_${podcast.id}`]"
          :style="{ backgroundImage: `url(${podcast.image_url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
          v-show="podcast.isVisible"
      >
        <div class="positions_in_block">
          <div class="upper_tittle">
            <div class="context">
              <button class="play-button" aria-label="Play podcast" @click="handlePlayButtonClick">
                <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path class="play-path" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                </svg>
              </button>
              <div class="info_podcast">
                  <span class="title_podcast">
                    {{ podcast.title }}
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
</template>

<script>
import apiService from '@/services/apiService.js';

export default {
  name: "AllPodcastPage",
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
      initialPodcasts: []
    };
  },
  methods: {
    // Метод для анімації кнопки лайку на блоці постів
    handleHeartButtonClick(podcast, event) {
      podcast.isFavorite = !podcast.isFavorite;
      console.log(podcast.isFavorite);
      event.target.classList.toggle('active');

      if (podcast.isFavorite) {
        // Додавання до улюблених
        const token = localStorage.getItem('token');
        apiService.addToFavorite(token, podcast.id)
            .then(response => {
              console.log('Успішно додано до улюблених:', response);
            })
            .catch(error => {
              console.error('Помилка при додаванні до улюблених:', error);
            });
      }
    },

    // Метод для анімації кнопки плей у блоці підкастів
    handlePlayButtonClick(event) {
      let podcastBlock = event.target.closest('.positions_in_block');
      podcastBlock.classList.toggle('active');

      let podcastElement = event.target.closest('.podcast');
      podcastElement.classList.toggle('active');

      const contextElement = podcastElement.querySelector('.context');
      contextElement.classList.toggle('reversed');

      const PlayElement = podcastElement.querySelector('.play-button');
      PlayElement.classList.toggle('expanded');

      let playPath = event.target.querySelector('.play-path');
      if (playPath) {
        if (podcastBlock.classList.contains('active')) {
          // Якщо відтворення, то змінюємо форму на "pause"
          playPath.setAttribute('d', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z');
        } else {
          // Якщо пауза, то змінюємо форму на "play"
          playPath.setAttribute('d', 'M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z');
        }
      }
    },

    // Метод що відкриває випадаючий список
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
    // Фільтр по цінам з категорій
    filterByPriceType(priceType) {
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
    }
  },
  async created() {
    this.loading = true;

    const token = localStorage.getItem('token');

    // Отримуємо улюблені подкасти
    const favoritePodcastsResponse = await apiService.getFavoritePodcasts(token);
    const DatafavoritePodcasts = favoritePodcastsResponse.data ? favoritePodcastsResponse.data.map(podcast => podcast.id) : [];
    console.log(DatafavoritePodcasts);

    // Отримуємо данні всіх подкастів
    const responseAllPodcast = await apiService.AllPodcastPage();
    //console.log(responseAllPodcast && responseAllPodcast.data && responseAllPodcast.data.data)

    if(responseAllPodcast && responseAllPodcast.data && responseAllPodcast.data.data) {
      this.podcasts = responseAllPodcast.data.data.map(podcast => {
        return {
          ...podcast,
          isVisible: true,
          isFavorite: DatafavoritePodcasts.includes(podcast.id)
        };
      });

      // Зберігаємо первісний список
      this.initialPodcasts = JSON.parse(JSON.stringify(this.podcasts));

      // Ініціалізація методу сортування
      this.sortPodcasts(this.sortType);
    }



    // // отримання даних всіх подкастів
    // const responseAllPodcast = await apiService.AllPodcastPage();
    // // this.podcasts = responseAllPodcast.data.data;
    // this.podcasts = responseAllPodcast.data.data.map(podcast => ({ ...podcast, isVisible: true }));
    //
    // console.log(this.podcasts);

    // Зберігаємо первісний список
    // this.initialPodcasts = JSON.parse(JSON.stringify(responseAllPodcast.data.data));
    //
    //
    // // Ініціалізація методу сортування
    // this.sortPodcasts(this.sortType);
  }
}
</script>