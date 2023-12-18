import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HttpClientJsonpModule, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApiService } from './api.service';
import { CreateComponent } from './create/create.component';
import { switchMap } from 'rxjs';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { Create2Component } from './create2/create2.component';








@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserDetailsComponent,
    CreateComponent,
    TaskDetailsComponent,
    TaskupdateComponent,
    Create2Component,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ApiService,
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
