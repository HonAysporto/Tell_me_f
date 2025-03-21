<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 shadow py-3 py-md-5 my-5 rounded">
        <h4 class="text-secondary text-center">Register</h4>

        <div v-if="errmsg || loading" class="text-warning text-center">
          {{ errmsg || "Processing request..." }}
        </div>

        <form class="px-3 px-md-5" @submit.prevent="submit">
          <!-- Username Field -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="v$.username.$model"
            />
            <div v-if="v$.username.$error">
              <span v-if="v$.username.required.$invalid" class="text-danger">
                {{ v$.username.required.$message }}
              </span>
              <span v-if="v$.username.minLength.$invalid" class="text-danger">
                {{ v$.username.minLength.$message }}
              </span>
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-3">
            <label for="password" class="form-label">Create a password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="v$.password.$model"
            />
            <div v-if="v$.password.$error">
              <span v-if="v$.password.required.$invalid" class="text-danger">
                {{ v$.password.required.$message }}
              </span>
            </div>
          </div>

          <button class="btn btn-outline-secondary mt-2">Create Account</button>
        </form>
        <p class="text-center my-2">
          Already have an account? <span><router-link to="/signin">Sign in</router-link></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { minLength, required, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const userForm = reactive({
  username: '',
  password: '',
});

let errmsg = ref('');
const loading = ref(false);
const timeoutId = ref(null);
const toast = useToast();
const router = useRouter();

const rules = {
  username: {
    required: helpers.withMessage('Username is required.', required),
    minLength: helpers.withMessage('Username must be at least 5 characters.', minLength(5)),
  },
  password: {
    required: helpers.withMessage('Password is required.', required),
  },
};

const v$ = useVuelidate(rules, userForm);
const url = 'https://muda-node-server-1.onrender.com/user/register';

const submit = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    toast.error("There are errors in the form. Please fix them.");
  } else {
    errmsg.value = "";
    loading.value = true;

    timeoutId.value = setTimeout(() => {
      errmsg.value = "This is test server I didn't pay. First request might take time, please wait...";
    }, 5000);

    axios.post(url, userForm)
      .then((res) => {
        clearTimeout(timeoutId.value);
        loading.value = false;

        if (res.data.status) {
          toast.success(res.data.message, { timeout: 3000 });
          router.push('/signin');
        } else {
          toast.error(res.data.message, { timeout: 3000 });
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId.value);
        loading.value = false;
        toast.error("Registration failed. Please try again.", { timeout: 3000 });
      });
  }
};
</script>