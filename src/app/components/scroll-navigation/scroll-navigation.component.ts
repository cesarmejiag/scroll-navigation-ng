import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as ScrollMagic from 'scrollmagic';

@Component({
  selector: 'app-scroll-navigation',
  templateUrl: './scroll-navigation.component.html',
  styleUrls: ['./scroll-navigation.component.scss'],
})
export class ScrollNavigationComponent implements AfterViewInit {
  private controller: ScrollMagic.Controller;
  private stepScenes: ScrollMagic.Scene[] = [];
  private stepScene?: ScrollMagic.Scene;
  @ViewChild('steps') steps?: ElementRef;
  @ViewChild('slides') slides?: ElementRef;
  @ViewChildren('step') step?: QueryList<ElementRef>;
  data = [
    { text: 'Slide 1', image: '/assets/images/image-1.jpg' },
    { text: 'Slide 2', image: '/assets/images/image-2.jpg' },
    { text: 'Slide 3', image: '/assets/images/image-3.jpg' },
    { text: 'Slide 4', image: '/assets/images/image-4.jpg' },
  ];

  constructor() {
    this.controller = new ScrollMagic.Controller({});
  }

  @HostListener('window:resize', ['$event'])
  private handleResize(e: Event) {}

  private handleSceneEnd(e: ScrollMagic.Event<ScrollMagic.EventType>) {
    // console.log('end');
  }

  private handleSceneStart(e: ScrollMagic.Event<ScrollMagic.EventType>) {
    // console.log('start');
  }

  private initStepsScene() {
    const steps = this.steps?.nativeElement;
    const slides = this.slides?.nativeElement;
    const offset = window.innerHeight / 2;
    const duration = steps.clientHeight - slides.clientHeight;

    this.stepScene = new ScrollMagic.Scene({
      offset,
      duration,
      triggerElement: steps,
    })
      .setPin(this.slides?.nativeElement)
      .addTo(this.controller as ScrollMagic.Controller);
  }

  private initStepScene() {
    this.step?.toArray().forEach((step) => {
      const el = step.nativeElement;
      const scene = new ScrollMagic.Scene({
        duration: el.clientHeight,
        triggerElement: el,
      });

      scene
        .on('start', (e) => this.handleSceneStart(e))
        .on('end', (e) => this.handleSceneEnd(e))
        .addTo(this.controller as ScrollMagic.Controller);

      this.stepScenes?.push(scene);
    });
  }

  ngAfterViewInit(): void {
    this.initStepScene();
    this.initStepsScene();
  }
}
