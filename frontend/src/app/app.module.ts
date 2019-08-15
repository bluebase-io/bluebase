import { AuthTokenInterceptor } from './auth/auth-token-interceptor.service';
import { RedirectGuard } from './auth/redirect.guard';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatMenuModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';
import { MainContentComponent } from './main-content/main-content.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

import { ApiKeyService } from './api-key/api-key.service';
import { ApiKeyComponent } from './api-key/api-key.component';
import { GatewayComponent } from './gateway/gateway.component';
import { GatewayService } from './gateway/gateway.service';

const appRoutes: Routes = [
  {
    path: '',
    component: MainContentComponent,
  },
  {
    path: 'login-success/:id',
    component: LoginComponent,
    pathMatch: 'prefix',
    canActivate: [RedirectGuard]
  },
  {
    path: 'api-keys',
    component: ApiKeyComponent
  },
   { path: '**', redirectTo: '' }
];

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'javascript', func: javascript }
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainContentComponent,
    MainToolbarComponent,
    LoginComponent,
    ApiKeyComponent,
    GatewayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    FlexLayoutModule,
    MatCardModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    MatGridListModule,
    HttpClientModule,
    AuthModule.forRoot({
      url: environment.nestjsBackend.url || 'localhost:3000'
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }, ApiKeyService, GatewayService],
  bootstrap: [AppComponent]
})
export class AppModule {}
