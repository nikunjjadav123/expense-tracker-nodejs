<template>
  <footer class="bg-dark text-center text-white py-3 mt-5">
    <p class="mb-1">&copy; {{ currentYear }} Expense Tracker. All Rights Reserved.</p>
    <router-link to="/privacy-policy" class="text-white me-3">Privacy Policy</router-link>
    <router-link to="/about" class="text-white me-3">About</router-link>
    <router-link to="/contact-us" class="text-white">Contact Us</router-link>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>