import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

interface ParticleConfig {
  angle: number;
  distance: number;
  delay: number;
}

interface ClickBurst {
  id: number;
  x: number;
  y: number;
  particles: ParticleConfig[];
}

@Component({
  selector: 'app-interactive-layer',
  templateUrl: './interactive-layer.component.html',
  styleUrl: './interactive-layer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveLayerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly supportsFinePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  readonly enabled = signal(this.supportsFinePointer);
  readonly pointerVisible = signal(false);
  readonly pointer = signal({ x: 0, y: 0 });
  readonly bursts = signal<ClickBurst[]>([]);

  private frameId = 0;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;

  ngOnInit(): void {
    if (!this.supportsFinePointer || typeof window === 'undefined') {
      return;
    }

    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', this.handlePointerDown, { passive: true });
    window.addEventListener('blur', this.handleWindowBlur);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pointermove', this.handlePointerMove);
      window.removeEventListener('pointerdown', this.handlePointerDown);
      window.removeEventListener('blur', this.handleWindowBlur);

      if (this.frameId) {
        cancelAnimationFrame(this.frameId);
      }
    });
  }

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.targetX = event.clientX;
    this.targetY = event.clientY;

    if (!this.pointerVisible()) {
      this.currentX = event.clientX;
      this.currentY = event.clientY;
      this.pointerVisible.set(true);
    }

    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.renderFrame);
    }
  };

  private readonly handlePointerDown = (event: PointerEvent): void => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const particles = Array.from({ length: 8 }, (_, index) => ({
      angle: index * 45,
      distance: 34 + (index % 3) * 12,
      delay: index * 18
    }));

    this.bursts.update((bursts) => [...bursts, { id, x: event.clientX, y: event.clientY, particles }]);

    window.setTimeout(() => {
      this.bursts.update((bursts) => bursts.filter((burst) => burst.id !== id));
    }, 820);
  };

  private readonly handleWindowBlur = (): void => {
    this.pointerVisible.set(false);
  };

  private readonly renderFrame = (): void => {
    this.currentX += (this.targetX - this.currentX) * 0.16;
    this.currentY += (this.targetY - this.currentY) * 0.16;

    document.documentElement.style.setProperty('--pointer-x', `${this.currentX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${this.currentY}px`);
    this.pointer.set({ x: this.currentX, y: this.currentY });

    const deltaX = Math.abs(this.targetX - this.currentX);
    const deltaY = Math.abs(this.targetY - this.currentY);

    if (deltaX > 0.2 || deltaY > 0.2) {
      this.frameId = requestAnimationFrame(this.renderFrame);
      return;
    }

    this.frameId = 0;
  };
}
