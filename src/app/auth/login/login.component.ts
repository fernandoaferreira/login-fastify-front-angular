import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private snackBar: MatSnackBar,
    private UserService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {

    const credentials = this.loginForm.value;

    this.UserService.login(credentials)
      .subscribe((user) => {
        console.log('User Logado: ', user);
        this.snackBar.open('Usuario logado com sucesso! Bem vindo! ', 'OK', { duration: 3000 });
        this.route.navigateByUrl('/');
      },
        (error) => {
          console.log(error);
          this.snackBar.open('Login error: ' + error.error.error, 'OK', { duration: 2000 });
        }
      )

  }

}
