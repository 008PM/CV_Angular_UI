import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ImageService } from './image_processing.service';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [CommonModule, HttpClientModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;
  imageInBase64: string | ArrayBuffer | null = "";
  processedColorImageBase64: string = "";
  constructor(private http: HttpClient,private imageService: ImageService) {}
  onChoosingImage() {
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
          this.imageInBase64 = e.target.result;
          console.log(this.imageInBase64)
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  public onProcessImage(){
    console.log("The image has been set");
    console.log(this.imageInBase64);
    if(this.imageInBase64){
      this.imageService.processImage(this.imageInBase64.toString())
      .subscribe((processedImage:string)=>{
        if(processedImage){
          this.processedColorImageBase64 = processedImage;
        }
      },(error) =>{
        console.error("Error processing image:", error);
        alert("An error occurred while processing the image. Please try again later.");
      })
    }

  }
}
