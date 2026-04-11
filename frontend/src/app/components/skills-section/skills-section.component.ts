import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILLS } from '../../core/data/portfolio.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { SectionShellComponent } from '../section-shell/section-shell.component';

@Component({
  selector: 'app-skills-section',
  imports: [RevealDirective, TiltDirective, SectionShellComponent],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSectionComponent {
  readonly skills = SKILLS;
}
