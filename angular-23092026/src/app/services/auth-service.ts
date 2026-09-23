import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OtpResponse {
  VerificationResponse: {
    Valid: boolean;
  };
}

export interface AuthTokenResponse {
    access_token: string;
}

@Service()
export class AuthService {
    private http =  inject(HttpClient);
    private mobileApiUrl = 'https://3b2khyuiuf.execute-api.us-east-1.amazonaws.com/api/auth/send-otp';
    private otpApiUrl = 'https://3b2khyuiuf.execute-api.us-east-1.amazonaws.com/api/auth/verify-otp';
    private authTokenApiUrl = 'https://3b2khyuiuf.execute-api.us-east-1.amazonaws.com/api/auth-token';


    sendOtp(mobileNumber: string): Observable<any> {
        return this.http.get(`${this.mobileApiUrl}/+ "+1" +${mobileNumber}`);
    }

    verifyOtp(mobileNumber: string, otp: string): Observable<OtpResponse> {
        return this.http.get<OtpResponse>(`${this.otpApiUrl}/+ "+1" +${mobileNumber}/${otp}`);
    }

    getAuthToken(): Observable<AuthTokenResponse> {
        return this.http.get<AuthTokenResponse>(`${this.authTokenApiUrl}`);
    }

}
