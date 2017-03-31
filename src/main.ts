import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { tag$, tag } from 'fire-slack/util/tags';

/* Globalize some stuff for debugging */
window['tag$'] = tag$;
window['tag'] = tag;


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => {
    console.error(err);
    console.error('bootstrap error');
  });
