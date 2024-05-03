import { DEFAULT_DIALOG_CONFIG, DialogModule } from '@angular/cdk/dialog';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AppEffects,
  FiguresEffects,
  figuresReducer,
  FranchisesEffects,
  franchisesReducer,
  PersonsEffects,
  personsReducer
} from './store';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      figures: figuresReducer,
      franchises: franchisesReducer,
      persons: personsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([
      AppEffects,
      FranchisesEffects,
      FiguresEffects,
      PersonsEffects,
    ]),
    DialogModule
  ],
  providers: [
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: {
        hasBackdrop: true,
        backdropClass: 'dialog-backdrop',
        panelClass: 'dialog-container',
      },
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
