import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = 'text' | 'email' | 'password' | 'nomeCompleto' | 'dataNascimento' | 'genero' | 'cepFaturamento' | 'logradouroFaturamento' | 'numeroFaturamento' | 'complementoFaturamento' | 'bairroFaturamento' | 'cidadeFaturamento' | 'ufFaturamento' | 'cpf' | 'cep' | 'logradouro' | 'numero' | 'complemento' | 'bairro' | 'cidade' | 'uf'

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PrimaryInputComponent),
    multi: true
  }],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = 'text';
  @Input() placeHolder: string = '';
  @Input() label: string = '';
  @Input() inputName: string = '';

  @Output() blur = new EventEmitter<Event>();

  value: string = '';
  onChange: any = () => { }
  onTouched: any = () => { }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void { }
}
