import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  promptEvent;
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }
  askUserToUpdate() {
    const x = window.confirm('New Updates available want to update?');
    return x;
  }
}
