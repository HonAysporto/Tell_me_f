<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <!-- Card Wrapper -->
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <!-- Header -->
            <h3 class="card-title text-center fw-bold mb-4 text-primary">
              Send {{ formattedId }} a Message
            </h3>
            <p class="text-center text-muted mb-4">
              Write your anonymous message below and click send!
            </p>

            <!-- Form -->
            <form @submit.prevent="submitMessage">
              <!-- Message Textarea -->
              <div class="mb-3">
                <label for="message" class="form-label fw-semibold">
                  Your Message
                </label>
                <textarea
                  v-model="v$.message.$model"
                  id="message"
                  class="form-control"
                  rows="5"
                  placeholder="Type your message here..."
                  :class="{ 'is-invalid': v$.message.$invalid && v$.message.$dirty }"
                  :disabled="loading"
                ></textarea>
                <div v-if="v$.message.$model">
                  <span v-if="v$.message.$invalid && v$.message.$dirty" class="invalid-feedback">
                    {{ v$.message.$model.length === 0 ? 'Message is required.' : 'Message must not be more than 100 characters.' }}
                  </span>
                </div>
              </div>

              <!-- Send Button with Loader -->
              <div class="d-grid">
                <button class="btn btn-primary btn-lg" :disabled="loading">
                  <span v-if="loading">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Sending...
                  </span>
                  <span v-else>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required, maxLength } from '@vuelidate/validators';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

onMounted(() => {
  console.log(route.params.id);
});

const userForm = reactive({
  message: '',
});

const loading = ref(false); // Loading state

const rules = {
  message: {
    required: helpers.withMessage('Message is required.', required),
    maxLength: helpers.withMessage('Message must not be more than 100 characters.', maxLength(100)),
  },
};

const v$ = useVuelidate(rules, userForm);
const formattedId = route.params.id.charAt(0).toUpperCase() + route.params.id.slice(1);
const url = `https://muda-node-server-1.onrender.com/user/sendmsg/${formattedId}`;

const submitMessage = async () => {
  v$.value.$touch();
  if (v$.value.$error) {
    toast.error("There is an error in your message. Please fix it.");
    return;
  }

  loading.value = true; // Start loading

  try {
    const res = await axios.post(url, userForm);
    console.log(res);

    if (res.data.status) {
      toast.success(res.data.message, { timeout: 3000 });
      userForm.message = '';
      v$.value.$reset(); // Reset validation state
      router.push('/');
    } else {
      toast.error(res.data.message, { timeout: 3000 });
    }
  } catch (error) {
    toast.error("An error occurred while sending the message.");
    console.error(error);
  } finally {
    loading.value = false; // Stop loading
  }
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
.card {
  border-radius: 15px;
}
.btn-primary {
  background: linear-gradient(90deg, #007bff, #0056b3);
  border: none;
}
.btn-primary:hover {
  background: linear-gradient(90deg, #0056b3, #003d80);
}
.spinner-border {
  vertical-align: middle;
}
</style>
