<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2 class="modal-title">¡Felicidades!</h2>
      <img src="@/assets/logos/match.png" alt="Contacto" class="modal-image">
      <p>Has conseguido tu potencial compañero de piso, ahora puedes contactarlo.</p>
      <p>Aseguramos que tendrán una convivencia y experiencia UNIVERSITARIA espectacular.</p>
      <div class="contact-info" v-if="contacts.length">
        <div v-for="contact in contacts" :key="contact.id" class="contact-item">
          <div v-if="contact.type === 'WhatsApp'" class="contact-detail">
            <img src="@/assets/icons/wsp_icon.png" alt="WhatsApp" class="contact-icon">
            <span class="whatsapp-info">{{ contact.description }}</span>
          </div>
          <div v-if="contact.type === 'Email'" class="contact-detail">
            <img src="@/assets/icons/email_icon.png" alt="Email" class="contact-icon">
            <span class="email-info">{{ contact.description }}</span>
          </div>
        </div>
      </div>
      <button @click="confirmAccept" class="confirm-button">Aceptar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import useProfile from '../../composables/useProfile';

export default {
  props: {
    otherId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { contacts, getContacts } = useProfile();
    const { ctx } = getCurrentInstance();
    const isOpen = ref(false);

    const openModal = () => {
      isOpen.value = true;
    };

    const closeModal = () => {
      isOpen.value = false;
      ctx._.emit('close');
    };

    const confirmAccept = () => {
      closeModal();
    };

    onMounted(() => {
      getContacts(props.otherId);
      openModal();
    });

    return {
      isOpen,
      openModal,
      closeModal,
      contacts,
      confirmAccept
    };
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  background: url('@/assets/backgrounds/global-background.png') no-repeat center center;
  background-size: cover;
  border-radius: 20px;
  text-align: center;
  position: relative;
  max-width: 70%;
  max-height: 70%;
  overflow-y: auto;
  margin-left: 5%;
}

.modal-title {
  color: #fff;
  margin: 0 0 20px 0;
  font-size: 2em;
}

.modal-image {
  width: 150px;
  margin: 20px 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.contact-item {
  flex-direction: row;
  font-size: 18px;
}

.contact-detail {
  display: flex;
  width: 50%;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
}

.contact-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 10px;
}

.whatsapp-info {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  flex-grow: 1;
}

.email-info {
  background-color: #2196f3;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  flex-grow: 1;
}

.confirm-button {
  background-color: #f44336;
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

h2 {
  margin: 0;
}

p {
  margin: 10px 0;
}
</style>
