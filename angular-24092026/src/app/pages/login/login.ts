import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    private authService = inject(AuthService);
    private router = inject(Router);

    mobileNumber = '';
    otp = '';

    otpEnabled = signal(false);
    errorMessage = signal('');

    continue() {
      this.errorMessage.set('');

      this.authService.sendOtp(this.mobileNumber)
        .subscribe({
          next: response => {
            console.log('Mobile API response:', response);
            this.otpEnabled.set(true);
          },
          error: error => {
            console.log('Mobile API error:', error);
            this.otpEnabled.set(false);
            this.errorMessage.set('Unable to send OTP. Please try again.');
          }
        });
    }


    verifyOtp() {
      this.errorMessage.set('');

      this.authService.verifyOtp(this.mobileNumber, this.otp)
        .subscribe({
          next: response => {
            console.log('OTP response:', response);
            const valid = response?.VerificationResponse?.Valid === true;

            if (valid) {
              this.authService.getAuthToken().subscribe({
                next: response => {
                  const token = response?.access_token ?? '';
                  localStorage.setItem('authToken', token);
                },
                error: error => {
                  console.log('Auth Token Error:', error);
                  localStorage.setItem('authToken', '');
                  this.errorMessage.set('Get Auth Token Failed.');
                }
              })

              this.router.navigate(['/reactive-form']);
            } else {
              localStorage.setItem('authToken', '');
              this.errorMessage.set('Invalid OTP. Please try again.');
            }
          },

          error: error => {
            console.log('OTP verification error:', error);
            localStorage.setItem('authToken', '');
            this.errorMessage.set('OTP verification failed.');
          }
        });
    }
}