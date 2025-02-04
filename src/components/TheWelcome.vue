<template>
  <div class="bg-light">
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">Tell_me</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="py-5 text-center bg-primary text-white">
      <div class="container">
        <!-- Animated Heading -->
        <h1 class="display-4 fw-bold animate__animated animate__fadeInDown">Welcome to Tell_me</h1>
        <p class="lead">
          Share your unique link to receive anonymous messages from friends and
          strangers!
        </p>
      </div>
    </header>

    <!-- Card Section -->
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card shadow-sm">
              <div class="card-body text-center">
                <h2 class="card-title fw-bold mb-3">Generate Your Unique Link</h2>
                <p class="text-muted mb-4">
                  Click the button below to get your anonymous messaging link!
                </p>
                <button
                  @click="generateLink"
                  class="btn btn-primary btn-lg mb-3"
                >
                  Generate My Link
                </button>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 position-fixed bottom-0 w-100">
      <div class="container text-center">
        <p class="mb-0">© 2025 TazerH. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


  const route = useRouter()


  const generateLink = () => {
    route.push('/register');
  }

</script>





<style>

</style>
