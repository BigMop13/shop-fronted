<template>
  <div>
    <div class="search-bar">
      <v-text-field
        v-model="searchQuery"
        append-icon="mdi-magnify"
        label="Wyszukaj przedmioty"
        single-line
        hide-details
        @input="fetchSuggestions"
      ></v-text-field>

      <div v-if="searchSuggestions.length > 0 && searchQuery.length >= 2" class="suggestions-container">
        <div
          v-for="(suggestion, index) in searchSuggestions"
          :key="index"
          class="suggestion-item"
          @click="onSuggestionSelect(suggestion)"
        >
          <div class="suggestion-name">{{ suggestion.photo }}</div>
          <div class="suggestion-price">${{ suggestion.name }}</div>
        </div>
      </div>
    </div>

    <v-data-iterator
      :items="tabItems"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
          <div class="d-flex align-center">
            <div class="d-inline-flex">
              <v-btn
                :disabled="page === 1"
                icon="mdi-arrow-left"
                size="small"
                variant="tonal"
                class="me-2"
                @click="prevPage"
              ></v-btn>

              <v-btn
                :disabled="page === pageCount"
                icon="mdi-arrow-right"
                size="small"
                variant="tonal"
                @click="nextPage"
              ></v-btn>
            </div>
          </div>
        </h1>
      </template>

      <template v-slot:default>
        <v-row>
          <v-col
            v-for="(item, i) in tabItems"
            :key="i"
            cols="12"
            sm="6"
            xl="3"
          >
            <div @click="handleClick(item)" class="clickable-record">
              <v-sheet border>
                <v-img
                  :src="item.imageUrl"
                  cover
                  height="150"
                ></v-img>

                <v-list-item
                  :title="item.name"
                  lines="two"
                  density="comfortable"
                  subtitle="Nazwa"
                >
                  <template v-slot:title>
                    <strong class="text-h6">
                      {{ item.name }}
                    </strong>
                  </template>
                </v-list-item>

                <v-table density="compact" class="text-caption">
                  <tbody>
                  <tr align="right">
                    <th>Opis:</th>
                    <td>{{ item.description }}</td>
                  </tr>
                  <tr align="right">
                    <th>Ilość:</th>
                    <td>{{ item.stockQuantity }}</td>
                  </tr>
                  <tr align="right">
                    <th>Cena:</th>
                    <td>${{ item.price }}</td>
                  </tr>
                  </tbody>
                </v-table>
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount }">
        <v-footer
          color="surface-variant"
          class="justify-space-between text-body-2 mt-4"
        >
          Kategoria: {{ selectedCategory.value }}
          <div>
            Page {{ page }} of {{ pageCount }}
          </div>
        </v-footer>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
export default {
  props: ['categoryId'],
  data() {
    return {
      itemsPerPage: 8,
      tabItems: [],
      selectedCategory: 1,
      searchQuery: '',
      searchSuggestions: [],
      selectedSuggestion: null,
      searchCache: {},
    }
  },

  created() {
    this.fetchData();
  },

  watch: {
    '$route'(to, from) {
      if (to.params.categoryId !== from.params.categoryId) {
        this.fetchData();
      }
    }
  },

  methods: {
    handleClick(item) {
      this.$router.replace({ name: 'product_details', params: { id: item.id } });
    },

    async fetchData() {
      const categoryId = this.$route.params.categoryId || this.selectedCategory;
      const env = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await fetch(`${env}category_products/${categoryId}`);
      this.tabItems = await response.json();
    },

    async fetchSuggestions() {
      if (this.searchQuery.length >= 2) {
        if (this.searchCache[this.searchQuery]) {
          console.log('Using cache');
          this.searchSuggestions = this.searchCache[this.searchQuery];
        } else {
          const env = import.meta.env.VITE_APP_API_BASE_URL;
          try {
            const response = await fetch(`${env}products_searcher?name=${this.searchQuery}`);
            console.log('Fetching suggestions');
            if (response.ok) {
              const results = await response.json();
              this.searchSuggestions = results;
              this.searchCache[this.searchQuery] = results;
            } else {
              console.error('Error fetching suggestions', response);
            }
          } catch (error) {
            console.error('Error executing fetch request to API', error);
          }
        }
      } else {
        this.searchSuggestions = [];
      }
    },

    onSuggestionSelect(suggestion) {
      this.$router.push({ name: 'product_details', params: { id: suggestion.id } });
    },
  },
};
</script>

<style scoped>
.suggestions-container {
  max-height: 200px; /* Ustaw na wysokość 4 elementów */
  overflow-y: auto; /* Włącz przewijanie */
}

.suggestion-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.suggestion-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.suggestion-name {
  flex-grow: 1;
}

.suggestion-price {
  margin-left: auto;
  color: #888;
}
</style>
