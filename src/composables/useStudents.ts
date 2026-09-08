import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { Student, StudentInput } from '../types/models'
import { StudentService } from '../services/StudentService'

const service = new StudentService()
const students = ref<Student[]>([])

export const refresh = async () => {
  students.value = await service.list()
}

export const useStudents = () => {
  const toast = useToast()

  const notifyError = (error: unknown) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error instanceof Error ? error.message : 'Ocurrió un error inesperado',
      life: 4000,
    })
  }

  const notifySuccess = (message: string) => {
    toast.add({ severity: 'success', summary: 'Éxito', detail: message, life: 3000 })
  }

  const addStudent = async (input: StudentInput) => {
    try {
      const { message } = await service.add(input)
      notifySuccess(message)
      await refresh()
    } catch (error) {
      notifyError(error)
    }
  }

  const getStudentById = async (id: number) => {
    try {
      return await service.findById(id)
    } catch (error) {
      notifyError(error)
      return undefined
    }
  }

  const updateStudent = async (id: number, input: StudentInput) => {
    try {
      const { message } = await service.update(id, input)
      notifySuccess(message)
      await refresh()
    } catch (error) {
      notifyError(error)
    }
  }

  const removeStudent = async (id: number) => {
    try {
      const { message } = await service.remove(id)
      notifySuccess(message)
      await refresh()
    } catch (error) {
      notifyError(error)
    }
  }

  return { students, addStudent, updateStudent, removeStudent, getStudentById }
}
