import { UserService } from './services/user.service';
import { User } from './models/user';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { appRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { from } from 'rxjs';
import { CreatePostComponent } from './create-post/create-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { ProfileComponent } from './profile/profile.component';
import { ApproveTherapistComponent } from './approve-therapist/approve-therapist.component';
import { TherapistComponent } from './therapist/therapist.component';
import {RatingModule} from 'ng-starrating';
import { AdminComponent } from './admin/admin.component';
import { SavedComponent } from './saved/saved.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MessagesComponent } from './messages/messages.component';
import { CalendarModule, DateAdapter, } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './services/calendar.service';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
// used to create fake backend
@NgModule({
  declarations: [	
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    CreatePostComponent,
    SinglePostComponent,
      ProfileComponent,
      ApproveTherapistComponent,
      TherapistComponent,
      AdminComponent,
      SavedComponent,
      ChatRoomComponent,
      MessagesComponent,
      CalendarComponent,
      ForgetPasswordComponent,
      ResetPasswordComponent,
      UserCalendarComponent
   ],
  imports: [
    BrowserModule,
    appRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    AngularFirestoreModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CalendarService,
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
