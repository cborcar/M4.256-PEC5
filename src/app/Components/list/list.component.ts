import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/Models/image.interface';
import { ImagesService } from 'src/app/Services/images.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  images: Image[] = [];
  showSpinner: boolean = true;

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.imagesService.getAllImages().subscribe({
      error: (err: any) => {
        console.log(err);
        this.showSpinner = false;
      },
      next: (images) => {
        this.images = Object.values(images)[0]; //La api no devuelve un array, devuelve un objeto
        this.showSpinner = false;
      },
    });
  }
}
