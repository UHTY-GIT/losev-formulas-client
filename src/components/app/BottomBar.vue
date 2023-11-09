<!--scr/components/app/BottomBar.vue-->
<template>
  <footer>
    <div id="audio-player" class="audio-player">
      <audio ref="audioElement" :src="playingPodcast?.audio_url" preload="metadata"></audio>
      <div class="audio-photo-names">
        <div class="audio-photo">
          <img :src="playingPodcast?.imageUrl || require('@/assets/photo/download-podcast.png')" alt="audio-photo">
        </div>
        <div class="audio-names">
          <span class="podcast_name">{{  playingPodcast?.title || '' }}</span>
          <span class="podcast_autor">{{ playingPodcast?.author || '' }}</span>
        </div>
      </div>
      <div class="audio_usage">
        <div class="audio-controls">
          <button class="audio-prev" @click="prevTrack" :disabled="isPodcastUnavailable">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/>
            </svg>
          </button>
          <button id="play-pause-button" class="play-icon audio-play" @click="playPause" :disabled="isPodcastUnavailable">
            <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/>
            </svg>
          </button>
          <button class="audio-next"  @click="nextTrack" :disabled="isPodcastUnavailable">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/>
            </svg>
          </button>
        </div>
        <div class="audio-track">
          <span id="current-time" class="time">{{ currentTime }}</span>
          <input
              type="range"
              ref="seekSlider"
              id="seek-slider"
              v-model="currentTime1"
              @input="onSliderChange"
              :disabled="isPodcastUnavailable">
          <span id="duration" class="time">{{ playingPodcast?.duration || '00:00' }}</span>
        </div>
      </div>
      <div class="audio-setting">
        <div class="audio-rating">
          <button
              v-for="index in 5"
              :key="index"
              class="audio-star"
              @mouseover="fillStar(index)"
              @mouseout="unfillStar(index)"
              @click="submitRating(index)"
              :disabled="isPodcastUnavailable">
            <svg v-if="index > hoveredRating && index > selectedRating" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" :style="{ fill: '#ffffff' }"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" :style="{ fill: '#ffffff' }"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
          </button>
        </div>
        <button
            class="audio-favorite"
            :class="{'active': playingPodcast?.isFavorite}"
            @click="toggleFavorite(playingPodcast)"
            aria-label="favorite"
            :disabled="isPodcastUnavailable">
        </button>
        <div class="audio-volume">
          <button id="volume-icon" class="volume-icons" @click="toggleMute">
            <!-- Перша SVG іконка -->
            <svg v-show="volume > 0 && volume <= 30" id="volume-icon-very-low" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="display: none;">
              <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
            </svg>
            <svg v-show="volume > 30 && volume <= 55" id="volume-icon-low" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="display: none;">
              <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/>
            </svg>
            <!-- Друга SVG іконка -->
            <svg v-show="volume > 55" id="volume-icon-high" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
              <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
            </svg>
            <!-- Mute SVG іконка -->
            <svg v-show="volume == 0" id="volume-icon-mute" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" style="display: none;">
              <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
            </svg>
          </button>
          <!-- <output id="volume-output" max="100" value="100">100</output> -->
          <input
              type="range"
              ref="volumeSlider"
              id="volume-slider"
              :max="100"
              v-model="volume"
              @input="changeVolume">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
//import { ref, computed } from 'vue';
import apiService from "@/services/apiService";
import M from "materialize-css";

export default {
  name: 'BottomBar',
  data() {
    return {
      currentTime1: 0,
      currentTime: "00:00",
      isFavorite: false,
      audioDuration: "00:00",
      volume: 100,
      progress: 0,
      selectedRating: 0, // The user's selected rating
      hoveredRating: 0,  // Rating being hovered
    };
  },
  computed: {
    ...mapGetters([
      'playingPodcast',
    ]),
    isPodcastUnavailable() {
      return !this.playingPodcast;
    },
    isPlaying() {
      return this.$store.getters.isPlaying;
    },
    playingPodcast() {
      return this.$store.state.playingPodcast;
    }
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        // Перевірка, чи аудіо повністю завантажене перед його відтворенням
        if (this.$refs.audioElement.readyState === 4) {
          this.$refs.audioElement.play();
        } else {
          this.$refs.audioElement.oncanplaythrough = () => {
            this.$refs.audioElement.play();
          };
        }
      } else {
        this.$refs.audioElement.pause();
      }
    },
    'playingPodcast.id': function(newId, oldId) {
      if (oldId !== newId) {
        this.$refs.audioElement.pause();
        this.$refs.audioElement.currentTime = 0;
      }
      this.isFavorite = this.$store.getters.isFavorite(newId);
    },
    // Перегляд змін аудіо URL, щоб зупинити аудіо, якщо URL змінюється
    'playingPodcast.audio_url': function(newUrl, oldUrl) {
      if (oldUrl !== newUrl) {
        this.$refs.audioElement.pause();
        this.$refs.audioElement.currentTime = 0;
      }
    }
  },
  methods: {
    // playPause() {
    //   this.$store.dispatch('togglePlayStatus');
    // },
    playPause() {
      // Якщо аудіо вже грає, поставимо його на паузу
      if (this.isPlaying) {
        this.$refs.audioElement.pause();
        this.$store.dispatch('togglePlayStatus', false);
      } else {
        // Пробуємо відтворити аудіо
        const playPromise = this.$refs.audioElement.play();

        // У разі помилки, наприклад, якщо аудіо ще не готове, виведемо помилку
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Аудіо почало відтворюватися
            this.$store.dispatch('togglePlayStatus', true);
          }).catch(error => {
            console.error('Проблема з відтворенням аудіо:', error);
            M.toast({ html: `Проблема з відтворенням аудіо` });
          });
        }
      }
    },
    // Завершення аудіо
    handleAudioEnd() {
      this.$store.dispatch('togglePlayStatus');
    },
    //регулювання висоти звуку аудіо
    changeVolume() {
      this.$refs.audioElement.volume = this.volume / 100;
      this.$refs.volumeSlider.style.setProperty('--volume-before-width', this.volume + '%');
    },
    toggleMute() {
      if (this.$refs.audioElement.volume > 0) {
        this.previousVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.previousVolume;
      }
      this.changeVolume();
    },
    // перемотування на 10 секунд назад
    prevTrack() {
      const wasPlaying = this.$refs.audioElement.paused;
      if (wasPlaying) {
        // змінюємо іконку на плей якщо перемотали аудіо
        this.$store.dispatch('togglePlayStatus');
      }

      if (this.$refs.audioElement) {
        this.$refs.audioElement.currentTime = Math.max(this.$refs.audioElement.currentTime - 10, 0);
      }
    },
    // перемотування на 10 вперед
    nextTrack() {
      const wasPlaying = this.$refs.audioElement.paused;
      if (wasPlaying) {
        // змінюємо іконку на плей якщо перемотали аудіо
        this.$store.dispatch('togglePlayStatus');
      }

      if (this.$refs.audioElement) {
        this.$refs.audioElement.currentTime = Math.min(this.$refs.audioElement.currentTime + 10, this.$refs.audioElement.duration);
      }
    },
    //Сердечко анімація
    async toggleFavorite(playingPodcast) {
      //this.isFavorite = !this.isFavorite;

      //this.$store.commit('TOGGLE_FAVORITE');
      if (this.playingPodcast && this.playingPodcast.id) {
        this.$store.dispatch('toggleFavorite', playingPodcast.id);
      }

      const token = localStorage.getItem('token');


      try {
        const response = await apiService.addAndRemoveToFavorite(token, playingPodcast.id,  `${this.$store.getters.isFavorite(playingPodcast.id)}`);

        if (response.data === true) {
          console.log('Операція успішна', response);

          this.$store.dispatch('updateIsFavoriteForPlayingPodcast', this.$store.getters.isFavorite(playingPodcast.id));
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
    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    },
    updateProgress() {
      this.progress = (this.$refs.audioElement.currentTime / this.$refs.audioElement.duration) * 100;
      this.$refs.seekSlider.style.setProperty('--seek-before-width', this.progress + '%');
    },
    updateTime() {
      if (this.$refs.audioElement) {
        this.currentTime = this.formatTime(this.$refs.audioElement.currentTime);
        this.currentTime1 = this.$refs.audioElement.currentTime;
        //console.log("this.currentTime()= " + this.currentTime)
        this.$refs.seekSlider.value = (this.$refs.audioElement.currentTime / this.$refs.audioElement.duration) * 100;
        //console.log("this.$refs.seekSlider.value= " + this.$refs.seekSlider.value)
      }
    },
    updateDuration() {
      this.audioDuration = this.formatTime(this.$refs.audioElement.duration);
      //console.log("this.audioDuration= " + this.audioDuration)
      this.$refs.seekSlider.max = this.$refs.audioElement.duration;
      //console.log("this.$refs.seekSlider.max= " + this.$refs.seekSlider.max)
    },
    onSliderChange() {
      // дивимось чи аудіо на паузі
      const wasPlaying = this.$refs.audioElement.paused;
      if (wasPlaying) {
        // змінюємо іконку на плей якщо перемотали аудіо
        this.$store.dispatch('togglePlayStatus');
      }

      this.currentTime = this.formatTime(this.$refs.audioElement.currentTime);
      //console.log("this.currentTime= " + this.currentTime)
      this.$refs.audioElement.currentTime = this.$refs.seekSlider.value;
      //console.log("this.$refs.audioElement.currentTime= " + this.$refs.audioElement.currentTime)
      this.progress = (this.$refs.audioElement.currentTime / this.$refs.audioElement.duration) * 100;
      //console.log("this.progress= " + this.progress)
      this.$refs.seekSlider.style.setProperty('--seek-before-width', this.progress + '%');

    },
    // анімація іконок рейтингу
    fillStar(index) {
      this.hoveredRating = index;
    },
    unfillStar(index) {
      if (this.selectedRating !== index) {
        this.hoveredRating = 0;
      }
    },
    // надсилання рейтингу
    async submitRating(index) {
      console.log("User submitted a rating of:", index);
      this.selectedRating = index;
      this.hoveredRating = index;
      const token = localStorage.getItem('token');
      const podcastId = this.playingPodcast.id;
      const rating = index;

      try {
        const response = await apiService.submitPodcastRating(token, podcastId, rating);

        if (response.data === true) {
          M.toast({ html: `Успішно` });
        } else if (
            response.error &&
            response.error.message &&
            response.error.message === "You need to login before continue"
        ) {
          M.toast({ html: `Ви не авторизовані` });
          this.selectedRating = 0;
        } else if (response.data === null) {
          M.toast({ html: `Ви не можете проголосувати знову` });
        }
        else {
          console.error('Отримана неочікувана відповідь з сервера:', response);
        }

      } catch (error) {
        console.error("Помилка при спробі поставити рейтинг:", error);
      }
    },
  },
  mounted() {
    this.changeVolume();
    // додавання слухачів подій

    if (this.$refs.audioElement) {
      this.$refs.audioElement.addEventListener('timeupdate', this.updateTime);
      this.$refs.audioElement.addEventListener('loadedmetadata', this.updateDuration);
      this.$refs.audioElement.addEventListener('timeupdate', this.updateProgress);
      //слухач події 'ended' для обробки завершення програвання аудіо
      this.$refs.audioElement.addEventListener('ended', this.handleAudioEnd);
    }
  },
  beforeUnmount() {
    // прибирання слухачів подій

    if (this.$refs.audioElement) {
      this.$refs.audioElement.removeEventListener('timeupdate', this.updateTime);
      this.$refs.audioElement.removeEventListener('loadedmetadata', this.updateDuration);
      this.$refs.audioElement.removeEventListener('timeupdate', this.updateProgress);
      // Видаліть слухач події 'ended'
      this.$refs.audioElement.removeEventListener('ended', this.handleAudioEnd);
    }
  },
};
</script>