import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  secondsToRedirect = 10;
  invalidUrl: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.invalidUrl = '';
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.secondsToRedirect--;
      if (this.secondsToRedirect === 0) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.invalidUrl = this.route.snapshot.url.join('');
    this.startCountdown();
  }
} 
