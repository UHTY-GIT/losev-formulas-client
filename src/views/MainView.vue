<!--scr/views/MainView.vue-->
<template>
    <div class="page_title">
      <p>
        Головна
      </p>
    </div>
    <div class="recommendations">
      <TopPodcasts :podcasts="topresponse" :loading="loading"/>
      <Recommendations :podcasts="recpodcasts" :loading="loading"/>
    </div>
</template>

<script>
import TopPodcasts from '@/components/Main/MainTopPodcasts.vue';
import Recommendations from '@/components/Main/MainRecommendations.vue';
import apiService from '@/services/apiService.js';

export default {
  name: "MainPage",
  components: {
    TopPodcasts,
    Recommendations
  },
  data() {
    return {
      topresponse: [],
      recpodcasts: [],
      loading: false,
    };
  },
  methods: {
    // Метод що витягує з метаданих аудіо час, скільки йде подкаст "topresponse"
    async fetchPodcastDurationsTOP() {
      const promises = this.topresponse.map(podcast => {
        return new Promise((resolve, reject) => {
          let audio = new Audio(podcast.audio_url);
          audio.addEventListener('loadedmetadata', () => {
            podcast.duration = this.formatTime(audio.duration);
            resolve();
          });
          audio.addEventListener('error', reject);
        });
      });
      await Promise.all(promises);
    },
    // Метод що витягує з метаданих аудіо час, скільки йде подкаст "recpodcasts"
    async fetchPodcastDurationsRECOM() {
      const promises = this.recpodcasts.map(podcast => {
        return new Promise((resolve, reject) => {
          let audio = new Audio(podcast.audio_url);
          audio.addEventListener('loadedmetadata', () => {
            podcast.duration = this.formatTime(audio.duration);
            resolve();
          });
          audio.addEventListener('error', reject);
        });
      });
      await Promise.all(promises);
    },
    formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds - minutes * 60);
      return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    },
    padZero(num) {
      return num < 10 ? `0${num}` : num;
    },
  },
  async created() {
    this.loading = true;

    // запит апі для улюблених подкастів подкастів
    const token = localStorage.getItem('token');
    // Отримуємо улюблені подкасти
    const favoritePodcastsResponse = await apiService.getFavoritePodcasts(token);
    //console.log(favoritePodcastsResponse);
    const DatafavoritePodcasts = favoritePodcastsResponse.data ? favoritePodcastsResponse.data.map(podcast => podcast.id) : [];
    console.log(DatafavoritePodcasts);

    // запит апі для топ подкастів
    const topresponse = await apiService.TopPodcastPage();
    console.log(topresponse.data.data);
    if(topresponse && topresponse.data && topresponse.data.data) {
      //console.log(topresponse.data.data);
      this.topresponse = topresponse.data.data.map(podcast => {
        return {
          ...podcast,
          isVisible: true,
          isFavorite: DatafavoritePodcasts.includes(podcast.id)
        };
      });
      await this.fetchPodcastDurationsTOP();
    }

    // запит апі для рекомендацій подкастів
    const Recresponse = await apiService.RecomendationPodcastPage();
    console.log(Recresponse.data.data)
    if(Recresponse && Recresponse.data && Recresponse.data.data) {
      //console.log(Recresponse.data.data);
      this.recpodcasts = Recresponse.data.data.map(podcast => {
        return {
          ...podcast,
          isVisible: true,
          isFavorite: DatafavoritePodcasts.includes(podcast.id)
        };
      });
      await this.fetchPodcastDurationsRECOM();
    }
    this.loading = false; // Помічаємо завантаження як завершене
  }
}
</script>