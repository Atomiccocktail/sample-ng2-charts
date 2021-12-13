import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptionsPlain = {
  headers: new HttpHeaders({ 'Accept': 'text/plain',
                             'Content-Type': 'text/plain'                             
                             })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  apiEbookData()
  {
	let url = `https://test-api-67j2d.ondigitalocean.app/angularTest`;
    return this.http.get(url);
  }
}
