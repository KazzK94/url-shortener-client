
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SHORTENER_URL_BASE } from '../../data/shortener'

@Component({
	selector: 'app-shortener-form',
	imports: [CommonModule, FormsModule],
	templateUrl: './shortener-form.component.html',
	styleUrl: './shortener-form.component.css'
})
export class ShortenerFormComponent {
	longUrl = '';
	shortUrl = '';

	constructor() {
		// Wake up the service
		fetch(SHORTENER_URL_BASE)
	}

	shortenUrl(url: string) {
		fetch(`${SHORTENER_URL_BASE}/shorten`, {
			method: 'POST',
			body: JSON.stringify({ url: url }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log('Response:', data)
				if(data.error) {
					this.shortUrl = `Error: ${data.error}`
				} else {
					this.shortUrl = `${window.location.origin}/${data.shortKey}`
				}
			})
			.catch(error => {
				console.error('Error:', error)
				this.shortUrl = 'There was an error shortening the URL'
			})
	}
}
