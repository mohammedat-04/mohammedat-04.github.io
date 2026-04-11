import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT_HIGHLIGHTS } from '../../core/data/portfolio.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { SectionShellComponent } from '../section-shell/section-shell.component';

@Component({
  selector: 'app-about-section',
  imports: [RevealDirective, TiltDirective, SectionShellComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent {
  readonly highlights = ABOUT_HIGHLIGHTS;
}
