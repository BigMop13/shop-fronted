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
          <v-sheet border>
            <v-img
              :src="'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaklejki.sklep.pl%2Fplakat-panda-dla-dziecka-obrazek-a4-a3-50x70-do-wyboru-p-462.html&psig=AOvVaw3gUQ_NwDYWePoAtLYsEeP2&ust=1705353617514000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLDR5bfn3YMDFQAAAAAdAAAAABAE'"
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

                <td>{{ item.stockQuantity}}</td>
              </tr>

              <tr align="right">
                <th>Cena:</th>

                <td>${{ item.price }}</td>
              </tr>
              </tbody>
            </v-table>
          </v-sheet>
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
import EventBus from "@/plugins/eventBus";

export default {
  data() {
    return {
      itemsPerPage: 8,
      tabItems: [],
      selectedCategory: 1,
    }
  },

    created() {
    EventBus.on('tabSelected', ({category}) => {
      this.selectedCategory = category;
      console.log(this.selectedCategory)
      this.fetchData(this.selectedCategory)
    });
      this.fetchData(this.selectedCategory);
  },

  methods: {
    async fetchData(categoryId) {
      const env = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await fetch(env + 'category_products/' + categoryId);
      this.tabItems = await response.json();
    },
  },
};
</script>
