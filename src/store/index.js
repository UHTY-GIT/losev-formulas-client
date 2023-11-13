// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    username: null,
    //playingAudioSrc: null, //стан для передавання посилання аудіо
    playingPodcast: null, // стан для передавання фото аудіо, автора і назви
    isPlaying: false,
    favoritePodcasts: [],
    searchResults: [],
  },
  getters: {
    playingPodcast: state => state.playingPodcast,
    isPlaying: state => state.isPlaying,
    isFavorite: (state) => (podcastId) => {
      return state.favoritePodcasts.includes(podcastId);
    },
    searchResults: state => state.searchResults,
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setPlayingPodcast(state, podcast) {
      state.playingPodcast = podcast;
    },
    SET_IS_PLAYING(state, status) {
      state.isPlaying = status;
    },
    SET_FAVORITE(state, podcastId) {
      if (state.favoritePodcasts.includes(podcastId)) {
        state.favoritePodcasts = state.favoritePodcasts.filter(id => id !== podcastId);
      } else {
        state.favoritePodcasts.push(podcastId);
      }
    },
    TOGGLE_FAVORITE(state) {
      if (state.playingPodcast) {
        state.playingPodcast.isFavorite = !state.playingPodcast.isFavorite;
      }
    },
    //оновлення стану лайку у взємодії подкаст - боттомбар
    UPDATE_IS_FAVORITE_FOR_PLAYING_PODCAST(state, isFavorite) {
      if (state.playingPodcast) {
        state.playingPodcast.isFavorite = isFavorite;
      }
    },
    // Резульати пошуку
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    setUserHasInteracted(state, status) {
      state.userHasInteracted = status;
    },
  },
  actions: {
    updatePlayingPodcast({commit}, podcast) { // дія
      commit('setPlayingPodcast', podcast);
      commit('SET_IS_PLAYING', true);
    },
    togglePlayStatus({ commit, state }) {
      commit('SET_IS_PLAYING', !state.isPlaying);
    },
    toggleFavorite({ commit }, podcastId) {
      commit('SET_FAVORITE', podcastId);
    },
    //оновлення стану лайку у взємодії подкаст - боттомбар
    updateIsFavoriteForPlayingPodcast({ commit }, isFavorite) {
      commit('UPDATE_IS_FAVORITE_FOR_PLAYING_PODCAST', isFavorite);
    },
    userInitiatedPlay({ commit }, podcast) {
      commit('setUserHasInteracted', true);
      commit('setPlayingPodcast', podcast);
    },
  },
  modules: {
  }
})
