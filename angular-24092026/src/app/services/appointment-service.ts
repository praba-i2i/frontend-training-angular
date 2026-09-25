import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface guests {
    id: string;
}

export interface SearchResponse {
    guests: guests[];
}

export interface AppointmentsResponse {
    appointment_services: AppointmentServiceResponse[];
}

export interface AppointmentServiceResponse {
    service: {
        display_name: string;
        name: string;
    };
    start_time: string;
}

export interface AppointmentResponse {
    appointments: AppointmentsResponse[];
}

@Service()
export class AppointmentService {
    private http =  inject(HttpClient);
    private searchApiUrl = 'https://d3hr66obvidrpi.cloudfront.net/guest/phone-search/?phone=8006219279&brand=supercuts&country=us';
    private appointmentApiUrl = 'https://d3hr66obvidrpi.cloudfront.net/guest/appointments/';


    searchPhoneNumber(): Observable<SearchResponse> {
        return this.http.get<SearchResponse>(`${this.searchApiUrl}`);
    }

    getAppointments(guestId: string): Observable<AppointmentResponse> {
        const url = `${this.appointmentApiUrl}?guest_id=${guestId}` +
        `&start_date=2026/09/23&end_date=2027/09/23&brand=supercuts&country=us`;
        return this.http.get<AppointmentResponse>(url);
    }
}
