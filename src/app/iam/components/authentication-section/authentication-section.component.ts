import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

/**
 * Component for the authentication section.
 * @summary
 * This component provides the UI for the authentication section.
 * It displays the current username and provides buttons for signing in, signing up, and signing out.
 */
@Component({
  selector: 'app-authentication-section',
  templateUrl: './authentication-section.component.html',
  styleUrl: './authentication-section.component.css'
})
export class AuthenticationSectionComponent {
  currentUserName: string = '';
  isSignedIn: boolean = false;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUsername.subscribe((username) => {
      this.currentUserName = username;
    });
    this.authenticationService.isSignedIn.subscribe((isSignedIn) => {
      this.isSignedIn = isSignedIn;
    });
  }

  /**
   * Event Handler for the sign-in button.
   */
  onSignIn() {
    // Navigate to the sign-in page.
    this.router.navigate(['/sign-in']).then();
  }

  /**
   * Event Handler for the sign-up button.
   */
  onSignUp() {
    // Navigate to the sign-up page.
    this.router.navigate(['/sign-up']).then();
  }

  /**
   * Event Handler for the sign-out button.
   */
  onSignOut() {
    // Sign out the user.
    this.authenticationService.signOut();
  }




}
