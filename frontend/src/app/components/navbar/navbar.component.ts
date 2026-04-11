import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal
} from '@angular/core';
import { NavigationItem } from '../../core/data/portfolio.data';
import { RippleDirective } from '../../shared/directives/ripple.directive';

@Component({
  selector: 'app-navbar',
  imports: [RippleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly destroyRef = inject(DestroyRef);

  sections = input.required<NavigationItem[]>();
  readonly activeSection = signal('hero');
  readonly compactMode = signal(false);

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', this.handleScroll));
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private readonly handleScroll = (): void => {
    const viewportTrigger = window.innerHeight * 0.28;
    let currentSection = 'hero';

    for (const section of this.sections()) {
      const element = document.getElementById(section.id);
      if (!element) {
        continue;
      }

      const bounds = element.getBoundingClientRect();
      if (bounds.top - viewportTrigger <= 0) {
        currentSection = section.id;
      }
    }

    this.activeSection.set(currentSection);
    this.compactMode.set(window.scrollY > 20);
  };
}
