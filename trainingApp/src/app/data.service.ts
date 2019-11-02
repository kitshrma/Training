import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Training } from './training';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  apiURL: string = Constants.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

  submitData(trainingData: Training ){
    
    let apiResponse: string = "";
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(this.apiURL,trainingData,{headers})
    
  }
}
