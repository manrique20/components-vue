<script setup lang="ts">
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import { useStudents } from '../composables/useStudents'
import { useCourses } from '../composables/useCourses'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'navigate', tab: '0' | '1'): void
}>()

const { students } = useStudents()
const { courses } = useCourses()

const go = (tab: '0' | '1') => {
  emit('navigate', tab)
  emit('update:visible', false)
}
</script>

<template>
  <Drawer :visible="props.visible" @update:visible="(v: boolean) => emit('update:visible', v)" header="Menú">
    <nav class="drawer-nav">
      <Button label="Estudiantes" icon="pi pi-users" text class="drawer-link" @click="go('0')" />
      <Button label="Cursos" icon="pi pi-book" text class="drawer-link" @click="go('1')" />
    </nav>

    <div class="drawer-summary">
      <h3>Resumen</h3>
      <p><i class="pi pi-users"></i> {{ students.length }} estudiantes registrados</p>
      <p><i class="pi pi-book"></i> {{ courses.length }} cursos disponibles</p>
    </div>

    <div class="drawer-about">
      <h3>Acerca de</h3>
      <p>
        Hecho con Vue 3 + PrimeVue para la actividad numero 4.
      </p>
    </div>
  </Drawer>
</template>

<style scoped>
.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}
.drawer-link {
  justify-content: flex-start;
}
.drawer-summary,
.drawer-about {
  padding-top: 1rem;
  border-top: 1px solid var(--p-content-border-color);
  margin-top: 1rem;
}
.drawer-summary h3,
.drawer-about h3 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}
.drawer-summary p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
}
.drawer-about p {
  font-size: 0.85rem;
  color: var(--p-text-muted-color);
  line-height: 1.4;
}
</style>
