import {ApplicationConfig, NgModule} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< Updated upstream
feature/criacao-components
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule ({
  imports: [
    MatSlideToggleModule,
  ]
})
class AppModule {}

import {MatInputModule} from "@angular/material/input";
develop
=======
>>>>>>> Stashed changes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
<<<<<<< Updated upstream
 feature/criacao-components
    provideHttpClient(withFetch()), provideAnimationsAsync()
=======
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    MatInputModule,
 develop
=======
    provideHttpClient(withFetch()), provideAnimationsAsync()
>>>>>>> Stashed changes
  ]
};
