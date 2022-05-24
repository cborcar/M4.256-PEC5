import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/Models/image.interface';
import { ImagesService } from 'src/app/Services/images.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  image!: Image;
  showSpinner: boolean = true;
  panelOpenState: boolean = false;
  buttonText: string = 'Show all details';

  constructor(
    private imagesService: ImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log('Identifier --> ', identifier);

    this.imagesService.getImageById(identifier).subscribe({
      error: (err: any) => {
        console.log(err);
        this.showSpinner = false;
      },
      next: (image) => {
        this.showSpinner = false;
        if (!image) {
          return this.router.navigateByUrl('/');
        }

        this.image = Object.values(image)[0]; //La api no devuelve un array, devuelve un objeto

        return '';
      },
    });
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
    if (this.panelOpenState == true) {
      this.buttonText = 'Hide details';
    } else {
      this.buttonText = 'Show all details';
    }
  }
}
