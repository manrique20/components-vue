import type { Student, StudentInput } from '../types/models'

const BASE_URL = import.meta.env.VITE_API_URL

export interface ApiResult<T> {
  data: T
  message: string
}

function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day) // ojo: month es 0-indexado
}

function formatDateOnly(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export class StudentService {
  // Hace el fetch, parsea el body SIEMPRE (éxito o error) y lanza un Error
  // con el mensaje real que manda la API cuando la respuesta no es ok.
  private async request(path: string, options?: RequestInit): Promise<{ data: any; message: string }> {
    const raw = await fetch(`${BASE_URL}${path}`, options)
    const body = await raw.json()
    if (!raw.ok) {
      throw new Error(body.message ?? raw.statusText)
    }
    return body
  }

  async list(): Promise<Student[]> {
    const { data } = await this.request('students')
    return data.map((student: any) => this.toStudent(student))
  }

  async findById(id: number): Promise<Student | undefined> {
    const { data } = await this.request(`students/${id}`)
    return this.toStudent(data)
  }

  async add(input: StudentInput): Promise<ApiResult<Student>> {
    const { data, message } = await this.request('students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.toApi(input)),
    })
    return { data: this.toStudent(data), message }
  }

  async update(id: number, input: StudentInput): Promise<ApiResult<Student>> {
    const { data, message } = await this.request(`students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.toApi(input)),
    })
    return { data: this.toStudent(data), message }
  }

  async remove(id: number): Promise<ApiResult<null>> {
    const { data, message } = await this.request(`students/${id}`, { method: 'DELETE' })
    return { data, message }
  }

  private toStudent(raw: any): Student {
    return {
      ...raw,
      fechaNacimiento: parseDateOnly(raw.fechaNacimiento),
      fechaInscripcion: parseDateOnly(raw.fechaInscripcion),
    }
  }

  private toApi(student: Student | StudentInput): any {
    return {
      ...student,
      fechaNacimiento: formatDateOnly(student.fechaNacimiento),
      fechaInscripcion: formatDateOnly(student.fechaInscripcion),
    }
  }
}
