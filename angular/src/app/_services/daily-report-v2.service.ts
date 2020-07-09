import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DailyReportV2Service {

  constructor(private http: HttpClient, private constants: Constants) { }

 dailyReportSave = (obj: any): Observable<any> => {
     return new Observable(obs => {
       this.http.post(this.constants.API_ENDPOINT+'/dailyReportV2', obj).subscribe(response => {
         obs.next(response);
         obs.complete();
       }, error => {
         obs.error(error);
         obs.complete();
       });
     });
   }
 
    getAllDailyReports = () => {
     return new Observable(obs => {
       this.http.get(this.constants.API_ENDPOINT+ "/dailyReportV2/getAll").subscribe((data: any) => {
         obs.next(data);
         obs.complete();
       }, error => {
         obs.error(error);
         obs.complete();
       });
     });
   }


}
