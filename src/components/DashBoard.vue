<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar Section -->
      <div class="col-md-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="text-center">User Dashboard</h4>
            <hr />
            <div class="text-center">
              <button @click="logout" class="btn btn-outline-danger mb-3">Logout</button>
            </div>
            <ul class="list-group">
              <li class="list-group-item">
                <a href="#" class="text-decoration-none">View Messages</a>
              </li>
              <li class="list-group-item">
                <a href="#" class="text-decoration-none">Edit Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Main Chat Section -->
      <div class="col-md-9">
        <div class="card shadow-sm chat-container">
          <div class="card-body chat-box p-3" id="chatBox">
            <h3 class="card-title text-center">Anonymous Messages</h3>
            <div class="messages-container">
              <div v-for="(message, index) in messages" :key="index" class="message-bubble">
                <p class="message-text">{{ message.text }}</p>
                <span class="message-time">{{ message.timestamp }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <input type="text" class="form-control" v-model="newMessage" placeholder="Type a message..." />
            <button class="btn btn-primary mt-2" @click="sendMessage">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat-container {
  height: 500px;
  display: flex;
  flex-direction: column;
}
.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
}
.messages-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.message-bubble {
  background: #007bff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  align-self: flex-start;
}
.message-text {
  margin: 0;
  font-size: 14px;
}
.message-time {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 5px;
  display: block;
  text-align: right;
}
</style>


<script setup>

let messages = []


import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = ref({ username: '', messages: [] });
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('authToken');

  if (token) {
    axios.get('https://muda-node-server-1.onrender.com/user/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      user.value = response.data; // Get user data from the response
      console.log(response);
    })
    .catch(error => {
      console.error('Error fetching dashboard data:', error);
    });
  } else {
    // Redirect to login if no token
    router.push('/signin');
  }
});

  const logout = () => {
      localStorage.removeItem('authToken')
      router.push('/signin')
  }


</script>
  