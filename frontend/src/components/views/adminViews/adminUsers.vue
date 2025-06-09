<template>
  <div class="users-admin-container">
    <div class="users-header">
      <h2>Управление пользователями</h2>
      <v-btn 
        color="var(--color-accent)" 
        @click="openAddUserDialog"
        class="add-user-btn"
      >
        <v-icon>mdi-plus</v-icon>
        Добавить пользователя
      </v-btn>
    </div>

    <div class="users-table-container">
      <v-text-field
        class="mb-3"
        v-model="search"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        hide-details
        dense
        outlined
        @input="handleSearch"
      />

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }} {{ user.surname }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge" :class="getRoleClass(user.id_role)">
                {{ getRoleName(user.id_role) }}
              </span>
            </td>
            <td class="actions-cell">
              <v-btn
                icon
                color="var(--color-accent)"
                @click="editUser(user)"
                class="action-btn"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                color="error"
                @click="confirmDelete(user)"
                class="action-btn"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- подтверждения/удаления -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Подтверждение удаления</v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить пользователя {{ userToDelete?.full_name }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Отмена</v-btn>
          <v-btn color="error" @click="deleteUser">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <user-edit-dialog
      v-model="editDialog"
      :user="editedUser"
      @save="handleSave"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
// import UserEditDialog from '@/components/admin/UserEditDialog.vue';

const $api = inject('$api');

const users = ref([]);

const deleteDialog = ref(false);
const editDialog = ref(false);
const userToDelete = ref(null);
const editedUser = ref(null);
const search = ref(null);

const openAddUserDialog = () => {
  editedUser.value = null;
  editDialog.value = true;
};

const editUser = (user) => {
  editedUser.value = { ...user };
  editDialog.value = true;
};

const confirmDelete = (user) => {
  userToDelete.value = user;
  deleteDialog.value = true;
};

const deleteUser = () => {
  users.value = users.value.filter(u => u.id !== userToDelete.value.id);
  deleteDialog.value = false;
};

const filteredUsers = computed(() => {
  if (!search.value) return users.value;
  
  const query = search.value.toLowerCase().trim();
  return users.value.filter(user => {
  const fullName = `${user.name} ${user.surname}`.toLowerCase();
  return (
    user.id.toString().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    fullName.includes(query)
  );
});
});

const handleSave = (userData) => {
  if (userData.id) {
    // Обновление существующего пользователя
    const index = users.value.findIndex(u => u.id === userData.id);
    if (index !== -1) {
      users.value[index] = userData;
    }
  } else {
    // Добавление нового пользователя
    const newId = Math.max(...users.value.map(u => u.id)) + 1;
    users.value.push({ ...userData, id: newId });
  }
  editDialog.value = false;
};

const getRoleName = (role) => {
  const roles = {
    1: 'Пользователь',
    2: 'Модератор',
    3: 'Администратор'
  };
  return roles[role] || 'Неизвестно';
};

const getRoleClass = (role) => {
  return {
    'role-user': role === 1,
    'role-moderator': role === 2,
    'role-admin': role === 3
  };
};



onMounted(async () => {
  const allUsers = await $api.get('/users/all');
  users.value = allUsers.data;
})
</script>

<style scoped>
.users-admin-container {
  padding: 20px;
  background: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-user-btn {
  background-color: var(--color-accent);
  color: var(--color-button-text);
}

.add-user-btn:hover {
  background-color: var(--color-accent-hover);
}

.users-table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-background-mute);
  border-radius: 8px;
  overflow: hidden;
}

.users-table th,
.users-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.users-table th {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
  font-weight: 600;
}

.users-table tr:hover {
  background-color: rgba(233, 69, 96, 0.05);
}

.actions-cell {
  /* display: flex; */
  /*gap: 8px;*/
}

.action-btn {
  margin: 0;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-user {
  background-color: rgba(66, 165, 245, 0.2);
  color: #42a5f5;
}

.role-moderator {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ff9800;
}

.role-admin {
  background-color: rgba(233, 69, 96, 0.2);
  color: #e94560;
}

/* Адаптивность */
@media (max-width: 768px) {
  .users-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .users-table th, 
  .users-table td {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
}
</style>