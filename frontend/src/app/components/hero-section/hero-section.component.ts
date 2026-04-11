import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_CONTENT, HERO_METRICS } from '../../core/data/portfolio.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-hero-section',
  imports: [RevealDirective, RippleDirective, TiltDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  readonly hero = HERO_CONTENT;
  readonly metrics = HERO_METRICS;

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
