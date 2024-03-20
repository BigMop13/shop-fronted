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

      <v-autocomplete
        v-if="searchSuggestions.length > 0 && searchQuery.length >= 2"
        :items="searchSuggestions"
        item-text="name"
        item-value="id"
        v-model="selectedSuggestion"
        @change="onSuggestionSelect"
        dense
        outlined
        flat
        hide-no-data
        hide-details
        label="Sugestie wyszukiwania"
        return-object
      ></v-autocomplete>
    </div>

    <v-data-iterator
      :items="filteredItems"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
        <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
          <div class="text-truncate">
            Most popular mice
          </div>

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
            v-for="(item, i) in filteredItems"
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
          category: {{ selectedCategory.value }}
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
  data() {
    return {
      itemsPerPage: 8,
      tabItems: [],
      selectedCategory: 1,
      searchQuery: '',
      searchSuggestions: [],
      selectedSuggestion: null,
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

  computed: {
    filteredItems() {
      if (this.selectedSuggestion) {
        return [this.selectedSuggestion];
      }
      return this.searchQuery.length >= 2
        ? this.tabItems.filter((item) => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        : this.tabItems;
    }
  },

  methods: {
    async fetchData() {
      const categoryId = this.$route.params.categoryId || this.selectedCategory;
      const env = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await fetch(`${env}category_products/${categoryId}`);
      this.tabItems = await response.json();
    },

    async fetchSuggestions() {
      if (this.searchQuery.length >= 2) {
        const env = import.meta.env.VITE_APP_API_BASE_URL;
        try {
          const response = await fetch(`${env}search_products/${this.searchQuery}`);
          if (response.ok) {
            this.searchSuggestions = await response.json();
          } else {
            console.error('Error fetching suggestions', response);
          }
        } catch (error) {
          console.error('Error executing fetch request to API', error);
        }
      } else {
        this.searchSuggestions = [];
      }
    },

    onSuggestionSelect(suggestion) {
      this.searchQuery = suggestion.name; // Update searchQuery to full product name
      this.selectedSuggestion = suggestion; // Save the selected suggestion
      // Additional actions can be added here, like redirecting to the product page
    },

    handleClick(item) {
      this.$router.push({name: 'product_details', params: {id: item.id}});
    }
  },
};
</script>

<style>
.clickable-record {
  cursor: pointer;
  transition: background-color 0.3s;
}

.clickable-record:hover {
  background-color: #f5f5f5;
}

.search-bar {
  margin-bottom: 20px;
}
</style>
