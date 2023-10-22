<!--scr/views/SearchResult.vue-->
<template>
  <div class="page_title">
    <p>
      Результати пошуку
    </p>
  </div>
  <div class="all-podcast-block">
    <div v-if="searchResults && searchResults.length" class="block_content_podcast">
    <div
        v-for="result in processedSearchResults"
        :key="result.id"
        :class="['podcast', `id_${result.id}`, { 'podcast_blocked': result.blocked }]"
        :style="{ backgroundImage: `url(${result.image_url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
        v-show="result.isVisible"
    >
      <div v-if="result.blocked" class="blocked-overlay">
        <svg class="lock-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
        <button class="buy-button" @click="openPaymentPopup(result.id)">Купити</button>
      </div>
      <div class="positions_in_block">
        <div class="upper_tittle">
          <div class="context">
            <button class="play-button" :disabled="result.blocked" aria-label="Play podcast" @click="!result.blocked && handlePlayButtonClick(result, $event)">
              <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path class="play-path" :d="isPlaying && playingPodcast === result.id ? pausePath : playPath" />
              </svg>
            </button>
            <div class="info_podcast">
                  <span class="title_podcast">
                    {{ truncateTitle(result.title) }}
                  </span>
              <span class="author_podcast">
                    {{ result.author }}
                  </span>
            </div>
          </div>
          <span class="time_podcast">
                {{ result.duration }}
            </span>
        </div>
        <div class="under_title">
          <div class="rating_and_categories">
            <div class="podcast-rating">{{ result.rating }}</div>
            <span class="categories_podcast">{{ result.categories[0].name }}</span>
          </div>
          <!--            isPodcastFavorite(podcast) ?-->
          <!--            podcast.isFavorite ?-->
          <button
              :class="['heart-button', result.isFavorite ? 'active' : '']"
              aria-label="favorite"
              @click="handleHeartButtonClick(result)"
          ></button>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div v-if="showPaymentPopup" class="payment-popup">
    <div class="payment-popup-content">
      <p>Виберіть метод оплати</p>
      <div class="container_payment">
        <div class="ones_payment_metod">
          <label>
            <input type="radio" required value="portmone" v-model="selectedPaymentMethod" />
            <svg class="payment-logo" xmlns="http://www.w3.org/2000/svg" viewBox="119.5 203.6 221 28.8">
              <path fill="red" d="M119.5 207.7h4.5v2.6c1.3-1.9 3.4-3.1 5.7-3 2.1 0 4.1.9 5.4 2.5 1.5 1.6 2.2 3.9 2.2 6.8 0 3-.7 5.3-2.2 7-1.4 1.6-3.3 2.5-5.4 2.5-.9 0-1.9-.2-2.7-.6-1-.5-1.9-1.2-2.6-2v9h-4.9v-24.8zm4.8 8.6c0 2 .4 3.5 1.2 4.5.7.9 1.8 1.5 3 1.4 1.1 0 2.1-.5 2.8-1.3.7-.9 1.1-2.3 1.1-4.3 0-1.9-.4-3.3-1.2-4.2-.7-.9-1.7-1.4-2.9-1.4-1.1 0-2.2.5-2.9 1.3-.7.9-1.1 2.3-1.1 4zm14.9.1c0-1.6.4-3.2 1.2-4.6.8-1.4 1.9-2.6 3.4-3.4 1.5-.8 3.2-1.2 4.9-1.2 2.5-.1 5 .9 6.8 2.6 1.8 1.8 2.7 4.2 2.7 6.7.1 5.1-3.8 9.3-8.9 9.4h-.5c-1.7 0-3.3-.4-4.8-1.1-1.5-.7-2.7-1.8-3.5-3.3-1-1.5-1.4-3.3-1.3-5.1zm5 .2c0 1.8.4 3.1 1.3 4.1 1.6 1.8 4.3 1.9 6 .3l.3-.3c.9-.9 1.3-2.3 1.3-4.1 0-1.8-.4-3.1-1.3-4.1-1.6-1.8-4.3-1.9-6-.3l-.3.3c-.9 1-1.3 2.3-1.3 4.1zm38.4-8.9v3.8h-3.3v7.2c0 .9 0 1.7.1 2.6.1.2.2.5.4.6.2.2.5.2.8.2.7 0 1.3-.2 1.9-.5l.4 3.7c-1.2.5-2.5.7-3.8.7-.8 0-1.6-.1-2.4-.4-.6-.2-1.1-.6-1.5-1.1-.4-.6-.6-1.2-.7-1.8-.1-1.1-.2-2.2-.2-3.3v-7.8h-2.2v-3.8h2.2v-2.4l4.9-1.6v4.1h3.4v-.2zm2.6 0h4.5v2.5c1.6-1.9 3.5-2.9 5.7-2.9 1.1 0 2.1.2 3.1.7.9.5 1.6 1.2 2.1 2.1.7-.9 1.6-1.6 2.6-2.1.9-.5 2-.7 3-.7 1.2 0 2.4.2 3.4.8.9.5 1.7 1.4 2.1 2.4.3.8.5 2 .5 3.7v11.5h-4.9v-10.3c0-1.8-.2-2.9-.5-3.4-.5-.7-1.3-1.1-2.1-1-1.5 0-2.8 1-3.2 2.4-.3 1.2-.5 2.5-.4 3.7v8.6h-4.9v-9.8c0-1.7-.1-2.9-.3-3.4-.1-.5-.4-.9-.8-1.1-.4-.3-1-.4-1.5-.4-.7 0-1.4.2-2 .6-.6.4-1.1 1-1.3 1.7-.3 1.2-.4 2.5-.4 3.7v8.7H185l.2-18zm28.8 8.7c0-1.6.4-3.2 1.2-4.6.8-1.4 1.9-2.6 3.4-3.4 1.5-.8 3.2-1.2 4.9-1.2 2.8 0 5 .9 6.8 2.6 1.8 1.8 2.7 4.2 2.7 6.7.1 5.1-3.8 9.3-8.9 9.4h-.5c-1.7 0-3.3-.4-4.8-1.1-1.5-.7-2.7-1.8-3.5-3.3-.9-1.5-1.3-3.3-1.3-5.1zm5 .2c0 1.8.4 3.1 1.3 4.1 1.6 1.8 4.3 1.9 6 .3l.3-.3c.9-.9 1.3-2.3 1.3-4.1 0-1.8-.4-3.1-1.3-4.1-1.6-1.8-4.3-1.9-6-.3l-.3.3c-.9 1-1.3 2.3-1.3 4.1zm32.5 9h-4.8v-9.2c0-1.9-.1-3.2-.3-3.8-.2-.5-.5-1-1-1.3-.5-.3-1.1-.5-1.7-.5-.8 0-1.6.2-2.3.7-.6.4-1.1 1.1-1.4 1.8-.2.7-.4 2.1-.4 4.1v8.1h-4.9v-17.9h4.5v2.6c1.4-1.9 3.7-3.1 6-3 1 0 2 .2 2.9.6.8.3 1.5.8 2 1.4.5.6.8 1.3.9 2 .2 1.1.3 2.1.3 3.2l.2 11.2zm14.4-5.7l4.8.8c-.5 1.6-1.6 3-2.9 4-1.5 1-3.3 1.4-5 1.4-3.2 0-5.5-1-7.1-3.1-1.2-1.6-1.8-3.7-1.8-6.2 0-3 .8-5.3 2.4-7 1.5-1.7 3.7-2.6 6-2.5 2.7 0 4.9.9 6.4 2.6 1.6 1.8 2.3 4.5 2.3 8.1h-12.1c0 1.2.4 2.4 1.2 3.3.7.8 1.7 1.2 2.8 1.2.7 0 1.4-.2 1.9-.6.5-.6.9-1.3 1.1-2zm.3-4.8c0-1.4-.4-2.4-1.1-3.1-1.4-1.4-3.6-1.4-5-.1l-.1.1c-.7.9-1.1 2-1 3.1h7.2zm-97.3-3.2c-2.2 0-3.9 1.4-3.9 4.5v9.3h-4.9v-17.9h4.2v3.1h.1c.9-2.3 2.8-3.5 4.5-3.5.4 0 .7 0 1.1.1v4.5c-.3-.1-.7-.2-1.1-.1z"/><path fill="#A7A9AB" d="M273.9 225.4V222h3.5v3.5h-3.5zm18.4-6.5l3.1.4c-.2 1.9-1.1 3.6-2.6 4.8-1.4 1.2-3.2 1.8-5 1.7-2.5 0-4.5-.8-6-2.4-1.5-1.6-2.3-3.9-2.3-6.9 0-1.7.3-3.5 1-5.1.6-1.4 1.6-2.5 3-3.3 1.3-.7 2.8-1.1 4.4-1.1 1.7-.1 3.5.4 4.9 1.5 1.3 1 2.2 2.5 2.4 4.2l-3 .4c-.2-1-.7-2-1.5-2.7-.7-.6-1.7-.9-2.6-.9-1.4-.1-2.8.6-3.8 1.6-1 1.1-1.5 2.8-1.5 5.2 0 2.4.5 4.2 1.4 5.2.9 1.1 2.3 1.7 3.7 1.6 1.1 0 2.2-.4 3-1.1.7-.5 1.2-1.6 1.4-3.1zm4.5-2.4c0-3.3.9-5.8 2.8-7.4 1.6-1.3 3.7-2 5.7-2 2.3-.1 4.5.8 6.2 2.4 1.6 1.6 2.4 3.8 2.4 6.7 0 2.3-.4 4.1-1.1 5.4-.7 1.3-1.8 2.4-3.1 3.1-1.4.7-2.9 1.1-4.4 1.1-2.6 0-4.6-.8-6.2-2.4-1.5-1.6-2.3-3.9-2.3-6.9zm3.2 0c0 2.3.5 4 1.5 5.2 1.9 2.1 5.2 2.3 7.3.4l.4-.4c1-1.2 1.5-2.9 1.5-5.2 0-2.2-.5-3.9-1.5-5-1.9-2.1-5.2-2.3-7.3-.4-.1.1-.3.2-.4.4-1 1-1.5 2.7-1.5 5zm15.7 8.9v-17.9h2.8v2.5c.6-.9 1.4-1.6 2.3-2.1 1-.5 2.1-.8 3.2-.8 1.2 0 2.3.2 3.3.8.9.5 1.5 1.4 1.8 2.3 1.5-2.1 3.3-3.1 5.7-3.1 1.8 0 3.2.5 4.2 1.5s1.5 2.5 1.5 4.5v12.3h-3.1v-11.3c0-.9-.1-1.8-.3-2.6-.2-.5-.6-1-1.1-1.3-.6-.3-1.2-.5-1.9-.5-1.2 0-2.4.4-3.2 1.3-.8.8-1.3 2.2-1.3 4v10.4h-3.1v-11.6c0-1.4-.3-2.4-.8-3-.5-.7-1.3-1-2.5-1-.9 0-1.7.2-2.4.7-.7.5-1.3 1.1-1.6 2-.4 1.2-.6 2.5-.5 3.7v9.3l-3-.1z"/>
            </svg>
          </label>
        </div>
        <div class="button_payment">
          <button @click="makePayment">Оплатити</button>
          <button @click="closePaymentPopup">Скасувати</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiService from '@/services/apiService.js';
import M from 'materialize-css';

export default {
  name: 'SearchResult',
  data() {
    return {
      loading: false,
      initialPodcasts: [],
      playingPodcast: null,
      audio: new Audio(),
      playPath: 'M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z',
      pausePath: 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z',
      showPaymentPopup: false,
      selectedPaymentMethod: '',
      selectedPodcastId: null,
      isAuthenticated: false,
      favoritePodcasts: [],
    }
  },
  computed: {
    ...mapGetters(['searchResults']),
    processedSearchResults() {
      return this.searchResults.map(result => {
        return {
          ...result,
          isVisible: true,
          isFavorite: this.favoritePodcasts.includes(result.id)
        };
      });
    },
    isPlaying() {
      console.log('isPlaying value from store:', this.$store.getters.isPlaying);
      return this.$store.getters.isPlaying;
    },
    playingPodcastId() {
      return this.$store.getters.playingPodcast.id;
    },
    isPodcastFavorite() {
      return podcast => this.$store.getters.isFavorite(podcast.id);
    }
  },
  watch: {
    isPlaying(newVal) {
      if (newVal === true) {
        this.startAnimation();
      } else if (newVal === false) {
        this.stopAnimation();
      }
    }
  },
  methods: {
    //відкриття вспливаючого вікна при оплаті і перекидання на сторінку аутентифікації якщо токен не знайдено
    openPaymentPopup(podcastId) {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      this.selectedPodcastId = podcastId;
      this.showPaymentPopup = true;
    },
    //закриття вспливаючого вікна при оплаті
    closePaymentPopup() {
      this.selectedPodcastId = null;
      this.showPaymentPopup = false;
    },
    //метод для оплати подкастів і відправці
    async makePayment() {
      const token = localStorage.getItem('token');
      console.log("podcast.id= "+this.selectedPodcastId);
      const podcastId = this.selectedPodcastId;

      if (this.selectedPaymentMethod === 'portmone'){
        try {
          const response = await apiService.submitPaymentPodcast(token, podcastId, this.selectedPaymentMethod);

          if (response && response.data && response.data.order_link) {
            window.location.href = response.data.order_link;
          } else if (
              response.error &&
              response.error.message &&
              response.error.message === "You need to login before continue"
          ) {
            M.toast({ html: `Ви не авторизовані` });
          } else {
            console.error('Не вдалося отримати посилання для оплати');
          }
        } catch (error) {
          console.error('Помилка при оплаті:', error);
        }
      }
      this.closePaymentPopup();
    },
    //анімація при переході міжс торінками, шоб подкаст відображався шо він грає
    startAnimation() {
      console.log("start animation");
      //console.log("this.playingPodcast2= "+ this.playingPodcastId);
      const activePodcastElement = document.querySelector(`.podcast.id_${this.playingPodcastId}`);
      //console.log("activePodcastElement = " + activePodcastElement);
      if (activePodcastElement) {
        this.isPlaying = !this.isPlaying;
        this.playingPodcast = this.playingPodcastId;
        activePodcastElement.querySelector('.positions_in_block').classList.add('active');
        activePodcastElement.classList.add('active');
        activePodcastElement.querySelector('.context').classList.add('reversed');
        activePodcastElement.querySelector('.play-button').classList.add('expanded');
      }
    },
    //анімація при переході міжс торінками, шоб подкаст відображався шо він грає
    stopAnimation() {
      console.log("stop animation")
      const activePodcastElement = document.querySelector(`.podcast.id_${this.playingPodcast}`);
      if (activePodcastElement) {
        //this.isPlaying = !this.isPlaying;
        //this.playingPodcast = this.playingPodcastId;
        activePodcastElement.querySelector('.positions_in_block').classList.remove('active');
        activePodcastElement.classList.remove('active');
        activePodcastElement.querySelector('.context').classList.remove('reversed');
        activePodcastElement.querySelector('.play-button').classList.remove('expanded');
        this.playingPodcast = null;
      }
      console.log("stop this.playingPodcast= "+ this.playingPodcast)
    },
    // Метод для анімації кнопки лайку на блоці постів
    async handleHeartButtonClick(result) {
      //this.isPodcastFavorite(podcast.id);
      result.isFavorite = !result.isFavorite;
      console.log(result.isFavorite);
      //
      // event.target.classList.toggle('active');

      this.$store.dispatch('toggleFavorite', result.id);
      const token = localStorage.getItem('token');

      //console.log("this.$store.getters.isFavorite(podcast.id)= " + this.$store.getters.isFavorite(podcast.id))
      try {
        const response = await apiService.addAndRemoveToFavorite(token, result.id,  `${this.$store.getters.isFavorite(result.id)}`);

        if (response.data === true) {
          console.log('Операція успішна', response);

          this.$store.dispatch('updateIsFavoriteForPlayingPodcast', this.$store.getters.isFavorite(result.id));
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
    stopPlayingPodcast() {
      // Шукаємо поточний активний подкаст по ID
      const activePodcastElement = document.querySelector(`.podcast.id_${this.playingPodcast}`);
      if (activePodcastElement) {
        activePodcastElement.classList.remove('active');
        //const activePlayButton = activePodcastElement.querySelector('.play-button');
        // const activePlayPath = activePlayButton.querySelector('.play-path');
        // activePlayPath.setAttribute('d', 'M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z'); // вказуємо значення "play"
      }
      // потрібно видалити клас 'active' з .positions_in_block:
      const allActiveBlocks = document.querySelectorAll('.positions_in_block.active');
      allActiveBlocks.forEach(block => {
        block.classList.remove('active');
      });
      // потрібно видалити клас 'active' з .podcast:
      const podcastActiveBlocks = document.querySelectorAll('.podcast.active');
      podcastActiveBlocks.forEach(block => {
        block.classList.remove('active');
      });
      // потрібно видалити клас 'active' з .context:
      const contextActiveBlocks = document.querySelectorAll('.context');
      contextActiveBlocks.forEach(block => {
        block.classList.remove('reversed');
      });
      // потрібно видалити клас 'active' з .play-button:
      const playbuttonActiveBlocks = document.querySelectorAll('.play-button');
      playbuttonActiveBlocks.forEach(block => {
        block.classList.remove('expanded');
      });

      this.playingPodcast = null;
      // Видаляємо обробник події "ended" для того, щоб уникнути плутанини при повторному відтворенні
      this.audio.removeEventListener('ended', this.stopPlayingPodcast.bind(this));
    },
    // Метод для анімації кнопки плей у блоці підкастів
    handlePlayButtonClick(result, event) {
      if (this.playingPodcast === result.id) {
        // Якщо клікнули по вже відтворюваному подкасту, зупиняємо відтворення
        //this.audio.pause();
        this.$store.dispatch('togglePlayStatus');

        if (!this.isPlaying) {
          // If we stopped playback, run stopPlayingPodcast method
          this.stopPlayingPodcast();
        }
        this.playingPodcast = null;
      } else {
        // Якщо клікнули по іншому подкасту, змінюємо джерело аудіо та відтворюємо його
        if(this.playingPodcast !== null){
          this.stopPlayingPodcast();
        }
        //this.audio.src = podcast.audio_url;
        //this.playAudio(podcast.audio_url); //Передаємо посилання на аудіо
        //this.playPodcast(); // Використовуємо метод playPodcast
        this.playingPodcast = result.id;
        // Передаю через vuex дані про підкаст
        //console.log("this.$store.getters.isFavorite(podcast.id)= "+this.$store.getters.isFavorite(podcast.id))
        this.$store.dispatch('updatePlayingPodcast', {
          imageUrl: result.image_url,
          author: result.author,
          title: result.title,
          duration: result.duration,
          id: result.id,
          audio_url: result.audio_url,
          //isFavorite: this.$store.getters.isFavorite(podcast.id)
          isFavorite: result.isFavorite
        });
      }
      console.log("this.playingPodcast= "+ this.playingPodcast)
      console.log("this.isPlaying= "+ this.isPlaying)

      if (this.playingPodcast == result.id && this.isPlaying == true) {
        let podcastBlock = event.target.closest('.positions_in_block');
        podcastBlock.classList.toggle('active');

        let podcastElement = event.target.closest('.podcast');
        podcastElement.classList.toggle('active');

        const contextElement = podcastElement.querySelector('.context');
        contextElement.classList.toggle('reversed');

        const PlayElement = podcastElement.querySelector('.play-button');
        PlayElement.classList.toggle('expanded');
      }
    },
    // Метод що витягує з метаданих аудіо час, скільки йде подкаст
    async fetchPodcastDurations() {
      for (let result of this.searchResults) {
        let audio = new Audio(result.audio_url);
        audio.addEventListener('loadedmetadata', () => {
          result.duration = this.formatTime(audio.duration);
          console.log("result.duration= "+result.duration)
        });
      }
    },
    formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds - minutes * 60);
      return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    },
    padZero(num) {
      return num < 10 ? `0${num}` : num;
    },
    //Метод для обрізання довгих назв подкастів
    truncateTitle(title) {
      if (title.length > 14) {
        return title.substring(0, 14) + '...';
      }
      return title;
    },
    //анімаця подкастів при переході між стоірнками (шоб відображався активний чи нє)
    applyAnimationBasedOnState() {
      if (this.isPlaying) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    },
  },
  mounted() {
    //console.log("this.isPlaying1= "+ this.isPlaying)
    //console.log("this.playingPodcast1= "+ this.playingPodcast)
    this.applyAnimationBasedOnState();

    // дістаємо довжину аудіо для кожного подкасту
    this.$nextTick(() => {
      this.fetchPodcastDurations();
    });
  },
  async created() {
    this.loading = true;

    const token = localStorage.getItem('token');
    this.isAuthenticated = Boolean(token);
    // Отримуємо улюблені подкасти
    const favoritePodcastsResponse = await apiService.getFavoritePodcasts(token);
    //console.log(favoritePodcastsResponse);
    const DatafavoritePodcasts = favoritePodcastsResponse.data ? favoritePodcastsResponse.data.map(podcast => podcast.id) : [];
    console.log(DatafavoritePodcasts);
    // присвоюю занчення
    this.favoritePodcasts = DatafavoritePodcasts;


    // Отримуємо данні всіх подкастів
    //const responseAllPodcast = await apiService.AllPodcastPage();
    //console.log(responseAllPodcast && responseAllPodcast.data && responseAllPodcast.data.data)

    // if(responseAllPodcast && responseAllPodcast.data && responseAllPodcast.data.data) {
    //   this.searchResults = responseAllPodcast.data.data.map(podcast => {
    //     return {
    //       ...podcast,
    //       isVisible: true,
    //       isFavorite: DatafavoritePodcasts.includes(podcast.id)
    //     };
    //   });
    //
    //   // дістаємо довжину для кожного подкасту:
    //   await this.fetchPodcastDurations();
    // }
    this.loading = false;
  }
};
</script>