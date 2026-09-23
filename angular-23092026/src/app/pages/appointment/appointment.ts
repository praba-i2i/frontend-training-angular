import { Component, inject, signal } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service';
import { forkJoin } from 'rxjs';

export interface appointment {
  id: string;
  display_name: string;
  name: string;
  start_time: string;
}

@Component({
  imports: [],
  selector: 'app-appointment',
  styleUrl: './appointment.css',
  templateUrl: './appointment.html',
})
export class Appointment {
  private appointmentService = inject(AppointmentService);

  appointments: appointment[] = [];
  loading = signal(true);

  ngOnInit() {
    this.appointmentService.searchPhoneNumber().subscribe({
      next: (data) => {

        const guests = data?.guests ?? [];

        const appointmentRequests = guests.map(guest =>
          this.appointmentService.getAppointments(guest.id)
        );

        forkJoin(appointmentRequests).subscribe({
          next: (responses) => {

            this.appointments = responses.flatMap(response =>
              response.appointments.flatMap(appointment =>
                appointment.appointment_services.map(service => ({
                  id: crypto.randomUUID(),
                  display_name: service.service.display_name,
                  name: service.service.name,
                  start_time: service.start_time
                }))
              )
            );
            this.loading.set(false);
            console.log('Appointments:', this.appointments);
          },

          error: (error) => {
            console.error('Appointment API failed:', error);
          }
        });
      },

      error: (error) => {
        console.error('Search API failed:', error);
      }
    });
  }
}
