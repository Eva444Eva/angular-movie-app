import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './modules/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
