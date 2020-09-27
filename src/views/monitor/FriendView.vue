<template>
  <div class="content">
    <div class="xenadu-view-header">
    </div>
    <div>
      <div class="cell medium-12">
        <div class="xenadu-view-subheader">
          <h3 class="callout alert" v-if="hasErrorMessage">User nicht gefunden</h3>
          <div class="xenadu-load-animation" v-if="isLoading">
            <img src="@/assets/loadring.gif">
          </div>
          <div v-else>
            <h3>Profil von {{ user.name }}</h3>
            <transition name="fade">
                <NotifyModal v-if="notify" @close="closeNotification">
                  <template v-slot:title>
                    <h4>{{ notification.title }}</h4>
                  </template>
                  <template v-slot:body>
                    <p v-bind:class="notification.style">{{ notification.message }}</p>
                  </template>
                </NotifyModal>
            </transition>
            <template v-if="isFriend">
              <button @click="openNotification" class="button success">
                Nachricht schreiben
              </button>
              <button class="button alert">
                Keine Freunde mehr
              </button>
            </template>
            <template v-else>
              <button
                :disabled="isSendingRequest"
                @click.prevent="requestForFriendship"
                v-if="!isPending"
                class="button success"
              >
                Freundschaftsanfrage senden
              </button>
              <button disabled v-if="isPending" class="button tertiary">
                Freundschaftsanfrage gesendet
              </button>
            </template>
            </div>
        </div>
      </div>
      <div class="cell medium-12">
        <div class="xenadu-view-content">
          <p v-if="isLoading">Userprofil laden ...</p>
          <h3 v-else>Hier der Inhalt des Profils</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotifyModal from '@/components/templates/NotifyModal.vue';

export default {
  name: 'FriendView',
  components: {
    NotifyModal,
  },
  data() {
    return {
      // ToDo: User JS Object anlegen
      user: {
        id: 0,
        name: '',
      },
      isSendingRequest: false,
      isLoading: false,
      notify: false,
      notification: {
        message: 'Freundschaftsanfrage gesendet',
        title: 'Gesendet',
        style: '',
      },
    };
  },
  watch: {
    $route() {
      this.updateUserProfile();
    },
  },
  computed: {
    ...mapGetters('friends', ['isFriend', 'getUser', 'hasErrorMessage', 'getErrorMessage', 'isPending']),
    userId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      init: 'friends/initUserView',
      request: 'friends/sendFriendRequest',
    }),
    requestForFriendship() {
      this.isSendingRequest = true;
      this.request(parseInt(this.userId, 10))
        .then(() => {
          this.openNotification(`Freundschaftsanfrage an ${this.user.name} gesendet.`);
          // this.isPending = true;
        })
        .catch(() => {
          this.openNotification('Leider ist etwas schiefgegangen', true);
        })
        .finally(() => {
          this.isSendingRequest = false;
        });
    },
    openNotification(msg, isErrorMessage = false) {
      this.notification.message = msg;
      if (isErrorMessage) {
        this.notification.style = 'err';
      } else {
        this.notification.style = 'win';
      }
      this.notify = true;
    },
    closeNotification() {
      this.notify = false;
    },
    updateUserProfile() {
      this.isLoading = true;
      console.log(this.userId);
      this.init(this.userId)
        .then(() => {
          this.user = this.getUser;
        })
        .catch(() => {
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.updateUserProfile();
  },
};
</script>

<style lang="scss" scoped>
.err {
  color: get-color(alert);
}
.win {
  color: get-color(success);
}
.fade-enter-active {
  transition: top 0.5s;
}
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter {
  top: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
