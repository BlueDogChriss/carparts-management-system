<template>
  <div id="nav">
    <Menubar v-if="this.$route.path !== '/login'" :model="items" />
    <Toast position="top-right" />
    <router-view />
  </div>
</template>
<script>
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";

export default {
  data() {
    return {
      items: [
        {
          label: "Parts",
          icon: "pi pi-fw pi-file",
          to: "/parts"
        },
        {
          label: "Stocks",
          icon: "pi pi-fw pi-user",
          to: "/stocks"
        },
        {
          label: "Log in",
          icon: "pi pi-fw pi-user",
          to: "/login"
        },
        {
          label: "Sign Out",
          icon: "pi pi-fw pi-power-off",
          command: () => {
            localStorage.clear();
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Logged out",
              life: 2000
            });
            this.$router.push("/");
          }
        }
      ]
    };
  },
  components: {
    Menubar,
    Toast
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
