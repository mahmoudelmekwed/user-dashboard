import { AfterViewInit, Directive, ElementRef, Host, Optional, Renderer2, Self } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[appBubblePagination]',
  standalone: true
})
export class BubblePaginationDirective implements AfterViewInit {

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private elementRef: ElementRef,
    private ren: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.styleDefaultPagination();
  }

    /**
   * Applies custom styles to the paginator elements.
   * - Hides the 'items per page' label.
   * - Styles the display of the range label (how many elements are currently displayed).
   */

  private styleDefaultPagination() {
    const nativeElement = this.elementRef.nativeElement;

    const itemsPerPage = nativeElement.querySelector(
      '.mat-mdc-paginator-page-size'
    );
    const howManyDisplayedEl = nativeElement.querySelector(
      '.mat-mdc-paginator-range-label'
    );

    // remove 'items per page'
    this.ren.setStyle(itemsPerPage, 'display', 'none');

    // style text of how many elements are currently displayed
    this.ren.setStyle(howManyDisplayedEl, 'position', 'absolute');
    this.ren.setStyle(howManyDisplayedEl, 'left', '0');
    this.ren.setStyle(howManyDisplayedEl, 'color', '#919191');
    this.ren.setStyle(howManyDisplayedEl, 'font-size', '14px');
  }

}
