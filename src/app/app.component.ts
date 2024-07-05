import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NavbarStateService } from './services/navbar-state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'moviehub';
  isNavbarExpanded = false;

  constructor(private navbarStateService: NavbarStateService, private router: Router) {}

  ngOnInit(): void {
    this.navbarStateService.isExpanded$.subscribe(expanded => {
      this.isNavbarExpanded = expanded;
    });
  
    // Reset navbar state on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isNavbarExpanded = false;
      this.navbarStateService.setExpanded(false);
    });
  }


  detectDevTools() {
    const threshold = 160;
    let devtools: { isOpen: boolean; orientation: 'vertical' | 'horizontal' | null } = {
      isOpen: false,
      orientation: null
    };

    const emitEvent = (isOpen: boolean, orientation: 'vertical' | 'horizontal' | null) => {
      const event = new CustomEvent('devtoolschange', {
        detail: {
          isOpen,
          orientation
        }
      });
      window.dispatchEvent(event);
    };

    const main = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientation: 'vertical' | 'horizontal' = widthThreshold ? 'vertical' : 'horizontal';

      if (!(heightThreshold && widthThreshold) &&
        ((window as any).Firebug && (window as any).Firebug.chrome && (window as any).Firebug.chrome.isInitialized) || widthThreshold || heightThreshold) {
        if (!devtools.isOpen || devtools.orientation !== orientation) {
          emitEvent(true, orientation);
        }
        devtools.isOpen = true;
        devtools.orientation = orientation;
      } else {
        if (devtools.isOpen) {
          emitEvent(false, null);
        }
        devtools.isOpen = false;
        devtools.orientation = null;
      }
    };

    main();
    window.addEventListener('resize', main);
    window.addEventListener('devtoolschange', (event: any) => {
      if (event.detail.isOpen) {
        alert('Developer tools are open. Please close them.');
        this.router.navigateByUrl('/restricted');
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const forbiddenKeys = ['I', 'C', 'J', 'U', 'F12'];
    if ((event.ctrlKey && event.shiftKey && forbiddenKeys.includes(event.key.toUpperCase())) || 
        (event.ctrlKey && event.key === 'U') || 
        (event.key === 'F12')) {
      event.preventDefault();
      this.router.navigateByUrl('/restricted');

    }
  }

  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }
}

