
import { Component } from '@angular/core';
import { SHORTENER_URL_BASE } from '../../data/shortener';


@Component({
  selector: 'app-url-redirect',
  imports: [],
  templateUrl: './url-redirect.component.html'
})
export class UrlRedirectComponent {
	ngOnInit() {
		const shortKey = window.location.pathname.split('/')[1];
		window.location.href = `${SHORTENER_URL_BASE}/${shortKey}`;
	}
}
