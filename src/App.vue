<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import AppDrawer from './components/AppDrawer.vue'
import StudentsPanel from './components/StudentsPanel.vue'
import CoursesPanel from './components/CoursesPanel.vue'

const drawerVisible = ref(false)
const activeTab = ref('0')

function onNavigate(tab: '0' | '1') {
  activeTab.value = tab
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <Button icon="pi pi-bars" text severity="secondary" aria-label="Menú" @click="drawerVisible = true" />
      <h1>Gestión de Estudiantes y Cursos</h1>
    </header>

    <AppDrawer v-model:visible="drawerVisible" @navigate="onNavigate" />

    <main class="app-main">
      <Tabs v-model:value="activeTab">
        <TabList>
          <Tab value="0"><i class="pi pi-users"></i> Estudiantes</Tab>
          <Tab value="1"><i class="pi pi-book"></i> Cursos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <StudentsPanel />
          </TabPanel>
          <TabPanel value="1">
            <CoursesPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>

    <footer class="app-footer">
      Actividad 4 — Desarrollo de Software Basado en Componentes · Vue 3 + PrimeVue
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--p-content-border-color);
}
.app-header h1 {
  font-size: 1.25rem;
  margin: 0;
}
.app-main {
  flex: 1;
  padding: 1.5rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
.app-footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.8rem;
  color: var(--p-text-muted-color);
  border-top: 1px solid var(--p-content-border-color);
}
</style>
