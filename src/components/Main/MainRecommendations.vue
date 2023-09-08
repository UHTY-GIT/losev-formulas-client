<template>
  <div class="Categories_main">
    <p>Рекомендації</p>
    <a href="#">
      Показати всі
    </a>
  </div>
  <div v-if="loading">Завантаження...</div>
  <div v-else class="block_content_podcast">
    <div
        v-for="podcast in podcasts"
        :key="podcast.id"
        :class="['podcast', `id_${podcast.id}`]"
        :style="{ backgroundImage: `url(${podcast.image_url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
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
            <span class="categories_podcast">{{ podcast.categories && podcast.categories.length ? podcast.categories[0].name : 'Невідомо' }}</span>
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
</template>

<script>
import apiService from '@/services/apiService.js';
export default {
  props: {
    podcasts: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
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
    //Метод для обрізання довгих назв подкастів
    truncateTitle(title) {
      if (title.length > 14) {
        return title.substring(0, 14) + '...';
      }
      return title;
    }
  }
}
</script>