import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt]'
})
export class TiltDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly supportsFinePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() maxTilt = 8;

  constructor() {
    this.renderer.addClass(this.elementRef.nativeElement, 'tilt-surface');
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.supportsFinePointer) {
      return;
    }

    const element = this.elementRef.nativeElement;
    const bounds = element.getBoundingClientRect();
    const percentageX = (event.clientX - bounds.left) / bounds.width;
    const percentageY = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (percentageX - 0.5) * this.maxTilt * 2;
    const rotateX = (0.5 - percentageY) * this.maxTilt * 2;

    this.renderer.setStyle(element, '--tilt-rotate-x', `${rotateX.toFixed(2)}deg`);
    this.renderer.setStyle(element, '--tilt-rotate-y', `${rotateY.toFixed(2)}deg`);
    this.renderer.setStyle(element, '--tilt-glow-x', `${(percentageX * 100).toFixed(1)}%`);
    this.renderer.setStyle(element, '--tilt-glow-y', `${(percentageY * 100).toFixed(1)}%`);
    this.renderer.setStyle(
      element,
      'box-shadow',
      '0 32px 90px rgba(5, 10, 30, 0.35), 0 18px 30px rgba(18, 28, 58, 0.18)'
    );
  }

  @HostListener('pointerleave')
  onPointerLeave(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, '--tilt-rotate-x', '0deg');
    this.renderer.setStyle(element, '--tilt-rotate-y', '0deg');
    this.renderer.removeStyle(element, 'box-shadow');
  }
}
