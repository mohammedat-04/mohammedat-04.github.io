import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CONTACT_COPY, SOCIAL_LINKS } from '../../core/data/portfolio.data';
import { ContactService } from '../../core/services/contact.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { SectionShellComponent } from '../section-shell/section-shell.component';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, RevealDirective, RippleDirective, TiltDirective, SectionShellComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly socialLinks = SOCIAL_LINKS;
  readonly copy = CONTACT_COPY;
  readonly submissionAttempted = signal(false);
  readonly submitting = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    subject: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]]
  });

  submit(): void {
    this.submissionAttempted.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.contactService
      .submitMessage(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (response) => {
          this.successMessage.set(response.message);
          this.form.reset();
          this.submissionAttempted.set(false);
        },
        error: () => {
          this.errorMessage.set('Message delivery failed. Please try again or use the direct links.');
        }
      });
  }

  hasError(controlName: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return !!control && control.invalid && (control.touched || this.submissionAttempted());
  }
}
