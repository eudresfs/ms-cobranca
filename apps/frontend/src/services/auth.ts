import { api } from './api'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export async function authenticate(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', payload)
  return data
}
