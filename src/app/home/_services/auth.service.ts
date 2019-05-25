import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "./../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class AuthService {
  	headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8'})
  private basePath:string = path.path

  private token = '';

  constructor(private http:HttpClient){

  this.reloadToken();

  }
  reloadToken(token?){
    let datos = token?token:localStorage.getItem('token');
    if(datos){
      this.token = (datos);
    }else{
      this.token = path.token
    }
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.token});
  }
  private handleError(error:any):Promise<any> {
  console.error("ha ocurrido un error")
  console.log(error)
  return Promise.reject(error.message || error)
  }

  Authentication(login:any):Promise<any> {
    let url = `${this.basePath}/login`

    this.reloadToken();
    return this.http.post(url,login)
                    .toPromise()
                    .then(response => {
                      // console.log(response.json())
                      return response;
                    })
                    .catch(this.handleError)
  }

  recovery(form:any):Promise<any>{
    let url = `${this.basePath}/recovery/${form.id}`

    this.reloadToken();
    return this.http.put(url,form)
                      .toPromise()
                      .then(response => {
                        return response;
                      })
                      .catch(this.handleError)
  }

}
