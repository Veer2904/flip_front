import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleAuth {

  private clientId = '669638505172-g4tghbmhuurkeoot1f4vftmb0k7h2lmj.apps.googleusercontent.com';

  initGoogleLogin(callback: (response: any) => void) {
    if (typeof google === 'undefined') {
      console.error('Google Identity script not loaded');
      return;
    }

    google.accounts.id.initialize({
      client_id: this.clientId,
      callback
    });
  }

  renderButton(element: HTMLElement) {
    if (typeof google === 'undefined') {
      console.error('Google Identity script not loaded');
      return;
    }

    google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large'
    });
  }
}
