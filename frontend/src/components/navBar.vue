<template>
  <nav class="nav">
    <div class="burger" @click="isMobileMenuOpen = !isMobileMenuOpen">
      <v-icon>mdi-menu</v-icon>
    </div>

    <!-- Меню для мобилок -->
    <div class="mobile-menu" v-if="isMobileMenuOpen">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/catalog" class="nav-link">Каталог</router-link>

      <router-link v-if="user?.user_role === 3" to="/admin/users" class="nav-link">Пользователи</router-link>
      <router-link v-if="user?.user_role === 3" to="/admin/add-item" class="nav-link">Добавить item</router-link>
      <router-link v-if="user?.user_role === 3" to="/admin/statistics" class="nav-link">Статистика</router-link>

      <router-link v-if="!user" to="/login" class="nav-link">Авторизация</router-link>
      <router-link v-else to="/profile" class="nav-link">{{ user.user_nickname }}</router-link>
      <v-btn v-if="user" @click="logout" class="exit-btn">Выйти</v-btn>
    </div>

    <!-- Основное меню -->
    <div class="nav-container">
    <router-link to="/" class="nav-link">Главная</router-link>
    <router-link to="/catalog" class="nav-link">Каталог</router-link>

    <div class="nav-link admin-dropdown" v-if="user?.user_role === 3">
      <span>Администрирование</span>
      <div class="admin-dropdown-menu">
        <router-link to="/admin/users">Пользователи</router-link>
        <router-link to="/admin/add-item">Добавить item</router-link>
        <router-link to="/admin/statistics">Статистика</router-link>
      </div>
    </div>
      
    <div class="mb-0 mt-auto ml-auto authorization" v-if="!user">
      <router-link to="/login" class="nav-link">Авторизация</router-link>
    </div>
    
    <div v-else class="mb-0 mt-auto ml-auto user-profile">      
      <div class="profile-box" @click="goToProfile">
        <v-icon :icon="'custom:userIcon'" class="mr-2"></v-icon>
        {{ user.user_nickname }}
      </div>
      <v-btn class="exit-btn" @click.stop="logout">Выйти</v-btn>
    </div>

    <div class="changeTheme">
      <v-btn @click="toggleTheme" :color="theme === 'dark' ? 'white' : 'black'" class="ml-auto" icon>
        <v-icon :icon="theme === 'dark' ? 'custom:SunIcon' : 'custom:moonIcon'" />
      </v-btn>
    </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '@/components/store/userStore';

const router = useRouter();
const { user, clearUser } = useUser();

const theme = ref('dark');
const isMobileMenuOpen = ref(false)
const isMobileDropdownOpen = ref(false);

onMounted(() => {
  const storedTheme = localStorage.getItem('theme') || 'dark';
  theme.value = storedTheme;
  document.documentElement.setAttribute('data-theme', theme.value);
})

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

const logout = () => {
  clearUser();
  router.push('/')
}

const goToProfile = () => {
  console.log(`profile`)
  // router.push('/profile')
}

const toggleMobileDropdown = () => {
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value;
}
</script>
<style scoped>
.nav {
  gap: 1.5rem;
  padding: 1.2rem 2rem;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.3s ease, color 0.3s ease;
}

.nav-link {
  font-size: 1.2rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: rgba(233, 69, 96, 0.1);
  color: #e94560;
}

.router-link-exact-active {
  background-color: rgba(233, 69, 96, 0.2);
  color: #e94560;
}

.authorization {
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  color: var(--color-text);

  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-profile:hover {
  background-color: #d6405c;
}

.profile-box {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.exit-btn {
  background-color: #f44336;
  color: white;
  margin-right: 5px;
}

.nav-container {
  display: flex;
  gap: 1rem;
}

.burger {
  display: none;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.admin-dropdown {
  position: relative;
}

.admin-dropdown > span {
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  border-radius: 8px;
}

.admin-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 10;
  min-width: 180px;
  flex-direction: column;
}

.admin-dropdown-menu a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  transition: background-color 0.2s;
}

.admin-dropdown-menu a:hover {
  background-color: rgba(233, 69, 96, 0.1);
  color: #e94560;
}

.admin-dropdown:hover .admin-dropdown-menu {
  display: flex;
}

.admin-dropdown-menu a {
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .nav-container {
    display: none;
  }

  .burger {
    display: block;
    margin-left: auto;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>