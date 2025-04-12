import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register.component';
import { LoginComponent } from './components/auth/login.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ManageIssuesComponent } from './components/manage-issues/manage-issues.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { MyIssuesComponent } from './components/my-issues/my-issues.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home' , component:HomeComponent},
    { path: 'profile-details' , component:ProfileDetailsComponent},
    { path: 'admin-dashboard' , component:AdminDashboardComponent},
    { path: 'admin-profile' , component:AdminProfileComponent},
    { path: 'manage-issues' , component:ManageIssuesComponent},
    { path: 'manage-users' , component:AdminUsersComponent},
    { path: 'my-issues' , component:MyIssuesComponent},
    { path: 'report-issue' , component:ReportIssueComponent},
    { path: 'issues' , component:UserDashboardComponent},
    { path: 'user' , component: UserComponent, canActivate: [AuthGuard], data: { role: 'User' } },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }


];
