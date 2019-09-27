import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group(
    {
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password1': ['', [Validators.required, Validators.minLength(6)]],
      'password2': ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.matchingPassword
    }
  )

  constructor(private fb: FormBuilder,
    private UserService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  matchingPassword(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;

      if (password1 == password2) {
        return null;
      }
    }
    return { matching: false }
  }

  onSubmit() {

    console.log(this.formRegister.value);

    let user: User = { ...this.formRegister.value, password: this.formRegister.value.password1 }

    this.UserService.register(user)
      .subscribe((user) => {
        this.snackBar.open('Sucesso! Use suas credenciais para logar', 'OK', { duration: 2000 });
        this.router.navigateByUrl('/auth/login')
      },
        (error) => {
          this.snackBar.open('Erro!', 'OK', { duration: 2000 })
          console.error(error);
        })

  }

}
