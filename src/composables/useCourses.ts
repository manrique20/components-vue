import { ref } from 'vue'
import type { Course } from '../types/models'
import { CourseService } from '../services/CourseService'

const service = new CourseService()
const courses = ref<Course[]>(service.list())

export const useCourses = () => {
  const findCourseName = (id: number): string => {
    return service.findById(id)?.nombre ?? 'Sin curso'
  }

  return { courses, findCourseName }
}
