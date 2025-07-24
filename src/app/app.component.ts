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

  flagVariavle: boolean = false;
  flagExponente: boolean = false;
  flagFraccion: boolean = false;
  flagRaiz: boolean = false;
  flagRaizN: boolean = false;

  ecuacion = '';


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

  setVarible() {
    this.flagVariavle = true;
    this.flagExponente = false;
    this.flagFraccion = false;
    this.flagRaiz = false;
    this.flagRaizN = false;
  }

  setExponente() {
    this.flagVariavle = false;
    this.flagExponente = true;
    this.flagFraccion = false;
    this.flagRaiz = false;
    this.flagRaizN = false;
  }

  setFraccion() {
    this.flagVariavle = false;
    this.flagExponente = false;
    this.flagFraccion = true;
    this.flagRaiz = false;
    this.flagRaizN = false;
  }

  setRaiz() {
    this.flagVariavle = false;
    this.flagExponente = false;
    this.flagFraccion = false;
    this.flagRaiz = true;
    this.flagRaizN = false;
  }

  setRaizN() {
    this.flagVariavle = false;
    this.flagExponente = false;
    this.flagFraccion = false;
    this.flagRaiz = false;
    this.flagRaizN = true;
  }

  generateVariable(data1: any) {
    const value1 = data1.value

    let expresion = this.indep.replace('x', value1);

    this.ecuacion += expresion;

    katex.render(this.ecuacion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

  generateExponente(data1: any, data2:any) {
    const value1 = data1.value
    const value2 = data2.value
    
    let expresion = this.potencia.replace('x', value1).replace('n', value2);

    this.ecuacion += expresion;

    katex.render(this.ecuacion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

  generateFraccion(data1: any, data2:any) {
    const value1 = data1.value
    const value2 = data2.value
    
    let expresion = this.fraccion.replace('x', value1).replace('y', value2);

    this.ecuacion += expresion;

    katex.render(this.ecuacion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

  generateRaiz(data1: any) {
    const value1 = data1.value
    
    let expresion = this.raizX.replace('x', value1);

    this.ecuacion += expresion;

    katex.render(this.ecuacion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

  generateRaizN(data1: any, data2:any) {
    const value1 = data1.value
    const value2 = data2.value
    
    let expresion = this.raizNX.replace('n', value1).replace('x', value2);

    this.ecuacion += expresion;

    katex.render(this.ecuacion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

  signo(value: any) {
    this.ecuacion += value;

    katex.render(this.ecuacion, this.resultado.nativeElement, {
      throwOnError: false
    });
  }

}
