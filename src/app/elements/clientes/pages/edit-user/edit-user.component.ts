import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditProfileFormModel, EnderecoEntregaFormModel, SignUpFormModel } from '../../models/singnup-form.model';
import { DefaultLoginLayoutComponent } from '../../../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../../../components/primary-input/primary-input.component';
import { UserService } from '../../services/user/user.service';
import { ViaCepService } from '../../services/cep-api/via-cep.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public signUpForm!: FormGroup<EnderecoEntregaFormModel>;
  public editProfileForm!: FormGroup;
  public enderecos!: FormArray<FormGroup<EnderecoEntregaFormModel>>;
  public name: string | null = '';
  public cep: string = '';

  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _toastService = inject(ToastrService);
  constructor(private readonly _viaCep: ViaCepService, private readonly _http: HttpClient) { }

  ngOnInit(): void {
    this.enderecos = new FormArray<FormGroup<EnderecoEntregaFormModel>>([]);
    this.editProfileForm = new FormGroup({
      nomeCompleto: new FormControl<string | null>('', Validators.required),
      dataNascimento: new FormControl<string | null>('', Validators.required),
      genero: new FormControl<string | null>('', Validators.required),
      email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      cpf: new FormControl<string | null>('', Validators.required),
      cepFaturamento: new FormControl<string | null>('', Validators.required),
      logradouroFaturamento: new FormControl<string | null>('', Validators.required),
      numeroFaturamento: new FormControl<string | null>('', Validators.required),
      complementoFaturamento: new FormControl<string | null>(''),
      bairroFaturamento: new FormControl<string | null>('', Validators.required),
      cidadeFaturamento: new FormControl<string | null>('', Validators.required),
      ufFaturamento: new FormControl<string | null>('', Validators.required),
      enderecos: this.enderecos as unknown as FormArray
    });

    this.name = sessionStorage.getItem('nomeCompleto');
    if (this.name) {
      this._userService.getUser(this.name).subscribe(profile => {
        console.log(profile);

        if (profile.dataNascimento && typeof profile.dataNascimento === 'string') {
          const [ano, mes, dia] = profile.dataNascimento.split('-');
          if (ano && mes && dia) {
            profile.dataNascimento = `${dia}/${mes}/${ano}`;
          } else {
            console.warn('Data de nascimento inválida:', profile.dataNascimento);
            profile.dataNascimento = '';
          }
        } else {
          console.warn('Data de nascimento está nula ou no formato inesperado:', profile.dataNascimento);
          profile.dataNascimento = '';
        }

        if (profile.enderecos && Array.isArray(profile.enderecos)) {
          profile.enderecos.forEach(endereco => {
            this.enderecos.push(new FormGroup({
              cep: new FormControl(endereco.cep, Validators.required),
              logradouro: new FormControl(endereco.logradouro, Validators.required),
              numero: new FormControl(endereco.numero, Validators.required),
              complemento: new FormControl(endereco.complemento),
              bairro: new FormControl(endereco.bairro, Validators.required),
              cidade: new FormControl(endereco.cidade, Validators.required),
              uf: new FormControl(endereco.uf, Validators.required),
              isDefault: new FormControl<boolean | null>(endereco.isDefault)
            }));
          });
        } else {
          console.warn('Endereços estão nulos ou não são uma lista:', profile.enderecos);
        }

        this.editProfileForm.patchValue(profile);
      });
    } else {
      console.log('Nome completo não encontrado na sessionStorage');
    }
  }

  public getCep(cep: string, type: 'faturamento' | number): void {
    const cepLimpo = cep.replace(/\D/g, '');

    this._http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
      next: (resp: any) => {
        console.log(resp)
        if (resp.erro) {
          this._toastService.error('CEP não encontrado');
        } else {
          const enderecoResp = {
            logradouro: resp.logradouro,
            bairro: resp.bairro,
            cidade: resp.localidade,
            uf: resp.uf,
          };

          if (type === 'faturamento') {
            this.editProfileForm.patchValue({
              logradouroFaturamento: enderecoResp.logradouro,
              bairroFaturamento: enderecoResp.bairro,
              cidadeFaturamento: enderecoResp.cidade,
              ufFaturamento: enderecoResp.uf,
            });
          } else {
            const enderecoForm = this.enderecos.at(type) as FormGroup;
            enderecoForm.patchValue(enderecoResp);
          }
        }
      },
      error: () => {
        this._toastService.error('Erro ao buscar o CEP. Tente novamente.');
      }
    });
  }

  public checkCep(event: any, type: 'faturamento' | number): void {
    const cep = event.target.value.trim();
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length === 8) {
      this.getCep(cepLimpo, type);
    } else {
      this._toastService.error('CEP deve ter 8 dígitos.');
    }
  }

  public addEndereco(): void {
    this.enderecos.push(new FormGroup<EnderecoEntregaFormModel>({
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      isDefault: new FormControl<boolean | null>(false)
    }));
  }

  public removeEndereco(index: number): void {
    this.enderecos.removeAt(index);
  }

  public saveProfile(): void {
    if (this.editProfileForm.valid) {
      const profile = { ...this.editProfileForm.value };

      if (profile.dataNascimento && typeof profile.dataNascimento === 'string') {
        const partesData = profile.dataNascimento.split('/');
        if (partesData.length === 3) {
          const [dia, mes, ano] = partesData;
          profile.dataNascimento = `${ano}-${mes}-${dia}`;
        } else {
          console.warn('Formato de dataNascimento inválido:', profile.dataNascimento);
          profile.dataNascimento = null;
        }
      }

      this._userService.updateUser(this.name, profile).subscribe(
        (resp) => {
          this._toastService.success('Perfil atualizado com sucesso');
          this._router.navigate(['/customer']);
        },
        (error) => this._toastService.error('Erro ao atualizar o perfil. Tente novamente mais tarde')
      );
    } else {
      this._toastService.error('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }



  public setDefaultEndereco(index: number): void {
    this.enderecos.controls.forEach((control, i) => {
      control.get('isDefault')?.setValue(i === index);
    });
  }

  public cancel(): void {
    this._router.navigate(['/customer']);
  }
}
