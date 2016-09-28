import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

declare var WLResourceRequest: any;

@Injectable()
export class AdapterService {

  constructor(private http:Http){

  }

  callAdapter (adapterName:string, path:string, verb:string, content: any): Promise<any> {
    
    verb = verb.toUpperCase();
    let rrVerb = verb === "GET" ? WLResourceRequest.GET : (verb === "POST" ? WLResourceRequest.POST : (verb === "PUT" ? WLResourceRequest.PUT : (verb === "DELETE" ? WLResourceRequest.DELETE : "")));
    var resourceRequest = new WLResourceRequest("/adapters/" + adapterName + "/" + path, rrVerb);
    resourceRequest.addHeader("Content-type", "application/json");
    
    return new Promise(
          (resolve, reject) => {
            resourceRequest.send(content).then(
              (response) => {
                resolve(response.responseJSON);
              },
              (error) => {
                console.error("ERROR calling adapter: %o", error);
                reject(error);
              }
            );
          }
    );
    
  }  

  callApi (apiPath:string, verb:string, queryParams: Array<{key: String, value: String}>, content: any): Promise<any> {
    let apiInvocationRequest = {
      httpVerb: verb.toUpperCase(),
      apiUrl: apiPath,
      data: content,
      queryParams: queryParams
    }
    
    var resourceRequest = new WLResourceRequest("/adapters/APIAdapter/callAPI", WLResourceRequest.POST);
    resourceRequest.addHeader("Content-type", "application/json");

    return new Promise(
      (resolve, reject) => {

        resourceRequest.send(apiInvocationRequest).then(
          (response) => {
            resolve(response.responseJSON);
          },
          (error) => {
            console.error("ERROR calling API: %o", error);
            reject(error);
          }
        );              
      }
    );
  }    
}

