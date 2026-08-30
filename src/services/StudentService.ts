import type { Student, StudentInput } from '../types/models'
import { studentsSeed } from '../data/students.seed'


export class StudentService {
  private students: Student[]
  private nextId: number

  constructor(seed: Student[] = studentsSeed) {
    this.students = seed.map((s) => ({ ...s }))
    this.nextId = this.students.reduce((max, s) => Math.max(max, s.id), 0) + 1
  }

  list(): Student[] {
    return [...this.students]
  }

  findById(id: number): Student | undefined {
    return this.students.find((s) => s.id === id)
  }

  add(input: StudentInput): Student {
    const created: Student = { ...input, id: this.nextId++ }
    this.students.push(created)
    return created
  }

  update(id: number, input: StudentInput): Student | undefined {
    const index = this.students.findIndex((s) => s.id === id)
    if (index === -1) return undefined
    const updated: Student = { ...input, id }
    this.students.splice(index, 1, updated)
    return updated
  }

  remove(id: number): boolean {
    const index = this.students.findIndex((s) => s.id === id)
    if (index === -1) return false
    this.students.splice(index, 1)
    return true
  }
}
