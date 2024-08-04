import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/elements/clientes/app.component';
import { appConfig } from './app/elements/clientes/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
