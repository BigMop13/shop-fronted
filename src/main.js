import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import router from "@/router";
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      products: [],
      cart: [],
    }
  },
  mutations: {
    addProduct (state, product) {
      state.products.push(product);
      state.cart.push(product);
    }
  }
});


const app = createApp(App)

registerPlugins(app)

app.use(router)
app.use(store)
app.mount('#app')

