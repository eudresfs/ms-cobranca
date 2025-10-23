export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
}

export type StatusCobranca = 'aberta' | 'paga';

export interface Cobranca {
  id: string;
  cliente: Cliente;
  valor: number;
  vencimento: string;
  status: StatusCobranca;
}
