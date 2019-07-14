import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
headers:any;
token:any;
  constructor(private http:HttpClient) { }
  Getdata(URL,successCallback,failureCallback)
  {  
    let url = URL;
   return this.http.get(url).subscribe((response)=>{
     console.log(response)
     successCallback(response)
   }),(error)=>{
     console.log(error);
     failureCallback()
   }
   
  }
  public postData(url,body,successCallback, failureCallback) {
    const URL = url; 
     this.token = window.localStorage.getItem('TokenInLocal');     

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token
    })

    const option={
      headers:this.headers 
     }
   
    this.http.post(URL,body,option).subscribe((response: any) => {
      successCallback(response);
    }, (error) => {
      failureCallback(error)
    })
  }
  public deleteData (url,successCallback, failureCallback)
  {
  
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'No-Auth':'True'
    })
    const option={
      headers :this.headers
    }
    this.http.delete(url).subscribe((response: any) => {

      successCallback(response);
    }, (error) => {
 
      failureCallback(error)
    })
  }
}
