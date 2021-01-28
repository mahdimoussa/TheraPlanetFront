import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

constructor(private http: HttpClient) {

}
public change(date,available)
{
  this.http.post(`${config.apiUrl}/api/availability`,{'date':date,'available':available});
}
public changeAppointment(user_id,date)
{
  this.http.post(`${config.apiUrl}/api/appointment`,{'user_id':user_id,'date':date});
}
}
