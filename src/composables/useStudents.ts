import { ref } from 'vue'
import type { Student, StudentInput } from '../types/models'
import { StudentService } from '../services/StudentService'

const service = new StudentService()
const students = ref<Student[]>(service.list())

const refresh = () => {
  students.value = service.list()
}

export const useStudents = () => {
  const addStudent = (input: StudentInput) => {
    service.add(input)
    refresh()
  }

  const updateStudent = (id: number, input: StudentInput) => {
    service.update(id, input)
    refresh()
  }

  const removeStudent = (id: number) => {
    service.remove(id)
    refresh()
  }

  return { students, addStudent, updateStudent, removeStudent }
}
