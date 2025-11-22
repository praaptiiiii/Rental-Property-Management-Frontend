import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLoginModalOpen = signal(false);
  
  // Use computed to create a read-only signal
  isLoginModalOpen = computed(() => this._isLoginModalOpen());

  openLoginModal() {
    this._isLoginModalOpen.set(true);
  }

  closeLoginModal() {
    this._isLoginModalOpen.set(false);
  }
}