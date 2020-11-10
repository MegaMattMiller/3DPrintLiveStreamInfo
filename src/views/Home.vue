<template>
  <div class="home" v-if="!loading">
    <div>Name = {{ thingData.name }}</div>
    <img :src="thingImageUrl" width="500" height="auto" />
    <qrcode-vue :value="qrUrl"></qrcode-vue>
  </div>
</template>

<script>
const axios = require('axios').default;
import QrcodeVue from 'qrcode.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      loading: false,
      thingData: undefined,
      thingImageUrl: '',
      qrUrl: '',
      error: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      this.error = this.post = null;
      this.loading = true;
      console.log(process.env.VUE_APP_APP_TOKEN);
      const thingId = this.$route.params.id;
      this.loading = true;
      this.thingData = await this.getThing(thingId);
      var thingImages = await this.getImagePaths(this.thingData.images_url);
      this.thingImageUrl = this.getPreviewImage(thingImages[0]);
      this.qrUrl = this.thingData.public_url;
      this.loading = false;
      console.log(this.thingData);
      console.log(this.thingData.public_url);
    },
    async getThing(thingId) {
      try {
        const response = await axios.get(
          `https://api.thingiverse.com/things/${thingId}?access_token=${process.env.VUE_APP_APP_TOKEN}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    },
    async getImagePaths(thingImageUrl) {
      try {
        const response = await axios.get(
          `${thingImageUrl}?access_token=${process.env.VUE_APP_APP_TOKEN}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    },
    getPreviewImage(thingImageData) {
      const found = thingImageData.sizes.find(
        (element) => element.size == 'featured'
      );
      return found.url;
    },
  },
};
</script>
