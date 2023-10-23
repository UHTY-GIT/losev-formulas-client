<template>
  <div class="page_title">
    <p>
      Налаштування
    </p>
  </div>
  <div class="block-settings">
    <div class="title-settings">
      <p>
        Загальні
      </p>
    </div>
    <div class="content-settings">
      <div class="one-language">
        <span>
          Мова інтерфейсу:
        </span>
          <div class="selected-item-category" @click="toggleDropdown('language')">
            <span class="selected-item-filter">{{ selectedLanguage }}</span>
            <a :class="['arrow-icon-settings', { 'open': dropdowns.language }]">
              <span class="left-bar-settings"></span>
              <span class="right-bar-settings"></span>
            </a>
          </div>
          <div class="dropdown-content dropdown-language" v-show="dropdowns.language">
            <a href="#" @click="filterByLanguage('ukrainian')">Українська (Ukrainian)</a>
<!--            <a href="#" @click="filterByLanguage('english')">Англійська (English)</a>-->
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AllCategoriesPage",
  data() {
    return {
      loading: false,
      dropdowns: {
        language: false,
      },
      selectedLanguage: "Українська (Ukrainian)",
    }
  },
  methods: {
    //випадаючий список
    async toggleDropdown(type) {
      console.log("Toggle dropdown called with:", type);
      this.dropdowns[type] = !this.dropdowns[type];
    },
    // зміна мови сайту
    filterByLanguage(language) {
      this.selectedLanguage = 'ukrainian'; // Скидаємо фільтр категорії при зміні типу
      if (language === 'ukrainian') {
        this.selectedLanguage = 'Українська (Ukrainian)';
      } else if (language === 'english') {
        this.selectedLanguage = 'Англійська (English)';
      }
    },
    //закриття випадаючого списку при кліку за межами їх блоків
    closeDropdowns() {
      this.dropdowns.language = false;
    },
    checkOutsideClick(event) {
      const selectedItemFilter = document.querySelector('.selected-item-filter');
      const dropdownContents = document.querySelectorAll('.dropdown-content');
      let isOutside = true;

      // Якщо клік відбувся на selectedItemFilter або всередині його дочірніх елементів
      if (selectedItemFilter && (selectedItemFilter === event.target || selectedItemFilter.contains(event.target))) {
        return;  // Ігноруємо такий клік і не закриваємо випадаюче меню
      }

      dropdownContents.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
          isOutside = false;
        }
      });

      if (isOutside) {
        this.closeDropdowns();
      }
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.checkOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.checkOutsideClick);
  },
}
</script>