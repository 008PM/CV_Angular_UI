import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;
  imageUrl: string | ArrayBuffer | null = "";

  constructor(private http: HttpClient) {}

  onChooseImage() {
    if(this.fileInput){
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Create a FileReader to read the file and display the image
      const reader = new FileReader();
      reader.onload = (e) => {
        debugger
        if(e.target){
          this.imageUrl = e.target.result;
          console.log(this.imageUrl)
        }
      };
      reader.readAsDataURL(file);

      // Send the file to the backend------To be done later
      // const formData = new FormData();
      // formData.append('image', file, file.name);
      // this.http.post('YOUR_BACKEND_URL_HERE', formData).subscribe(response => {
      //   console.log('Image uploaded successfully', response);
      // });

      //----To implement after 200 code from Backend --------//
      //Auto serach for image based on some criteria like image name_Mod
      //If that is present then load it(Need to check from Cloud or local)
    }
  }
}
