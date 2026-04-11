import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submitMessage(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('/api/contact', payload);
  }
}
