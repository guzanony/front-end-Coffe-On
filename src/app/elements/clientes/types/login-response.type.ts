export type LoginResponse = {
  token: string;
  name: string;
  nomeCompleto: string;
  clienteId: number;
}

export type LoginUserResponse = {
  username: string;
  password: string;
  token: string;
}
