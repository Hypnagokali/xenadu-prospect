<template>
  <div class="content medium-9">
    <div class="xenadu-view-header">
    </div>
    <div>
      <div class="medium-12">
        <div class="xenadu-view-subheader">
          <h3 class="callout alert" v-if="hasErrorMessage">User nicht gefunden</h3>
          <div class="xenadu-load-animation" v-if="isLoading">
            <img src="@/assets/loadring.gif">
          </div>
          <div v-else>
            <h4>Profil von {{ user.name }}</h4>
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
              <button
                :disabled="isWaitingForResponse"
                @click="openNotification"
                class="button success"
              >
                Nachricht schreiben
              </button>
              <button
                :disabled="isWaitingForResponse"
                @click.prevent="endFriendship"
                class="button alert"
              >
                Keine Freunde mehr
              </button>
            </template>
            <template v-else>
              <button
                :disabled="isWaitingForResponse"
                @click.prevent="requestForFriendship"
                v-if="!isPending && !hasRequestedMe"
                class="button success"
              >
                Freundschaftsanfrage senden
              </button>
              <template v-if="hasRequestedMe">
                <button
                  :disabled="isWaitingForResponse"
                  @click.prevent="acceptPendingRequest"
                  class="button success"
                >
                  Freundschaftsanfrage annehmen
                </button>
                <button
                  :disabled="isWaitingForResponse"
                  @click.prevent="denyPendingRequest"
                  class="button alert"
                >
                  Freundschaftsanfrage ablehnen
                </button>
              </template>
              <button disabled v-if="isPending" class="button tertiary">
                Freundschaftsanfrage gesendet
              </button>
            </template>
            </div>
        </div>
      </div>
      <div class="medium-9">
        <div class="xenadu-view-content">
          <p v-if="isLoading">Userprofil laden ...</p>
          <div class="grid-x grid-padding-x">
            <div class="medium-offset-1 medium-4">
            <div class="card">
              <img class="avatar" src="@/assets/profile.jpg">
              <div class="card-divider">
                {{ getUser.name }} | Rang: 0
              </div>
              <div class="card-section">
                <h6>Belohnungspunkte: {{ getUser.rewardPointsSum }}</h6>
                <h6>Ziele geschafft: {{ getUser.doneGoalCount }}</h6>
                <p><cite>Hier ist mein Lieblingszitat</cite></p>
              </div>
            </div>
          </div>
          <div class="medium-offset-1 medium-2">
            <p>weiterer Inhalt kommt später ...</p>
          </div>
          </div>

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
      isWaitingForResponse: false,
      isLoading: false,
      notify: false,
      notification: {
        message: 'Freundschaftsanfrage gesendet',
        title: 'Mitteilung',
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
    ...mapGetters('friends', ['isFriend', 'getUser', 'hasErrorMessage', 'getErrorMessage', 'isPending', 'hasRequestedMe']),
    userId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      init: 'friends/initUserView',
      request: 'friends/sendFriendRequest',
      deny: 'friends/denyFriendship',
      accept: 'friends/acceptFriendship',
      unfriend: 'friends/unfriend',
    }),
    endFriendship() {
      this.isWaitingForResponse = true;
      this.unfriend(parseInt(this.userId, 10))
        .then(() => {
          this.openNotification(`Freundschaftsanfrage von ${this.user.name} beendet.`);
          // this.isPending = true;
        })
        .catch(() => {
          this.openNotification('Leider ist etwas schiefgegangen', true);
        })
        .finally(() => {
          this.isWaitingForResponse = false;
        });
    },
    denyPendingRequest() {
      this.isWaitingForResponse = true;
      this.deny(parseInt(this.userId, 10))
        .then(() => {
          this.openNotification(`Freundschaftsanfrage von ${this.user.name} abgelehnt.`);
          // this.isPending = true;
        })
        .catch(() => {
          this.openNotification('Leider ist etwas schiefgegangen', true);
        })
        .finally(() => {
          this.isWaitingForResponse = false;
        });
    },
    acceptPendingRequest() {
      this.isWaitingForResponse = true;
      this.accept(parseInt(this.userId, 10))
        .then(() => {
          this.openNotification(`Freundschaftsanfrage von ${this.user.name} angenommen.`);
          // this.isPending = true;
        })
        .catch(() => {
          this.openNotification('Leider ist etwas schiefgegangen', true);
        })
        .finally(() => {
          this.isWaitingForResponse = false;
        });
    },
    requestForFriendship() {
      this.isWaitingForResponse = true;
      this.request(parseInt(this.userId, 10))
        .then(() => {
          this.openNotification(`Freundschaftsanfrage an ${this.user.name} gesendet.`);
          // this.isPending = true;
        })
        .catch(() => {
          this.openNotification('Leider ist etwas schiefgegangen', true);
        })
        .finally(() => {
          this.isWaitingForResponse = false;
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
.card {
  background-color: #ccc;
};
.card-section {
  background-color: white;
}
.avatar {
  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
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
