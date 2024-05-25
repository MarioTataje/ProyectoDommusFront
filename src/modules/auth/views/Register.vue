<template>
    <span class="login100-form-title p-b-41">
		Registre una cuenta
	</span>
	<form class="login100-form validate-form p-b-33 p-t-5" @submit.prevent="onSubmit">
		<div class="wrap-input100 validate-input" data-validate = "Ingrese su nombre">
			<input v-model="useForm.name" class="input100" type="text" placeholder="Nombre" required>
			<span class="focus-input100" data-placeholder="&#xe82a;"></span>
		</div>

		<div class="wrap-input100 validate-input" data-validate = "Ingrese correo">
			<input v-model="useForm.email" class="input100" type="text" placeholder="Correo" required>
			<span class="focus-input100" data-placeholder="&#xe82a;"></span>
		</div>

		<div class="wrap-input100 validate-input" data-validate="Ingrese contraseña">
			<input v-model="useForm.password" class="input100" type="password" placeholder="Contraseña" required>
			<span class="focus-input100" data-placeholder="&#xe80f;"></span>
		</div>

		<div class="container-login100-form-btn m-t-32">
			<button class="login100-form-btn">
				Crear cuenta
			</button>
		</div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'login' }">Ya tienes cuenta</router-link>
        </div>
	</form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../composables/useAuth';
import Swal from 'sweetalert2';

export default {
	setup(){
		const router = useRouter()
		const { createUser } = useAuth()
		const useForm = ref({
			name: '',
			email: '',
			password: ''
		})

		return {
			useForm,

			onSubmit: async() => {
				const { ok, message } = await createUser(useForm.value)
				if (!ok) Swal.fire('Error', message, 'error')
				else router.push({ name: 'home' })
			}
		}
	}
}
</script>

<style>

</style>