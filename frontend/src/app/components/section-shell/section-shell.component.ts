import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-section-shell',
  imports: [RevealDirective],
  templateUrl: './section-shell.component.html',
  styleUrl: './section-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionShellComponent {
  sectionId = input.required<string>();
  eyebrow = input.required<string>();
  title = input.required<string>();
  lead = input('');
}
