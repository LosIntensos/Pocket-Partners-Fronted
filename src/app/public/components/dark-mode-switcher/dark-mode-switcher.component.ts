import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-dark-mode-switcher',
  templateUrl: './dark-mode-switcher.component.html',
  standalone: true,
  imports: [
    MatSlideToggle,
    FormsModule,
  ],
  styleUrl: './dark-mode-switcher.component.css'
})
export class DarkModeSwitcherComponent {

  isDarkModeActive = false;


  constructor(@Inject(DOCUMENT) private document: Document) {}


  onChaneDarkMode(newValue: any) {
    if (newValue) {
      this.document.body.classList.add('dark-mode');
      console.log(newValue);
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }


}
