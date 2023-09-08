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
  async created() {
    this.loading = true;

    const topresponse = await apiService.TopPodcastPage();
    console.log(topresponse.data.data);
    if(topresponse && topresponse.data && topresponse.data.data) {
      //console.log(topresponse.data.data);
      this.topresponse = topresponse.data.data.map(podcast => {
        return {
          ...podcast
        };
      });
    }

    const Recresponse = await apiService.RecomendationPodcastPage();
    console.log(Recresponse.data.data)
    if(Recresponse && Recresponse.data && Recresponse.data.data) {
      //console.log(Recresponse.data.data);
      this.recpodcasts = Recresponse.data.data.map(podcast => {
        return {
          ...podcast
        };
      });
    }
    this.loading = false; // Помічаємо завантаження як завершене
  }
}
</script>