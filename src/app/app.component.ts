import { Component } from '@angular/core'
import { NavbarComponent } from './navbar/navbar.component'
import { ShortenerFormComponent } from '@app/shortener-form/shortener-form.component'

@Component({
	selector: 'app-root',
	imports: [NavbarComponent, ShortenerFormComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
}
