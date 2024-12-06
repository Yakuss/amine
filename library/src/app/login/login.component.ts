import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from './../model/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = new User();
  err: number = 0;
  message :string=" login or password wrong ";
  constructor(private authService: AuthService, private router: Router) {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        if(err.error.errorCause=='disabled')
          this.message="user disactivated !!"
        this.err = 1;
      },
    });
  }
}
