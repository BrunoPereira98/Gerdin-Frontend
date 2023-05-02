export interface User {
  id?: string;
  nome: string;
  login: string;
  sid: string;
  perfil: string;
  escopoOperacoes: string[];
  escopos: string[];
  perfis: string[];
  operacoes: string[];
}
