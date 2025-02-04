<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <!-- Card Wrapper -->
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <!-- Header -->
            <h4 class="card-title text-center text-secondary mb-4">Account Login</h4>

            <!-- Error Message -->
            <div v-if="errmsg" class="alert alert-danger text-center">
              {{ errmsg }}
            </div>

            <!-- Form -->
            <form @submit.prevent="submit">
              <!-- Username Field -->
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="v$.username.$model"
                  :class="{ 'is-invalid': v$.username.$error }"
                />
                <div v-if="v$.username.$error" class="invalid-feedback">
                  <span v-if="v$.username.required.$invalid">{{ v$.username.required.$message }}</span>
                  <span v-if="v$.username.minLength.$invalid">{{ v$.username.minLength.$message }}</span>
                </div>
              </div>

              <!-- Password Field -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="v$.password.$model"
                  :class="{ 'is-invalid': v$.password.$error }"
                />
                <div v-if="v$.password.$error" class="invalid-feedback">
                  <span v-if="v$.password.required.$invalid">{{ v$.password.required.$message }}</span>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-outline-secondary w-100">Login</button>
            </form>

            <!-- Sign Up Link -->
            <p class="text-center my-2">
              Don't have an account? <router-link to="/register">Sign up</router-link>
            </p>
          </div>
        </div>
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
  const url = 'https://muda-node-server-1.onrender.com/user/signin'
  
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
          localStorage.setItem('authToken', res.data.token);
          router.push('/dashboard')

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
  