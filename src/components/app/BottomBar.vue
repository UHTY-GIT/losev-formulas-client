<template>
  <footer>
    <div id="audio-player" class="audio-player">
      <audio src="@/assets/music/Madonna-Backthatuptothebeat.mp3" preload="metadata"></audio>
      <div class="audio-photo-names">
        <div class="audio-photo">
          <img src="@/assets/photo/coconut-palm-tree.png" alt="audio-photo">
        </div>
        <div class="audio-names">
          <span class="podcast_name">Зірочка</span>
          <span class="podcast_autor">Станіслав Лосєв</span>
        </div>
      </div>
      <div class="audio_usage">
        <div class="audio-controls">
          <button class="audio-prev">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/>
            </svg>
          </button>
          <button id="play-pause-button" class="play-icon audio-play">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path class="play-svg" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/>
            </svg>
          </button>
          <button class="audio-next">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/>
            </svg>
          </button>
        </div>
        <div class="audio-track">
          <span id="current-time" class="time">0:00</span>
          <input type="range" id="seek-slider" max="100" value="0">
          <span id="duration" class="time">0:00</span>
        </div>
      </div>
      <div class="audio-setting">
        <div class="audio-rating">
          <button class="audio-star"><!-- Вставте SVG іконку "star" --></button>
          <button class="audio-star"><!-- Вставте SVG іконку "star" --></button>
          <button class="audio-star"><!-- Вставте SVG іконку "star" --></button>
          <button class="audio-star"><!-- Вставте SVG іконку "star" --></button>
          <button class="audio-star"><!-- Вставте SVG іконку "star" --></button>
        </div>
        <button class="audio-favorite" aria-label="favorite">
        </button>
        <div class="audio-volume">
          <button id="volume-icon" class="volume-icons">
            <!-- Перша SVG іконка -->
            <svg id="volume-icon-very-low" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="display: none;">
              <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
            </svg>
            <svg id="volume-icon-low" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="display: none;">
              <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/>
            </svg>
            <!-- Друга SVG іконка -->
            <svg id="volume-icon-high" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
              <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
            </svg>
            <!-- Mute SVG іконка -->
            <svg id="volume-icon-mute" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" style="display: none;">
              <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
            </svg>
          </button>
          <!-- <output id="volume-output">100</output> -->
          <input type="range" id="volume-slider" max="100" value="100">
        </div>
      </div>
    </div>
  </footer>
</template>