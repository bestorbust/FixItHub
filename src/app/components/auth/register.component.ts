import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    full_name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      () => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },
      (error) => alert('Registration Failed')
    );
  }
}
