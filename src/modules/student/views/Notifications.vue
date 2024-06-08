<template>
  <div class="notification-container">
    <h2 class="title">Bandeja</h2>
    <div class="tabs">
      <button :class="{ active: activeTab === 'likes' }" @click="activeTab = 'likes'">Likes</button>
      <button :class="{ active: activeTab === 'matches' }" @click="activeTab = 'matches'">Matches</button>
    </div>
    <div class="content">
      <div v-if="activeTab === 'likes'">
        <div v-for="like in receivedLikes" :key="like.id" class="item">
          <span>{{ like.sender.names }} {{ like.sender.lastnames}} quiere contactarte!</span>
        </div>
      </div>
      <div v-if="activeTab === 'matches'">
        <div v-for="match in preparedMatches" :key="match.id" class="item">
          <span>{{ match.names }} {{ match.lastnames}} sigue pendiente!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, computed } from 'vue';
  import useMatch from '../composables/useMatch';
  import usePhase from '@/modules/auth/composables/usePhase';

  export default {
    name: 'Notifications',
    setup() {
      const { userId } = usePhase();
      const { matches, receivedLikes, getMatches, getReceivedLikes } = useMatch();
      const activeTab = ref('likes');

      onMounted(() => {
        const id = userId.value;
        getMatches(id);
        getReceivedLikes(id);
      });

      const preparedMatches = computed(() => {
        return matches.value.map(match => {
          if (match.receiver.id === userId.value) {
            return {
              ...match,
              names: match.sender.names,
              lastnames: match.sender.lastnames
            };
          } else {
            return {
              ...match,
              names: match.receiver.names,
              lastnames: match.receiver.lastnames
            };
          }
        });
      });

      return {
        matches,
        receivedLikes,
        activeTab,
        preparedMatches
      };
    }
  };
</script>

<style scoped>
.notification-container {
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  height: 100vh;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: hidden;
}

.title {
  color: #7b4fe3;
  font-size: 2rem;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  width: 98%;
}

.tabs button {
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  background-color: #e0e0e0;
  color: #000;
  font-size: 1em;
  flex-grow: 1;
  text-align: center;
}

.tabs button.active {
  background-color: #7b4fe3;
  color: #fff;
}

.content {
  width: 100%;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: column;
  gap: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
}

</style>
