<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import StudentFormDialog from './StudentFormDialog.vue'
import { useStudents, refresh } from '../composables/useStudents'
import { useCourses } from '../composables/useCourses'
import type { Student, StudentInput } from '../types/models'

const { students, addStudent, updateStudent, removeStudent } = useStudents()
const { courses, findCourseName } = useCourses()

const dialogVisible = ref(false)
const dialogMode = ref<'create' | 'edit' | 'delete'>('create')
const selectedStudent = ref<Student | null>(null)

const openCreate = () => {
  selectedStudent.value = null
  dialogMode.value = 'create'
  dialogVisible.value = true
}

const openEdit = (student: Student) => {
  selectedStudent.value = student
  dialogMode.value = 'edit'
  dialogVisible.value = true
}

const openDelete = (student: Student) => {
  selectedStudent.value = student
  dialogMode.value = 'delete'
  dialogVisible.value = true
}

const onSave = (input: StudentInput, id: number | null) => {

  if (id === null) addStudent(input)
  else updateStudent(id, input)
}

const onConfirmDelete = (id: number) => {
  removeStudent(id)
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
}
onMounted(() => {
  refresh()
})
</script>

<template>
  <div class="students-panel">
    <div class="toolbar">
      <h2>Estudiantes</h2>
      <Button label="Nuevo estudiante" icon="pi pi-plus" @click="openCreate" />
    </div>

    <DataTable :value="students" dataKey="id" paginator :rows="5" tableStyle="min-width: 42rem">
      <Column header="Estudiante">
        <template #body="{ data }">
          <div class="student-cell">
            <Avatar :image="data.avatar" shape="circle" size="large" />
            <div>
              <div class="student-name">{{ data.nombre }}</div>
              <div class="student-email">{{ data.email }}</div>
            </div>
          </div>
        </template>
      </Column>
      <Column header="Curso">
        <template #body="{ data }">{{ findCourseName(data.cursoId) }}</template>
      </Column>
      <Column header="Estado">
        <template #body="{ data }">
          <Tag :value="data.estado" :severity="data.estado === 'activo' ? 'success' : 'danger'" />
        </template>
      </Column>
      <Column header="Inscripción">
        <template #body="{ data }">{{ formatDate(data.fechaInscripcion) }}</template>
      </Column>
      <Column header="Acciones" style="width: 8rem">
        <template #body="{ data }">
          <div class="actions">
            <Button icon="pi pi-pencil" severity="secondary" text rounded @click="openEdit(data)" aria-label="Editar" />
            <Button icon="pi pi-trash" severity="danger" text rounded @click="openDelete(data)" aria-label="Eliminar" />
          </div>
        </template>
      </Column>
    </DataTable>

    <StudentFormDialog
      v-model:visible="dialogVisible"
      :mode="dialogMode"
      :student="selectedStudent"
      :courses="courses"
      @save="onSave"
      @confirm-delete="onConfirmDelete"
    />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.student-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.student-name {
  font-weight: 600;
}
.student-email {
  font-size: 0.85rem;
  color: var(--p-text-muted-color);
}
.actions {
  display: flex;
  gap: 0.25rem;
}
</style>
