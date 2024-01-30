<template>
  <div class="Login">
    <div>
      <Button
        icon="pi pi-home"
        class="p-button-rounded p-button-info p-button-outlined"
        @click="handleToHomeClick($event)"
      />
    </div>
    <div class="container">
      <Fieldset>
        <template #legend> Login </template>
        <div class="p-fluid">
          <div class="p-field">
            <InputText
              id="inputtext"
              type="text"
              v-model="user.email"
              placeholder="email"
            />
          </div>
          <div class="p-field">
            <InputText
              id="inputtext"
              type="password"
              v-model="user.password"
              placeholder="password"
            />
          </div>
          <div class="submit">
            <Button label="Log In" @click="handleClick($event)" />
            <span class="marginTop"
              >You don't have an account?
              <router-link to="/register">Register here.</router-link>
            </span>
          </div>
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script>
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import UserService from "../service/UserService";
// import Toast from "primevue/toast";

export default {
  data() {
    return {
      user: {}
    };
  },
  userService: null,
  created() {
    this.userService = new UserService();
  },
  methods: {
    handleToHomeClick(evt) {
      evt.preventDefault();
      this.$router.push("parts");
    },
    handleClick(evt) {
      evt.preventDefault();
      console.log(this.user.email, this.user.password);
      const user = {
        email: this.user.email,
        password: this.user.password
      };
      if (user.email === undefined || user.password === undefined) {
        this.$toast.add({
          severity: "error",
          summary: "Email or password should not be empty",
          life: 3000
        });
      }
      this.userService
        .authenticate(user)
        .then(data => {
          this.$toast.add({
            severity: "success",
            summary: `Welcome, ${user.email}`,
            detail: "Logged in successfully!",
            life: 3000
          });
          localStorage.setItem("token", data.token);
          this.$router.push("parts");
        })
        .catch(err => {
          console.log(err.response.status);
          if (err.response.status === 404) {
            this.$toast.add({
              severity: "error",
              summary: "User not found",
              life: 3000
            });
          }
        });
    }
  },
  components: {
    Fieldset,
    InputText,
    Button
  }
};
</script>
<style scoped>
.Login {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.submit {
  display: flex;
  flex-direction: column;
}
.marginTop {
  margin-top: 20px;
}
.container {
  min-width: 400px;
  text-align: center;
}
.p-field {
  margin-bottom: 1.5rem;
}
</style>
