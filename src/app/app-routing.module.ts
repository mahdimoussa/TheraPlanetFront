import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import {ProfileComponent} from './profile/profile.component';
import {SinglePostComponent} from './single-post/single-post.component';
import {TherapistGuard} from './helpers/therapist.guard';
import {CreatePostComponent} from './create-post/create-post.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import {ApproveTherapistComponent} from "@/approve-therapist/approve-therapist.component";
import {TherapistComponent} from "@/therapist/therapist.component";
import {AdminComponent} from "@/admin/admin.component";
import {SavedComponent} from "@/saved/saved.component";
import {MessagesComponent} from "@/messages/messages.component";
import {ChatRoomComponent} from "@/chat-room/chat-room.component";
import {AdminGuard} from "@/helpers/admin.guard";
import {ForgetPasswordComponent} from "@/forget-password/forget-password.component";
import {ResetPasswordComponent} from "@/reset-password/reset-password.component";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'createPost', component: CreatePostComponent, canActivate: [TherapistGuard]},
  {path: 'singlePost/:id', component: SinglePostComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'user-calendar', component: UserCalendarComponent},
  {path: 'approveTherapist', component: ApproveTherapistComponent},
  {path: 'therapist/:id', component: TherapistComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  {path: 'saved', component: SavedComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'chatRoom', component: ChatRoomComponent},
  {path: 'forgetpassword', component: ForgetPasswordComponent},
  {path: 'resetpassword', component: ResetPasswordComponent},


  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
