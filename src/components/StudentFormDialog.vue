<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Message from 'primevue/message'
import Button from 'primevue/button'
import type { Course, Student, StudentInput, StudentStatus } from '../types/models'

type Mode = 'create' | 'edit' | 'delete'

const props = defineProps<{
  visible: boolean
  mode: Mode
  student: Student | null
  courses: Course[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save', input: StudentInput, id: number | null): void
  (e: 'confirm-delete', id: number): void
}>()

const estadoOptions: { label: string; value: StudentStatus }[] = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]

const emptyForm = (): StudentInput => ({
  nombre: '',
  email: '',
  telefono: undefined as unknown as number,
  fechaNacimiento: undefined as unknown as Date,
  cursoId: undefined as unknown as number,
  estado: 'activo',
  fechaInscripcion: new Date(),
  avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
})

const form = reactive<StudentInput>(emptyForm())
const touched = reactive({ nombre: false, email: false, telefono: false, fechaNacimiento: false, cursoId: false })

watch(
  () => [props.visible, props.mode, props.student],
  () => {
    if (props.visible && (props.mode === 'create' || props.mode === 'edit')) {
      Object.assign(form, props.student ? { ...props.student } : emptyForm())
      touched.nombre = touched.email = touched.telefono = touched.fechaNacimiento = touched.cursoId = false
    }
  },
  { immediate: true },
)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => ({
  nombre: form.nombre.trim().length < 3 ? 'El nombre debe tener al menos 3 caracteres.' : '',
  email: !emailRegex.test(form.email) ? 'Ingresa un correo electrónico válido.' : '',
  telefono: !form.telefono || String(form.telefono).length < 7 ? 'Ingresa un teléfono válido (mín. 7 dígitos).' : '',
  fechaNacimiento: !form.fechaNacimiento ? 'La fecha de nacimiento es obligatoria.' : '',
  cursoId: !form.cursoId ? 'Selecciona un curso.' : '',
}))

const isFormValid = computed(() => Object.values(errors.value).every((e) => e === ''))

function close() {
  emit('update:visible', false)
}

function submit() {
  touched.nombre = touched.email = touched.telefono = touched.fechaNacimiento = touched.cursoId = true
  if (!isFormValid.value) return
  emit('save', { ...form }, props.mode === 'edit' ? props.student!.id : null)
  close()
}

function doDelete() {
  if (props.student) emit('confirm-delete', props.student.id)
  close()
}

const dialogTitle = computed(() => {
  if (props.mode === 'create') return 'Nuevo estudiante'
  if (props.mode === 'edit') return 'Editar estudiante'
  return 'Confirmar eliminación'
})

</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="close"
    modal
    :header="dialogTitle"
    :style="{ width: '28rem' }"
  >
    <!-- Modo formulario: crear o editar -->
    <form v-if="mode === 'create' || mode === 'edit'" class="student-form" @submit.prevent="submit">
      <div class="field">
        <label for="nombre">Nombre completo</label>
        <InputText
          id="nombre"
          v-model="form.nombre"
          :invalid="touched.nombre && !!errors.nombre"
          @blur="touched.nombre = true"
        />
        <Message v-if="touched.nombre && errors.nombre" severity="error" size="small" variant="simple">
          {{ errors.nombre }}
        </Message>
      </div>

      <div class="field">
        <label for="email">Correo electrónico</label>
        <InputText
          id="email"
          v-model="form.email"
          :invalid="touched.email && !!errors.email"
          @blur="touched.email = true"
        />
        <Message v-if="touched.email && errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>
      </div>

      <div class="field">
        <label for="telefono">Teléfono</label>
        <InputNumber
          id="telefono"
          v-model="form.telefono"
          :useGrouping="false"
          :invalid="touched.telefono && !!errors.telefono"
          @blur="touched.telefono = true"
        />
        <Message v-if="touched.telefono && errors.telefono" severity="error" size="small" variant="simple">
          {{ errors.telefono }}
        </Message>
      </div>

      <div class="field">
        <label for="fechaNacimiento">Fecha de nacimiento</label>
        <DatePicker
          id="fechaNacimiento"
          v-model="form.fechaNacimiento"
          dateFormat="dd/mm/yy"
          showIcon
          :invalid="touched.fechaNacimiento && !!errors.fechaNacimiento"
          @blur="touched.fechaNacimiento = true"
        />
        <Message v-if="touched.fechaNacimiento && errors.fechaNacimiento" severity="error" size="small" variant="simple">
          {{ errors.fechaNacimiento }}
        </Message>
      </div>

      <div class="field">
        <label for="curso">Curso</label>
        <Select
          id="curso"
          v-model="form.cursoId"
          :options="courses"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Selecciona un curso"
          :invalid="touched.cursoId && !!errors.cursoId"
          @blur="touched.cursoId = true"
        />
        <Message v-if="touched.cursoId && errors.cursoId" severity="error" size="small" variant="simple">
          {{ errors.cursoId }}
        </Message>
      </div>

      <div class="field">
        <label for="estado">Estado</label>
        <Select id="estado" v-model="form.estado" :options="estadoOptions" optionLabel="label" optionValue="value" />
      </div>
    </form>

    <!-- Modo confirmación de borrado: mismo Dialog, contenido distinto -->
    <div v-else class="delete-confirm">
      <i class="pi pi-exclamation-triangle" style="font-size: 1.75rem; color: var(--p-red-500)"></i>
      <p>
        ¿Seguro que deseas eliminar a <strong>{{ student?.nombre }}</strong>? Esta acción no se puede deshacer.
      </p>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" text @click="close" />
      <Button v-if="mode === 'create' || mode === 'edit'" label="Guardar" icon="pi pi-check" @click="submit" />
      <Button v-else label="Eliminar" icon="pi pi-trash" severity="danger" @click="doDelete" />
    </template>
  </Dialog>
</template>

<style scoped>
.student-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field label {
  font-weight: 600;
  font-size: 0.9rem;
}
.delete-confirm {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
</style>
