import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import router from "./router";
import store from "./store";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .mount("#app");
