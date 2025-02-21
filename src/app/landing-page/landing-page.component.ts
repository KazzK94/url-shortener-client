
import { Component } from '@angular/core';
import { ShortenerFormComponent } from '@app/shortener-form/shortener-form.component'

@Component({
  selector: 'app-landing-page',
  imports: [ShortenerFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
}
