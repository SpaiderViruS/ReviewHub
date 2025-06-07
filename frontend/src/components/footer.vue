<template>
  <footer class="app-footer">
    <div class="footer-content">
      <span>© {{ currentYear }} Разработано — <strong>SpaiderViruS (Аллагулов Э.Р.)</strong></span>
      <div class="footer-links">
        <a href="https://t.me/spaidervirus" target="_blank">Telegram</a>
        <a href="mailto:emel07827@gmail.com">Почта</a>
        <router-link to="/privacy">Конфеденциальность</router-link>
        <router-link to="/about">О проекте</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 1.2rem 2rem;
  background: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
  color: var(--color-text);
  transition: background 0.3s ease, color 0.3s ease;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.95rem;
}

.footer-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.footer-links a,
.footer-links router-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover,
.footer-links router-link:hover {
  color: var(--color-accent, #e94560);
}
</style>
