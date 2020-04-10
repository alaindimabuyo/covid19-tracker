<template>
  <div class="box">
    <div class="map-container">
      <div class="map-container-wrapper">
        <div style="width: 100vw; height: 50vh;" id="map" ref="map"></div>
        <div>
          <input
            placeholder="Search for a country e.g. 'Japan'"
            type="text"
            autocomplete="off"
            v-model="search"
            @focus="modal=true"
            class="search__input"
          />
        </div>

        <div v-if="modal" class="global-detail-wrapper-content">
          <div v-for="(item,index) in filteredAndSorted" :key="index">
            <li
              v-on:click="onClick(item.long, item.lat, item.combinedKey, item.confirmed, item.recovered, item.deaths)"
            >{{item.combinedKey}}</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      search: "",
      state: "",
      states: null,
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,

      latitude: 12.8797,
      longitude: 121.774,
      zoom: 5,
      message: "",
      mapStyle: "mapbox://styles/mapbox/navigation-guidance-day-v4",
      filteredStates: [],
      modal: false,
      map: null,
      popup: null
    };
  },

  computed: {
    filteredAndSorted() {
      // function to compare names
      function compare(a, b) {
        if (a.combinedKey < b.combinedKey) return -1;
        if (a.combinedKey > b.combinedKey) return 1;
        return 0;
      }

      return this.states
        .filter(user => {
          return user.combinedKey
            .toLowerCase()
            .includes(this.search.toLowerCase());
        })
        .sort(compare);
    }
  },
  watch: {
    isComplete: function(value) {
      console.log(value + " is updated");
    },
    state() {
      this.filterStates();
    }
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get("/api/country");

      this.states = res.data;

      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
  },
  mounted() {
    // initialize the map
    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: this.$refs.map,
      style: this.mapStyle,
      center: [this.longitude, this.latitude],
      zoom: this.zoom
    }).addControl(new mapboxgl.FullscreenControl());
  },

  methods: {
    onClick(lat, long, combinedKey, cases, recover, deaths) {
      this.popup !== null ? this.popup.remove() : null;
      this.map.flyTo({
        center: [lat, long],
        essential: true
      });

      this.popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([lat, long])
        .setHTML(
          `<div>` +
            ` <h3>${combinedKey}</h3> ` +
            `<h2>Confirmed: ${cases
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>` +
            `<h2>Recovered: ${recover
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>` +
            `<h2>Deaths: ${deaths
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>` +
            `</div>`
        )
        .addTo(this.map);
      this.modal = false;
      this.search = combinedKey;
    },
    setState(state) {
      this.state = state;
      this.modal = false;
    }
  }
};
</script>

<style >
.map-container-wrapper {
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(1, 1fr);
}

.mapboxgl-canvas {
  left: 0;
}
.mapboxgl-canvas {
  height: "100%";
}

li {
  width: 60%;
  list-style: none;
  cursor: pointer;
  background: #070107;
  border-style: none;
  padding: 10px;
  color: white;
  margin: 5px;
  border-radius: 10px;
}
li:hover {
  list-style: none;
  cursor: pointer;
  background: #771577;
  border-style: none;
  padding: 10px;
  color: white;
  margin: 5px;
  border-radius: 10px;
}
.search__input {
  width: 80%;
  margin-top: 20px;
  padding: 12px 24px;

  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;

  color: #575756;
  background-color: transparent;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #575756;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.search__input::placeholder {
  color: color(#575756 a(0.8));
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search__input:hover,
.search__input:focus {
  padding: 12px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #575756;
  border-radius: 0;
  background-position: 100% center;
}
#fly {
  display: block;
  position: relative;
  margin: 0px auto;
  width: 50%;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: #ee8a65;
}
.box,
.map-container,
.map-container-wrapper,
.map {
  z-index: 10;
}
</style>