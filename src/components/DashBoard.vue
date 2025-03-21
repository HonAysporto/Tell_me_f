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
  
        <!-- Main Content Section -->
        <div class="col-md-9">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title">Welcome, {{ user.username }}</h3>
              <p>Your unique link: <span class="text-info">https://tell-me-seven.vercel.app/sendmsg/{{user.username}}</span></p>
              <hr />
              <h4>Your Messages</h4>
              <div class="alert alert-info" v-if="user.messages.length === 0">No messages yet!</div>
              <ul class="list-group">
                <li class="list-group-item" v-for="message in user.messages" :key="message.id">
                  {{ message.content }}
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
  