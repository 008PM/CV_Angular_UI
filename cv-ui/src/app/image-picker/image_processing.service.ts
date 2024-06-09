import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
  
})
export class ImageService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'YOUR_API_ENDPOINT';  // Replace with your API endpoint

  //-----http client is trouble maker next to be fixed,its fixed idea lies in adding the things in 


  processImage(base64Image: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { greyscale_image: base64Image };
    return this.http.post<{ processed_image: string }>(this.apiUrl, body, { headers })
      .pipe(
        map(response => response.processed_image)
      );
  }
}
