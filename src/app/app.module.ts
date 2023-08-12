import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { imageReducer } from './store';
import { AppEffects } from './store/app.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ images: imageReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
