import { Component } from '@angular/core';
import { ShortenerFormComponent } from '@app/shortener-form/shortener-form.component';

@Component({
  selector: 'app-root',
  imports: [ShortenerFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'URL Shortener Client';
}
