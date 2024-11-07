import { FormControl, FormArray, FormGroup } from '@angular/forms';

export interface SignUpFormModel {
  nomeCompleto: FormControl<string | null>;
  dataNascimento: FormControl<string | null>;
  genero: FormControl<string | null>;
  password: FormControl<string | null>;
  email: FormControl<string | null>;
  cpf: FormControl<string | null>;
  cepFaturamento: FormControl<string | null>;
  logradouroFaturamento: FormControl<string | null>;
  numeroFaturamento: FormControl<string | null>;
  complementoFaturamento: FormControl<string | null>;
  bairroFaturamento: FormControl<string | null>;
  cidadeFaturamento: FormControl<string | null>;
  ufFaturamento: FormControl<string | null>;
  enderecos: FormArray<FormGroup<EnderecoEntregaFormModel>>;
}

export interface EnderecoEntregaFormModel {
  cep: FormControl<string | null>;
  logradouro: FormControl<string | null>;
  numero: FormControl<string | null>;
  complemento: FormControl<string | null>;
  bairro: FormControl<string | null>;
  cidade: FormControl<string | null>;
  uf: FormControl<string | null>;
  isDefault: FormControl<boolean | null>;
}

export interface Address {
id: number | null;
cep: string | null;
logradouro: string | null;
numero: string | null;
complemento: string | null;
bairro: string | null;
cidade: string | null;
uf: string | null;
}

export interface EditProfileFormModel {
  nomeCompleto: string | null;
  dataNascimento: string | number | Date;
  genero: string | null;
  password: string | null;
  email: string | null;
  cpf: string | null;
  cepFaturamento: string | null;
  logradouroFaturamento: string | null;
  numeroFaturamento: string | null;
  complementoFaturamento: string | null;
  bairroFaturamento: string | null;
  cidadeFaturamento: string | null;
  ufFaturamento: string | null;
  enderecos: Array<EnderecoEntregaFormModel>;
}
