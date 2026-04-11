import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;
  private readonly reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() revealDelay = 0;

  constructor() {
    this.renderer.addClass(this.elementRef.nativeElement, 'reveal-fade');
  }

  ngOnInit(): void {
    if (this.reduceMotion || typeof window === 'undefined') {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.reveal();
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition-delay', `${this.revealDelay}ms`);
    this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
  }
}
