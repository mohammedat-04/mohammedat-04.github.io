import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCES } from '../../core/data/portfolio.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { SectionShellComponent } from '../section-shell/section-shell.component';

@Component({
  selector: 'app-experience-section',
  imports: [RevealDirective, TiltDirective, SectionShellComponent],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceSectionComponent {
  readonly experiences = EXPERIENCES;
}
