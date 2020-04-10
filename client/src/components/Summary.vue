<template>
  <section>
    <div v-if="loading">Loading..</div>
    <div v-if="error">
      <h1 class="error-message">{{error}}</h1>
    </div>
    <Header></Header>
    <div v-if="summaryData" class="labelUpdate">
      <div class="global-detail-wrapper">
        <div class="global-detail-wrapper__list_1">
          <h3>Confirmed</h3>
          <h2>{{summaryData.confirmed.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h2>
        </div>
        <div class="global-detail-wrapper__list">
          <h3>Recovered</h3>
          <h2>{{summaryData.recovered.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h2>
        </div>
        <div class="global-detail-wrapper__list">
          <h3>Deaths</h3>
          <h2>{{summaryData.deaths.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h2>
        </div>
      </div>
      <label class="labelName">Last Update: {{summaryData.lastUpdate}}</label>
    </div>

    <countryFlags></countryFlags>
  </section>
</template>

<script>
import axios from "axios";
import countryFlags from "./Mapbox";
import Header from "./Header";
export default {
  name: "Summary",
  components: { countryFlags, Header },
  data() {
    return {
      loading: false,
      error: null,
      summaryData: null
    };
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get("/api");

      this.summaryData = res.data;

      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
  }
};
</script>

<style>
.global-detail-wrapper {
  display: grid;
  grid-template-columns: 300px 300px 300px;
  justify-content: center;
}

.global-detail-wrapper-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
}

.error-message {
  color: red;
}
.labelUpdate {
  margin-bottom: 30px;
}
.labelName {
  font-size: 12px;
}
</style>