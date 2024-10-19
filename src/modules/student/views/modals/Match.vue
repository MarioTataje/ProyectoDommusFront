<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h3 class="modal-title">¡Felicidades!</h3>
      <img src="@/assets/logos/match.png" alt="Contacto" class="modal-image">
      <p>¡Hemos encontrado a tu roommate ideal! 
        Ahora puedes ponerte en contacto con tu nuevo compañero de piso a través de WhatsApp o correo electrónico 
        para conocerse mejor y coordinar detalles.
      </p>
      <div class="contact-info" v-if="contacts.length">
        <div v-for="contact in contacts" :key="contact.id" class="contact-item">
          <div v-if="contact.type === 'Email'" class="contact-detail">
            <span class="email-info">{{ contact.description }}</span>
          </div>
        </div>
      </div>
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

    onMounted(() => {
      getContacts(props.otherId);
      openModal();
    });

    return {
      isOpen,
      openModal,
      closeModal,
      contacts
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
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente detrás del modal */
}

.modal-content {
  background-color: white; /* Fondo blanco */
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 50%;
  max-height: 60%;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-title {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 2em;
}

.modal-image {
  width: 150px;
  margin: 0 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 5px 0;
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

.email-info {
  background-color: #0043CE;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  flex-grow: 1;
}

h2 {
  margin: 0;
}

p {
  margin: 10px 0;
}
</style>
