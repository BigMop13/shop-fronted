<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      userOrders: [],
      headers: [
        { text: 'Numer zamówienia', value: 'orderId' },
        { text: 'Data', value: 'date' },
        { text: 'Status', value: 'status' },
        { text: 'Cena', value: 'price'},
      ],
    };
  },
  created() {
    this.loadUserOrders();
  },
  methods: {
    async loadUserOrders() {
      try {
        const env = import.meta.env.VITE_APP_API_BASE_URL;
        const response = await axios.get(`${env}`);
        this.userOrders = response.data;
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  }
};
</script>
