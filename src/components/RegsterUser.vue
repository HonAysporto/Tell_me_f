<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 shadow py-3 py-md-5 my-5 rounded">
        <h4 class="text-secondary text-center">Register</h4>

        <div v-if="errmsg" class="text-danger text-center">
          {{ errmsg }}
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

            <!-- Error Message -->
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

            <!-- Error Message -->
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
import { reactive } from 'vue'
import { minLength, required, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'


// Form Data
const userForm = reactive({
  username: '',
  password: '',
})

let errmsg = ref('')
const toast = useToast()
const router = useRouter()

// Validation Rules with Custom Messages
const rules = {
  username: {
    required: helpers.withMessage('Username is required.', required),
    minLength: helpers.withMessage('Username must be at least 5 characters.', minLength(5)),
  },
  password: {
    required: helpers.withMessage('Password is required.', required),
  },
}

// Vuelidate Instance
const v$ = useVuelidate(rules, userForm)
const url = 'https://muda-node-server-1.onrender.com/user/register'

// Submit Function
const submit = () => {
  v$.value.$touch(); // Mark fields as touched to trigger validation
  if (v$.value.$error) {
    toast.error("There are errors in the form. Please fix them.");
  } else {
    const userInfo = {
      username: userForm.username,
      password: userForm.password,
    };

    axios.post(url, userForm)
      .then((res) => {
        console.log(res);

        // Show toast notification
        if (res.data.status) {
            toast.success(res.data.message, {
          timeout: 3000,
        })
        router.push('/signin')
        } else {
            toast.error(res.data.message, {
          timeout: 3000,
        })
        }
      
      })
      .catch((err) => {
        console.error(err);
        // ✅ Show error toast
        toast.error("Registration failed. Please try again.", {
          timeout: 3000,
        });
      });
  }
};

</script>
