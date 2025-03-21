<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar Section -->
      <div class="col-md-3">
        <div class="card shadow-sm border-0 rounded-lg">
          <div class="card-body text-center">
            <h4 class="dashboard-header">User Dashboard</h4>
            <hr />
            <button @click="logout" class="btn btn-outline-danger w-100 mb-3">Logout</button>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0">
                <a href="#" class="text-decoration-none text-dark fw-bold">📩 View Messages</a>
              </li>
              <li class="list-group-item border-0">
                <a href="#" class="text-decoration-none text-dark fw-bold">⚙ Edit Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Main Content Section -->
      <div class="col-md-9">
        <div class="card shadow-sm border-0 rounded-lg">
          <div class="card-body">
            <h3 class="card-title text-primary">Welcome, {{ user.username }}</h3>
            <p>Your unique link: 
              <span class="text-info fw-bold">https://tell-me-seven.vercel.app/sendmsg/{{ user.username }}</span>
            </p>
            <hr />
            <h4 class="mb-3">Your Messages</h4>
            <div v-if="user.messages.length === 0" class="alert alert-info text-center fw-bold py-3">
              No messages yet! 📭
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item py-3 border rounded mb-2 shadow-sm" v-for="message in user.messages" :key="message.id">
                <p class="mb-1">{{ message.content }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Styling */
.dashboard-header {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.card {
  border-radius: 12px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.list-group-item {
  font-size: 16px;
  color: #495057;
  transition: background 0.3s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

button {
  transition: all 0.3s ease;
  font-weight: bold;
}

button:hover {
  background-color: #dc3545;
  color: white;
}
</style>
  
  <style scoped>
  /* Custom Styling */
  .dashboard-header {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .card {
    border-radius: 10px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .list-group-item {
    font-size: 16px;
    color: #495057;
  }
  
  .list-group-item:hover {
    background-color: #f1f1f1;
  }
  
  button {
    transition: all 0.3s ease;
  }
  
  button:hover {
    background-color: #f8f9fa;
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
  