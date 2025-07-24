import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import katex from 'katex';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('independiente') indepContainer!: ElementRef;
  @ViewChild('potencia') potenciaContainer!: ElementRef;
  @ViewChild('fraccion') fraccionContainer!: ElementRef;
  @ViewChild('raizX') raizXContainer!: ElementRef;
  @ViewChild('raizNX') raizNXContainer!: ElementRef;
  @ViewChild('resultado') resultado!: ElementRef;

  indep = 'x';
  fraccion = '\\frac{x}{y}';
  potencia = 'x^{n}';
  raizX = '\\sqrt{x}';
  raizNX = '\\sqrt[n]{x}';


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      katex.render(this.fraccion, this.fraccionContainer.nativeElement, {
        throwOnError: false
      });

      katex.render(this.potencia, this.potenciaContainer.nativeElement, {
        throwOnError: false
      });

      katex.render(this.raizX, this.raizXContainer.nativeElement, {
        throwOnError: false
      });

      katex.render(this.raizNX, this.raizNXContainer.nativeElement, {
        throwOnError: false
      });

      katex.render(this.indep, this.indepContainer.nativeElement, {
        throwOnError: false
      });
    }
  }

  setEcuancion(expresion: string, inputTxt: HTMLInputElement) {
    let exp;
    if(expresion == 'variable') {
      exp = ' x ';
    }
    else if(expresion == 'exponente') {
      exp = ' x^{n} ';
    }
    else if(expresion == 'fraccion') {
      exp = ' frac{x}{y} ';
    }
    else if(expresion == 'raiz') {
      exp = ' sqrt{x} ';
    }
    else if(expresion == 'raizN') {
      exp = ' sqrt[n]{x} '
    }

    const pos = inputTxt.selectionStart ?? 0;
    const value = inputTxt.value;
    const nuevaExpresion = value.slice(0, pos) + exp + value.slice(pos);
    inputTxt.value = nuevaExpresion;
  }

  generateEquation(inputExpresion: HTMLInputElement) {
    const expresion = inputExpresion.value.replace('frac', '\\frac').replace('sqrt', '\\sqrt').replace(/ /g, "")
    
    katex.render(expresion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

}
