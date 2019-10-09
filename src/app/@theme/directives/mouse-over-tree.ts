import { Directive, ElementRef, HostListener } from '@angular/core';
 
@Directive({
    selector: '[selectDirective]'
})
export class selectDirective {
 
    constructor(private element: ElementRef){}
 
    @HostListener('mouseenter')
    public onMouseEnter(){
        this.element.nativeElement.style.backgroundColor = '#5dcfe3';
    }
 
    @HostListener('mouseleave')
    public onMouseLeave(){
        this.element.nativeElement.style.backgroundColor = '';
    }
 
}