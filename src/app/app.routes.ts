import { Routes } from '@angular/router'

import { LandingPageComponent } from './landing-page/landing-page.component'
import { UrlRedirectComponent } from './url-redirect/url-redirect.component'
import { LoginComponent } from './login/login.component'

export const routes: Routes = [
	{ path: '', component: LandingPageComponent },
	{ path: 'login', component: LoginComponent },
	{ path: ':shortKey', component: UrlRedirectComponent }
]
