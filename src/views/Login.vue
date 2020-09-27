<template>
  <div class="content login-content">
    <div class="grid-x">
      <div class="cell large-9 large-offset-3 align-center">
        <h3>Bitte einloggen oder kostenlos einen neuen Account erstellen</h3>
      </div>
    </div>

    <div class="grid-x">
      <div class="cell large-9 large-offset-3 align-center">
        <h4>Gast Account kann zum ausprobieren benutzt werden</h4>
        <ul class="no-bullet">
          <li>E-Mail: <em>gast@xenadu.de</em></li>
          <li>Passwort: <em>gast1</em></li>
        </ul>
      </div>
    </div>

    <div class="grid-x grid-padding-x text-center">
      <div class="cell large-9 large-offset-3 align-center">
        <form @submit.prevent="submit" autocomplete="off">
          <p class="error-msg">{{ messages.errorMsg }}</p>
          <p class="success-msg">{{ messages.successMsg }}</p>
          <div v-if="isLoading === false" class="input-frame">
            <div class="input-inner-wrapper">
              <label for="email">E-Mail</label>
              <input type="email" name="email" placeholder="max@mustermann.de" v-model="form.email">
            </div>
            <div class="input-inner-wrapper">
              <label for="password">Passwort</label>
              <input type="password" name="password" v-model="form.password">
            </div>
            <div class="input-inner-wrapper">
              <p>
                <a href="#">Ich möchte einen Account erstellen</a>
              </p>

              <button :disabled="isLoading" class="btn btn-primary" type="submit">Login</button>
            </div>
          </div>
          <div v-else>
            <img src="@/assets/loadring.gif" />
          </div>
        </form>
      </div>
    </div>

    <p>{{ auth }}</p>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      form: {
        email: 'stefan.simon@xenadu.de',
        password: 'itsmemygod',
      },
      messages: {
        errorMsg: '',
        successMsg: '',
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    auth() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions({
      loginAction: 'auth/login',
    }),
    displayErrorMessage(msg = '') {
      this.messages.successMsg = '';
      this.messages.errorMsg = msg;
    },
    displaySuccessMessage(msg = '') {
      this.messages.errorMsg = '';
      this.messages.successMsg = msg;
    },
    clearInput(clearAll = true) {
      if (clearAll) {
        this.form.email = '';
      }

      this.form.password = '';
    },
    async login(data) {
      this.isLoading = true;
      await this.$store.dispatch('auth/login', data);
      // await this.loginAction(data);
      this.isLoading = false;
      if (this.isAuthenticated === null) {
        this.displayErrorMessage('Kein gültiger Login');
      } else {
        this.$router.push({ name: 'Home' });
      }
      /*
      if (responseMsg.isError) {
        this.clearInput(false);
        this.displayErrorMessage(responseMsg.msg);
      } else {
        this.clearInput(true);
        this.displaySuccessMessage(responseMsg.msg);
        this.$router.push('Dashboard');
      } */
    },
    submit() {
      this.login(this.form);
    },
  },
};
</script>

<style scoped lang="scss">
.login-content {
  margin: 0 auto;
}

.error-msg {
  color: red;
  font-weight: bold;
  font-size: 1.2em;
}
.success-msg {
  color: darkgreen;
  font-weight: bold;
  font-size: 1.2em;
}
.input-frame {
  text-align: center;
  display: flex;
  flex-direction: column;
  border: solid 1px #333;
  // width: 600px;
  margin: 0 auto;
  margin-top: 10%;
}

.input-inner-wrapper {
  margin: 15px 0;
}

.input-inner-wrapper label {
  display: inline-block;
  // width: 150px;
  margin-right: 200px;
}

.input-frame input {
  font-size: 1em;
  padding: 5px;
}

.btn {
  font-size: 16px;
  padding: 7px;
}

.btn-primary {
  background-color: rgb(49, 31, 129);
  color: white;
  text-transform: uppercase;
  border: none;
}

</style>
