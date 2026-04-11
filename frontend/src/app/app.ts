import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAV_ITEMS } from './core/data/portfolio.data';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { InteractiveLayerComponent } from './components/interactive-layer/interactive-layer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';

@Component({
  selector: 'app-root',
  imports: [
    AboutSectionComponent,
    ContactSectionComponent,
    ExperienceSectionComponent,
    FooterComponent,
    HeroSectionComponent,
    InteractiveLayerComponent,
    NavbarComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly sections = NAV_ITEMS;
}
