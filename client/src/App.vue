<template>
  <div id="app">
    <Summary></Summary>

    <h4>© Alain Dimabuyo</h4>
  </div>
</template>

<script>
import Summary from "./components/Summary";
export default {
  name: "App",
  components: {
    Summary
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.socials {
  display: flex;
  justify-content: center;
}

a {
  text-decoration: none;
  color: #212121;
}
a:hover {
  color: #fc4a1a;
}
svg {
  margin: 50px;
  width: 50%;
  height: auto;
}
svg:hover {
  animation-name: bounce;
  animation-duration: 1s;
}
@keyframes bounce {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
