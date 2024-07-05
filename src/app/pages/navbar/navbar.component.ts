import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStateService } from '../../services/navbar-state.service';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isExpanded = false;

  constructor(private navbarStateService: NavbarStateService, private admin: AdminAuthService) {}

  expandNavbar() {
    this.isExpanded = true;
    this.navbarStateService.setExpanded(this.isExpanded);
  }

  collapseNavbar() {
    this.isExpanded = false;
    this.navbarStateService.setExpanded(this.isExpanded);
  }

  onLinkClick() {
    this.collapseNavbar(); 
  }

  onAdminClick(event: Event) {
    event.preventDefault();
    this.admin.promptForPassword();
  }
}
