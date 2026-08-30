import type { Course } from '../types/models'
import { coursesSeed } from '../data/courses.seed'


export class CourseService {
  private courses: Course[]

  constructor(seed: Course[] = coursesSeed) {
    this.courses = seed.map((c) => ({ ...c }))
  }

  list(): Course[] {
    return [...this.courses]
  }

  findById(id: number): Course | undefined {
    return this.courses.find((c) => c.id === id)
  }
}
