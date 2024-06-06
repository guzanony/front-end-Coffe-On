import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [
    MatSlideToggle
  ],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Input() disabledPrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  public submit(): void {
    this.onSubmit.emit();
  }

  public navigate(): void {
    this.onNavigate.emit();
  }

}
