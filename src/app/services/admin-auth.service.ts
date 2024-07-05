import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminPassword = '10181995';
  private enteredPassword: string = '';

  constructor(private route: Router) { }

  promptForPassword() {
    const promptForPassword = prompt('Hi! Red enter your password: ');
    if(this.enteredPassword === this.adminPassword) {
      console.log('You are now logged in!');
      this.route.navigate(['/home']);
  } else {
    alert('Wrong password!');
  }
}
}
