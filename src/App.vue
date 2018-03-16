<template>
  <div v-if="authRoute"
       class="login">
    <router-view />
  </div>

  <div v-else
       class="app"
       @click.capture="hideSidebar">
    <el-container>
      <el-header class="app-header"
                 height="50px">
        <app-header />
      </el-header>
      <el-container>
        <el-aside class="app-sidebar"
                  width="200px">
          <app-sidebar />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <div v-if="appMask"
           class="modal-backdrop search-backdrop" />
    </el-container>
  </div>
</template>

<script>
import AppHeader from '@/components/App/AppHeader';
import AppSidebar from '@/components/App/AppSidebar';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppSidebar,
  },
  computed: {
    authRoute() {
      return this.$route.matched.some(record => record.meta.authRoute);
    },

    ...mapState([
      'openSidebar',
      'appMask',
    ]),
  },

  methods: {
    hideSidebar() {
      if (this.$store.state.openSidebar === true) {
        this.$store.state.openSidebar = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900");
@import "src/assets/sass/app.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
