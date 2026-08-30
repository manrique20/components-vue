export type StudentStatus = 'activo' | 'inactivo'

export interface Student {
  id: number
  nombre: string
  email: string
  telefono: number
  fechaNacimiento: Date
  cursoId: number
  estado: StudentStatus
  fechaInscripcion: Date
  avatar: string
}

export type StudentInput = Omit<Student, 'id'>

export interface Course {
  id: number
  nombre: string
  instructor: string
  creditos: number
  imagen: string
  area: string
  descripcion: string
  requisitos: string
  horario: string
}
