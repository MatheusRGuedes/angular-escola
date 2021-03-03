import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//é carregado a classe AppModule q será usada como um root module
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
