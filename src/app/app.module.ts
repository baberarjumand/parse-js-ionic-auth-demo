import { environment } from './../environments/environment.prod';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as Parse from 'parse';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      multi: true,
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Executes prior to Angular fully bootstrapping.
 * @param config The Configuration Service
 */
export function appInitFactory() {
  return () => {
    return new Promise<void>((resolve, reject) => {
      (Parse as any).serverURL = environment.parseLocalServerUrl;
      Parse.initialize(environment.parseAppId);

      resolve();
    });
  };
}
