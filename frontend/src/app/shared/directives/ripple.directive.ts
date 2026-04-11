import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly allowMotion =
    typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    const host = this.elementRef.nativeElement;

    this.renderer.addClass(host, 'ripple-surface');
    this.renderer.setStyle(host, 'position', 'relative');
    this.renderer.setStyle(host, 'overflow', 'hidden');
    this.renderer.setStyle(host, 'isolation', 'isolate');
  }

  @HostListener('click', ['$event'])
  createRipple(event: MouseEvent): void {
    if (!this.allowMotion) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const bounds = host.getBoundingClientRect();
    const ripple = this.renderer.createElement('span');
    const size = Math.max(bounds.width, bounds.height) * 1.2;
    const left = event.clientX - bounds.left - size / 2;
    const top = event.clientY - bounds.top - size / 2;

    this.renderer.addClass(ripple, 'ui-ripple');
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${left}px`);
    this.renderer.setStyle(ripple, 'top', `${top}px`);
    this.renderer.appendChild(host, ripple);

    window.setTimeout(() => {
      this.renderer.removeChild(host, ripple);
    }, 700);
  }
}
