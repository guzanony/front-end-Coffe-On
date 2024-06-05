import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { EditProfileFormModel, EnderecoEntregaFormModel } from '../../models/singnup-form.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public editProfileForm!: FormGroup<EditProfileFormModel>;
  public enderecos!: FormArray<FormGroup<EnderecoEntregaFormModel>>;

  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _toastService = inject(ToastrService);

  ngOnInit(): void {
    this.enderecos = new FormArray<FormGroup<EnderecoEntregaFormModel>>([]);
    this.editProfileForm = new FormGroup<EditProfileFormModel>({
      nomeCompleto: new FormControl<string | null>('', [Validators.required]),
      dataNascimento: new FormControl<string | null>('', [Validators.required]),
      genero: new FormControl<string | null>('', [Validators.required]),
      email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      cpf: new FormControl<string | null>('', [Validators.required]),
      cepFaturamento: new FormControl<string | null>('', [Validators.required]),
      logradouroFaturamento: new FormControl<string | null>('', [Validators.required]),
      numeroFaturamento: new FormControl<string | null>('', [Validators.required]),
      complementoFaturamento: new FormControl<string | null>(''),
      bairroFaturamento: new FormControl<string | null>('', [Validators.required]),
      cidadeFaturamento: new FormControl<string | null>('', [Validators.required]),
      ufFaturamento: new FormControl<string | null>('', [Validators.required]),
      password: new FormControl<string | null>('', [Validators.required]),
      enderecos: this.enderecos
    });

    this._userService.getUser().subscribe(profile => {
      this.editProfileForm.patchValue(profile);
      profile.enderecosEntrega.forEach((endereco: any) => {
        this.enderecos.push(new FormGroup<EnderecoEntregaFormModel>({
          cep: new FormControl(endereco.cep, [Validators.required]),
          logradouro: new FormControl(endereco.logradouro, [Validators.required]),
          numero: new FormControl(endereco.numero, [Validators.required]),
          complemento: new FormControl(endereco.complemento),
          bairro: new FormControl(endereco.bairro, [Validators.required]),
          cidade: new FormControl(endereco.cidade, [Validators.required]),
          uf: new FormControl(endereco.uf, [Validators.required]),
          isDefault: new FormControl<boolean | null>(endereco.isDefault)
        }));
      });
    });
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
      this._userService.updateUser(this.editProfileForm.value).subscribe({
        next: () => this._toastService.success('Perfil atualizado com sucesso'),
        error: () => this._toastService.error('Erro ao atualizar o perfil. Tente novamente mais tarde')
      });
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
    this._router.navigate(['/user']);
  }
}
