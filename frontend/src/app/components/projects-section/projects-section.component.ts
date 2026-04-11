import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS, ProjectItem } from '../../core/data/portfolio.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { SectionShellComponent } from '../section-shell/section-shell.component';

@Component({
  selector: 'app-projects-section',
  imports: [RevealDirective, RippleDirective, TiltDirective, SectionShellComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSectionComponent {
  readonly projects = PROJECTS;

  openLink(project: ProjectItem, type: 'demo' | 'source'): void {
    const target = type === 'demo' ? project.demoUrl : project.sourceUrl;

    if (!target) {
      return;
    }

    if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.open(target, '_blank', 'noopener,noreferrer');
  }
}
