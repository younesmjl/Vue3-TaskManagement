<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/tasks">Tâches à faire</router-link> |
    <router-link to="/about">A propos</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 860px;
  margin: 0 auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #f56b2a;
    }
  }
}
</style>
