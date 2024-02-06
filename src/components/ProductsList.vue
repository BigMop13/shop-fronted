<template>
  <v-data-iterator
    :items="tabItems"
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
          v-for="(item, i) in tabItems"
          :key="i"
          cols="12"
          sm="6"
          xl="3"
        >
          <!-- Clickable element -->
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
        <!--Total mice: {{ mice.length }}-->
        category: {{ selectedCategory.value }}
        <div>
          Page {{ page }} of {{ pageCount }}
        </div>
      </v-footer>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 8,
      tabItems: [],
      selectedCategory: 1,
    }
  },

  watch: {
    '$route'(to, from) {
      if (to.params.categoryId !== from.params.categoryId) {
        this.fetchData();
      }
    }
  },


  methods: {
    async fetchData() {
      const categoryId = this.$route.params.categoryId || this.selectedCategory;
      const env = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await fetch(env + 'category_products/' + categoryId);
      this.tabItems = await response.json();
    },

    handleClick(item) {
      console.log('Clicked item:', item);

      this.$router.push({ name: 'product_details', params: { id: item.id } });

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
</style>
