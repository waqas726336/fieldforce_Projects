import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = "http://localhost:3000/Employees"; 
  constructor(private _http:HttpClient) { }
 
  postEmployee(data:any)
  {
   return this._http.post<any>(this.BaseUrl,data).pipe(map((res:any)=>
   {
     return res;
   }));
  }
  getEmployee()
  {
   return this._http.get<any>(this.BaseUrl).pipe(map((res:any)=>
   {
     return res;
   }));
  }
  updateEmployee(id:number,data:any)
  {
    return this._http.put<any>(this.BaseUrl+'/'+id,data).pipe(map((res:any)=>
   {
     return res;
     
   }));
  }
  deleteEmployee(id:number)
  {
   return this._http.delete<any>(this.BaseUrl+'/'+id).pipe(map((res:any)=>
   {
     return res;
   }));
  }
}