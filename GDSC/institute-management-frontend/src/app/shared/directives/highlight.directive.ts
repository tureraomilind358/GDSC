import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit, OnDestroy {
  @Input() appHighlight: string = '';
  @Input() highlightColor: string = 'yellow';
  @Input() caseSensitive: boolean = false;

  private originalText: string = '';
  private observer: MutationObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.originalText = this.el.nativeElement.textContent || '';
    this.highlight();
    this.observeChanges();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private highlight(): void {
    if (!this.appHighlight || !this.originalText) return;

    const text = this.el.nativeElement.textContent || '';
    const searchTerm = this.appHighlight;
    
    if (this.caseSensitive) {
      if (text.includes(searchTerm)) {
        const regex = new RegExp(`(${searchTerm})`, 'g');
        const highlightedText = text.replace(regex, `<span style="background-color: ${this.highlightColor}">$1</span>`);
        this.el.nativeElement.innerHTML = highlightedText;
      }
    } else {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      const highlightedText = text.replace(regex, `<span style="background-color: ${this.highlightColor}">$1</span>`);
      this.el.nativeElement.innerHTML = highlightedText;
    }
  }

  private observeChanges(): void {
    this.observer = new MutationObserver(() => {
      const currentText = this.el.nativeElement.textContent || '';
      if (currentText !== this.originalText) {
        this.originalText = currentText;
        this.highlight();
      }
    });

    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
}
