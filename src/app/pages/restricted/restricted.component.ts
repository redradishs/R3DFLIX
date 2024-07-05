import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restricted',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './restricted.component.html',
  styleUrl: './restricted.component.css'
})
export class RestrictedComponent {

}
