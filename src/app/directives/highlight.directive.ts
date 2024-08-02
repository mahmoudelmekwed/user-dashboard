import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

    /**
   * Applies highlight style when mouse enters the element.
   * Uses HostListener to listen for the 'mouseenter' event.
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#cbaee9');
  }

    /**
   * Removes highlight style when mouse leaves the element.
   * Uses HostListener to listen for the 'mouseleave' event.
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

    /**
   * Applies or removes the background color to the host element.
   * @param color - The background color to apply.
   */

  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

}
