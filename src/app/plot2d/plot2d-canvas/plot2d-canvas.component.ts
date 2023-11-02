import {
  Component,
  ViewChild,
  HostListener,
  ElementRef,
  Input,
  OnChanges,
  DoCheck,
  SimpleChanges,
  AfterViewInit,
  IterableDiffers,
  IterableDiffer} from '@angular/core';

import { Trace2D } from './trace2d.model';
import { NumericUtils } from 'mathcore/numeric-utils';

export enum DragMode {
  HandTool,
  MarqueeZoom
}

enum DeviceButton {
  Left = 0,
  Middle = 1,
  Right = 2
}

enum DeviceButtons {
  None = 0,
  Left = 1,
  Middle = 4,
  Right = 2
}

@Component({
  selector: 'app-plot2d-canvas',
  template: '<div><canvas #plot touch-action="none"></canvas><canvas #selection touch-action="none"></canvas></div>',
  styles: [
    ':host { width: 100%; height: 100%; }',
    'div { height: 100%; position: relative; }',
    'canvas { width:100%; height: 100%; touch-action: none; position: absolute; }'
  ]
  })
export class Plot2DCanvasComponent implements AfterViewInit, OnChanges, DoCheck {
  private readonly DefaultStepX: number = 60.0;
  private readonly DefaultStepY: number = 60.0;
  private readonly DefaultXAxisScaleInterval: number = 1.0;
  private readonly DefaultYAxisScaleInterval: number = 1.0;
  private readonly borderSize: number = 1;

  @Input()
  public traces: Trace2D[] = [];

  @Input()
  public isDarkMode: boolean = false;

  @Input()
  public backgroundColor: string = 'whitesmoke';

  @Input()
  public backgroundColorDark: string = '#303030';

  @Input()
  public foregroundColor: string = 'dimgray';

  @Input()
  public foregroundColorDark: string = 'dimgray';

  @Input()
  public gridlinesColor: string = 'silver';

  @Input()
  public gridlinesColorDark: string = '#4C4C4C';

  @Input()
  public borderColor: string = 'dimgray';

  @Input()
  public borderThickness: number = 1;

  @Input()
  public gridlinesVisibility: boolean = true;

  @Input()
  public axesVisibility: boolean = true;

  @Input()
  public axesColor: string = 'darkgray';

  @Input()
  public axesColorDark: string = 'darkgray';

  @Input()
  public axesThickness: number = 1.5;

  @Input()
  public typeface: string = 'Helvetica';

  @Input()
  public fontSize: number = 12.0;

  @Input()
  public selectedRegionColor: string = 'rgba(51, 153, 255, 0.37)';

  @Input()
  public selectedRegionBorderColor: string = 'cornflowerblue';

  @Input()
  public selectedRegionBorderThickness: number = 2;

  @Input()
  public selectedRegionBorderLineDash: number[] = [5, 5];

  @Input()
  public dragMode: 'MarqueeZoom' | 'HandTool' = 'HandTool';

  private get backgroundThemeColor() {
    return this.isDarkMode ? this.backgroundColorDark : this.backgroundColor;
  }

  private get foregroundThemeColor() {
    return this.isDarkMode ? this.foregroundColorDark : this.foregroundColor;
  }

  private get gridlinesThemeColor() {
    return this.isDarkMode ? this.gridlinesColorDark : this.gridlinesColor;
  }

  private get axesThemeColor() {
    return this.isDarkMode ? this.axesColorDark : this.axesColor;
  }

  private lastPointerPosition: Point = { x: 0, y: 0 };
  private selectedRegionPoint1: Point = { x: 0, y: 0 };
  private pointerEvents: PointerEvent[] = [];
  private previousPointersDistance: number = -1;
  private splashColor: string = 'rgba(128, 128, 200, 0.25)';
  private splashText: string = 'Moving Plot';
  private splashEmSize: number = 50.0;
  private currentDragState: DragMode = null;
  private context: CanvasRenderingContext2D;
  private selectedRegionContext: CanvasRenderingContext2D;
  private tracesDiffer: IterableDiffer<Trace2D>;
  private undoStack: ViewportState[] = [];
  private resizeTimer: NodeJS.Timeout = null;

  // Horizontal displacement of the center of the Plot2D.
  private horizOffset: number = 0.0;

  // Vertical displacement of the center of the Plot2D.
  private vertOffset: number = 0.0;

  private dx: number;
  private dy: number;

  // Scale interval on the x-axis.
  private xAxisScaleInterval: number;

  // Scale interval on the y-axis.
  private yAxisScaleInterval: number;


  @ViewChild('plot')
  private plotElement: ElementRef;

  @ViewChild('selection')
  private selectionElement: ElementRef;

  private get actualWidth() {
    return this.element.nativeElement.clientWidth;
  }

  private get actualHeight() {
    return this.element.nativeElement.clientHeight;
  }

  private get isElementVisible() {
    return this.element.nativeElement.offsetHeight * this.element.nativeElement.offsetWidth !== 0;
  }

  constructor(private element: ElementRef, iterableDiffers: IterableDiffers) {
    this.dx = this.DefaultStepX;
    this.dy = this.DefaultStepY;
    this.xAxisScaleInterval = this.DefaultXAxisScaleInterval;
    this.yAxisScaleInterval = this.DefaultYAxisScaleInterval;

    this.tracesDiffer = iterableDiffers.find([]).create();
  }

  ngAfterViewInit(): void {
    this.context = this.plotElement.nativeElement.getContext('2d');
    this.selectedRegionContext = this.selectionElement.nativeElement.getContext('2d');

    this.renderPlot();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.context) {
      this.renderPlot();
    }
  }

  ngDoCheck(): void {
    const tracesCollectionChanges = this.tracesDiffer.diff(this.traces);

    if (tracesCollectionChanges != null) {
      this.renderPlot();
    }
  }

  //#region Event Handlers

  @HostListener('window:resize')
  private windowResize() {
    if (this.isElementVisible) {
      this.renderPlot();
    } else if (this.resizeTimer == null) {
      this.resizeTimer = setInterval(() => {
        if (this.isElementVisible) {
          clearInterval(this.resizeTimer);
          this.resizeTimer = null;

          setTimeout(() => {
            this.renderPlot();
          }, 10);
        }
      }, 500);
    }
  }

  @HostListener('pointerdown', ['$event'])
  private onPointerDown(event: PointerEvent) {
    if (event.button === DeviceButton.Left && event.pointerType !== 'touch') {
      this.pointerEvents.push(event);
      this.undoStack.push(this.getViewport());

      if (this.dragMode === 'MarqueeZoom' || event.ctrlKey) {
        this.currentDragState = DragMode.MarqueeZoom;
        this.selectedRegionPoint1 = { x: event.offsetX, y: event.offsetY };
      } else if (this.dragMode === 'HandTool') {
        this.currentDragState = DragMode.HandTool;
        this.lastPointerPosition = { x: event.offsetX, y: event.offsetY };
      }

      // Make sure we get the MouseLeftButtonUp event even if the user
      // moves off the Canvas. Otherwise, two selection squares could be drawn at once.
      (<Element>event.target).setPointerCapture(event.pointerId);

      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('touchstart', ['$event'])
  private onTouchStart(event: TouchEvent | any): void {
    this.undoStack.push(this.getViewport());

    if (this.dragMode === 'MarqueeZoom') {
      this.currentDragState = DragMode.MarqueeZoom;
      this.selectedRegionPoint1 = this.getTouchOffset(event);
    } else if (this.dragMode === 'HandTool') {
      this.currentDragState = DragMode.HandTool;
      this.lastPointerPosition = this.getTouchOffset(event);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('pointermove', ['$event'])
  private onPointerMove(event: PointerEvent) {
    if (event.buttons === DeviceButtons.Left && event.pointerType !== 'touch') {
      this.updatePointerEvent(event);

      if (this.pointerEvents.length === 2 && this.currentDragState !== DragMode.MarqueeZoom) {
        const e1 = this.pointerEvents[0];
        const e2 = this.pointerEvents[1];
        this.pinchZoom({ x: e1.offsetX, y: e1.offsetY}, { x: e2.offsetX, y: e2.offsetY });
      } else if (this.currentDragState === DragMode.HandTool) {
        this.movePlot({ x: event.offsetX, y: event.offsetY });
      } else if (this.currentDragState === DragMode.MarqueeZoom) {
        const selectedRegionX = this.selectedRegionPoint1.x;
        const selectedRegionY = this.selectedRegionPoint1.y;
        const selectedRegionWidth = event.offsetX - this.selectedRegionPoint1.x;
        const selectedRegionHeight = event.offsetY - this.selectedRegionPoint1.y;
        this.renderSelectedRegion(selectedRegionX, selectedRegionY, selectedRegionWidth, selectedRegionHeight);
      }

      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(event: TouchEvent | any) {
    if (event.touches.length === 2 && this.currentDragState !== DragMode.MarqueeZoom) {
      const p1 = this.getTouchOffset(event, 0);
      const p2 = this.getTouchOffset(event, 1);
      this.pinchZoom(p1, p2);
    } else if (this.currentDragState === DragMode.HandTool) {
      this.movePlot(this.getTouchOffset(event));
    } else if (this.currentDragState === DragMode.MarqueeZoom) {
      const selectedRegionX = this.selectedRegionPoint1.x;
      const selectedRegionY = this.selectedRegionPoint1.y;
      const point = this.getTouchOffset(event);
      const selectedRegionWidth = point.x - this.selectedRegionPoint1.x;
      const selectedRegionHeight = point.y - this.selectedRegionPoint1.y;
      this.renderSelectedRegion(selectedRegionX, selectedRegionY, selectedRegionWidth, selectedRegionHeight);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('pointercancel', ['$event'])
  @HostListener('pointerout', ['$event'])
  @HostListener('pointerleave', ['$event'])
  private onPointerUp(event: PointerEvent) {
    if (event.button === DeviceButton.Left && event.pointerType !== 'touch') {
      if (this.currentDragState === DragMode.MarqueeZoom) {
        const p2: Point = { x: event.offsetX, y: event.offsetY};
        this.marqueeZoom(this.selectedRegionPoint1, p2);
      }

      this.removePointerEvent(event);
      if (this.pointerEvents.length < 2) {
        this.previousPointersDistance = -1;
      }

      (<Element>event.target).releasePointerCapture(event.pointerId);

      this.currentDragState = null;
      this.renderPlot();
      this.removeLastUnchangedViewport();

      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('touchcancel', ['$event'])
  @HostListener('touchend', ['$event'])
  private onTouchEnd(event: TouchEvent | any) {
    if (this.currentDragState === DragMode.MarqueeZoom) {
      const p2 = this.getTouchOffset(event);
      this.marqueeZoom(this.selectedRegionPoint1, p2);
    }

    if (event.touches.length < 2) {
      this.previousPointersDistance = -1;
    }

    this.currentDragState = null;
    this.renderPlot();
    this.removeLastUnchangedViewport();

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('wheel', ['$event'])
  private onWheel(event: WheelEvent) {
    const zoomCenterPoint = { x: event.offsetX, y: event.offsetY };
    const deltaZoom: number = -event.deltaY / 50.0;
    this.zoom(deltaZoom, zoomCenterPoint);

    event.preventDefault();
  }

  //#endregion

  //#region Rendering

  private renderPlot(): void {
    this.resizeCanvas();

    const w: number = Math.round(this.actualWidth);
    const h: number = Math.round(this.actualHeight);

    const mx: number = Math.round(w / 2.0);
    const my: number = Math.round(h / 2.0);

    if (w <= this.borderSize || h <= this.borderSize) {
      return;
    }

    const xMinView: number = (this.borderSize - mx - this.horizOffset) / this.dx;
    const xMaxView: number = (-this.borderSize + mx - this.horizOffset) / this.dx;

    const yMinView: number = (this.borderSize - my + this.vertOffset) / this.dy;
    const yMaxView: number = (-this.borderSize + my + this.vertOffset) / this.dy;

    // Vertical grid lines
    const visibleVertGridLines: number = (Math.floor(xMaxView) - Math.ceil(xMinView)) + 1;
    const firstVisibleVertLine: number = this.borderSize + (Math.ceil(xMinView) - xMinView) * this.dx;

    // Horizontal grid lines
    const visibleHorizGridLines: number = (Math.floor(yMaxView) - Math.ceil(yMinView)) + 1;
    const firstVisibleHorizLine: number = this.borderSize + (yMaxView - Math.floor(yMaxView)) * this.dy;

    // Rendering
    this.renderPlotBackground(w, h);
    this.renderGrid(w, h, visibleVertGridLines, firstVisibleVertLine, visibleHorizGridLines, firstVisibleHorizLine);
    this.renderRule(w, h, visibleVertGridLines, firstVisibleVertLine, visibleHorizGridLines, firstVisibleHorizLine);
    this.renderAxes(w, h, mx, my);
    this.renderTraces(mx, my, xMinView, xMaxView, yMinView, yMaxView);
    this.renderText(h, xMinView, yMaxView, visibleVertGridLines, firstVisibleVertLine, visibleHorizGridLines, firstVisibleHorizLine);
    this.renderClearBorders(w, h);
    this.renderBorders(w, h);
    this.renderSplashText(mx, my);
  }

  private renderPlotBackground(w: number, h: number): void {
    this.context.fillStyle = this.backgroundThemeColor;
    this.context.fillRect(0, 0, w, h);
  }

  private renderGrid(
      w: number,
      h: number,
      visibleVertGridLines: number,
      firstVisibleVertLine: number,
      visibleHorizGridLines: number,
      firstVisibleHorizLine: number): void {
    if (this.gridlinesVisibility) {
      this.context.beginPath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.gridlinesThemeColor;

      for (let i: number = 0; i < visibleVertGridLines; i++) {
        const x: number = firstVisibleVertLine + i * this.dx;

        this.context.moveTo(x, this.borderSize);
        this.context.lineTo(x, h - this.borderSize);
      }

      for (let i: number = 0; i < visibleHorizGridLines; i++) {
        const y: number = firstVisibleHorizLine + i * this.dy;

        this.context.moveTo(this.borderSize, y);
        this.context.lineTo(w - this.borderSize, y);
      }

      this.context.stroke();
    }
  }

  private renderRule(
      w: number,
      h: number,
      visibleVertGridLines: number,
      firstVisibleVertLine: number,
      visibleHorizGridLines: number,
      firstVisibleHorizLine: number): void {

    if (!this.gridlinesVisibility) {
      this.context.beginPath();
      this.context.strokeStyle = this.borderColor;
      this.context.lineWidth = this.borderThickness;

      for (let i: number = 0; i < visibleVertGridLines; i++) {
        const x: number = firstVisibleVertLine + i * this.dx;

        this.context.moveTo(x, this.borderSize + this.borderThickness);
        this.context.lineTo(x, this.borderSize + 7);

        this.context.moveTo(x, h - this.borderSize - this.borderThickness);
        this.context.lineTo(x, h - (this.borderSize + 7));
      }

      for (let i: number = 0; i < visibleHorizGridLines; i++) {
        const y: number = firstVisibleHorizLine + i * this.dy;

        this.context.moveTo(this.borderSize + this.borderThickness, y);
        this.context.lineTo(this.borderSize + 7, y);

        this.context.moveTo(w - this.borderSize - this.borderThickness, y);
        this.context.lineTo(w - (this.borderSize + 7), y);
      }

      this.context.stroke();
    }
  }

  private renderAxes(w: number, h: number, mx: number, my: number): void {
    this.context.beginPath();
    this.context.strokeStyle = this.axesThemeColor;
    this.context.lineWidth = this.axesThickness;

    if (this.axesVisibility && (((my + this.vertOffset) > this.borderSize) && ((my + this.vertOffset) < h - this.borderSize))) {
      this.context.moveTo(this.borderSize, my + this.vertOffset);
      this.context.lineTo(w - this.borderSize, my + this.vertOffset);
    }

    if (this.axesVisibility && (((mx + this.horizOffset) > this.borderSize) && ((mx + this.horizOffset) < w - this.borderSize))) {
      this.context.moveTo(mx + this.horizOffset, this.borderSize);
      this.context.lineTo(mx + this.horizOffset, h - this.borderSize);
    }

    this.context.stroke();
  }

  private renderTraces(mx: number, my: number, xMinView: number, xMaxView: number, yMinView: number, yMaxView: number): void {
    if (this.currentDragState == null) {
      const xMinViewScaled: number = xMinView * this.xAxisScaleInterval;
      const xMaxViewScaled: number = xMaxView * this.xAxisScaleInterval;

      const yMinViewScaled: number = yMinView * this.yAxisScaleInterval;
      const yMaxViewScaled: number = yMaxView * this.yAxisScaleInterval;

      const x_step: number = this.xAxisScaleInterval / this.dx;
      const inv_x_step: number = this.dx / this.xAxisScaleInterval;
      const inv_y_step: number = this.dy / this.yAxisScaleInterval;

      for (const trace of this.traces) {
        if (trace.display === false || trace.trace == null) {
          continue;
        }

        let x_min: number = trace.hasLowerBound ? trace.lowerBound : Number.NEGATIVE_INFINITY;
        let x_max: number = trace.hasUpperBound ? trace.upperBound : Number.POSITIVE_INFINITY;
        let yTemp: number;

        if (xMinViewScaled >= x_min) {
          x_min = xMinViewScaled;
        }

        if (xMaxViewScaled <= x_max) {
          x_max = xMaxViewScaled;
        }

        const points: number = Math.round((x_max - x_min) / x_step);

        const func: (number) => number = trace.trace;
        yTemp = func(x_min);

        this.context.beginPath();

        for (let i: number = 0; i < points; i++) {
          const x1 = x_min + i * x_step;
          const x2 = x1 + x_step;

          const y1 = yTemp;
          const y2 = func(x2);
          yTemp = y2;

          if (Math.abs(y1 - y2) > (yMaxViewScaled - yMinViewScaled)) {
            continue;
          }
          if (Number.isNaN(y1) || Number.isNaN(y2)) {
            continue;
          }

          if ((y1 >= yMaxViewScaled) && (y2 >= yMaxViewScaled)) {
            continue;
          }
          if ((y1 <= yMinViewScaled) && (y2 <= yMinViewScaled)) {
            continue;
          }

          const p1x = x1 * inv_x_step + mx + this.horizOffset;
          const p1y = -y1 * inv_y_step + my + this.vertOffset;
          const p2x = x2 * inv_x_step + mx + this.horizOffset;
          const p2y = -y2 * inv_y_step + my + this.vertOffset;

          this.context.moveTo(p1x, p1y);
          this.context.lineTo(p2x, p2y);
        }

        this.context.strokeStyle = trace.color;
        this.context.lineWidth = trace.lineThickness;
        this.context.stroke();
      }
    }
  }

  private renderClearBorders(w: number, h: number): void {
    this.context.fillStyle = this.backgroundThemeColor;

    this.context.fillRect(0, 0, this.borderSize, h); // Left border
    this.context.fillRect(this.borderSize, 0, w - this.borderSize, this.borderSize); // Top border
    this.context.fillRect(this.borderSize, h - this.borderSize, w - this.borderSize, this.borderSize); // Bottom border
    this.context.fillRect(w - this.borderSize, this.borderSize, this.borderSize, h - this.borderSize); // Right border
  }

  private renderBorders(w: number, h: number): void {
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = this.borderColor;
    this.context.rect(this.borderSize, this.borderSize, w - this.borderSize * 2, h - this.borderSize * 2);
    this.context.stroke();
  }

  private renderText(
      h: number,
      xMinView: number,
      yMaxView: number,
      visibleVertGridLines: number,
      firstVisibleVertLine: number,
      visibleHorizGridLines: number,
      firstVisibleHorizLine: number): void {
    this.context.fillStyle = this.foregroundThemeColor;
    this.context.direction = 'ltr';
    this.context.textBaseline = 'middle';
    this.context.font = this.getFontStyle(this.fontSize, this.typeface);

    // Vertical
    const firstVert: number = Math.ceil(xMinView);

    for (let i: number = 0; i < visibleVertGridLines; i++) {
      const text: string = NumericUtils.toPrecision((firstVert + i) * this.xAxisScaleInterval, 4);
      const textMetrics = this.context.measureText(text);

      const x: number = firstVisibleVertLine + i * this.dx - textMetrics.width / 2;
      const y: number = h - this.borderSize - this.fontSize / 2 - 2;

      this.context.fillStyle = this.backgroundThemeColor;
      this.context.fillRect(x, y - this.fontSize / 2, textMetrics.width, this.fontSize);
      this.context.fillStyle = this.foregroundThemeColor;
      this.context.fillText(text, x, y);
    }

    // Horizontal
    const firstHoriz: number = Math.floor(yMaxView);

    for (let i: number = 0; i < visibleHorizGridLines; i++) {
      const text: string = NumericUtils.toPrecision((firstHoriz - i) * this.yAxisScaleInterval, 4);
      const textMetrics = this.context.measureText(text);

      const x: number = this.borderSize + 2;
      const y: number = firstVisibleHorizLine + i * this.dy;

      this.context.fillStyle = this.backgroundThemeColor;
      this.context.fillRect(x, y - this.fontSize / 2, textMetrics.width, this.fontSize);
      this.context.fillStyle = this.foregroundThemeColor;
      this.context.fillText(text, x, y);
    }
  }

  private renderSplashText(mx: number, my: number): void {
    if (this.currentDragState === DragMode.HandTool) {
      this.context.fillStyle = this.splashColor;
      this.context.direction = 'ltr';
      this.context.font = this.getFontStyle(this.splashEmSize, this.typeface);
      const textMetrics = this.context.measureText(this.splashText);
      const textHeight = this.context.measureText('M').width;

      this.context.fillText(this.splashText, mx - textMetrics.width / 2, my - textHeight / 2);
    }
  }

  private renderSelectedRegion(x: number, y: number, w: number, h: number): void {
    this.selectedRegionContext.clearRect(0, 0, this.actualWidth, this.actualHeight);
    this.selectedRegionContext.fillStyle = this.selectedRegionColor;
    this.selectedRegionContext.fillRect(x, y, w, h);

    this.selectedRegionContext.beginPath();
    this.selectedRegionContext.strokeStyle = this.selectedRegionBorderColor;
    this.selectedRegionContext.setLineDash(this.selectedRegionBorderLineDash);
    this.selectedRegionContext.lineWidth = this.selectedRegionBorderThickness;
    this.selectedRegionContext.rect(x, y, w, h);
    this.selectedRegionContext.stroke();
  }

  //#endregion

  //#region Helpers

  public pointToPlot2DCoordinate(point: Point): Point {
    return {
      x: (point.x - this.actualWidth / 2.0 - this.horizOffset) / this.dx * this.xAxisScaleInterval,
      y: (-point.y + this.actualHeight / 2.0 + this.vertOffset) / this.dy * this.yAxisScaleInterval
    };
  }

  public getPlot2DViewport(): Rect {
    const p1: Point = this.pointToPlot2DCoordinate({ x: this.borderSize, y: this.borderSize });
    const p2: Point = this.pointToPlot2DCoordinate({ x: this.actualWidth - this.borderSize, y: this.actualHeight - this.borderSize });

    return {x: p1.x, y: p1.y, width: p2.x - p1.x, height: p1.y - p2.y };
  }

  public setPlot2DViewport(newViewport: Rect): void {
    if (newViewport.width * newViewport.height === 0) {
      return;
    }

    const currentViewport: Rect = this.getPlot2DViewport();

    this.xAxisScaleInterval /= (currentViewport.width / newViewport.width) * (this.dx / this.DefaultStepX);
    this.yAxisScaleInterval /= (currentViewport.height / newViewport.height) * (this.dy / this.DefaultStepY);
    this.dx = this.DefaultStepX;
    this.dy = this.DefaultStepY;

    this.horizOffset = this.borderSize - this.actualWidth / 2 - (newViewport.x * this.dx) / this.xAxisScaleInterval;
    this.vertOffset = this.borderSize - this.actualHeight / 2 + (newViewport.y * this.dy) / this.yAxisScaleInterval;

    this.renderPlot();
  }

  public undoZoomPan(): void {
    if (this.undoStack.length !== 0) {
      const viewportState = this.undoStack.pop();
      this.setViewport(viewportState);
    } else {
      this.resetViewport();
    }
  }

  public setViewport(state: ViewportState): void {
    this.horizOffset = state.horizOffset;
    this.vertOffset = state.vertOffset;
    this.dx = state.dx;
    this.dy = state.dy;
    this.xAxisScaleInterval = state.xAxisScaleInterval;
    this.yAxisScaleInterval = state.yAxisScaleInterval;

    this.renderPlot();
  }

  public getViewport(): ViewportState {
    return {
      horizOffset: this.horizOffset,
      vertOffset: this.vertOffset,
      dx: this.dx,
      dy: this.dy,
      xAxisScaleInterval: this.xAxisScaleInterval,
      yAxisScaleInterval: this.yAxisScaleInterval
    };
  }

  public resetViewport(): void {
    this.undoStack = [];

    this.horizOffset = 0.0;
    this.vertOffset = 0.0;

    this.dx = this.DefaultStepX;
    this.dy = this.DefaultStepY;
    this.xAxisScaleInterval = this.DefaultXAxisScaleInterval;
    this.yAxisScaleInterval = this.DefaultYAxisScaleInterval;

    this.renderPlot();
  }

  public zoom(deltaZoom: number, centerPoint?: Point): void {
    // Coordinates of the center point of Plot2D
    const coordCenterPoint = this.pointToPlot2DCoordinate({ x: centerPoint.x, y: centerPoint.y });

    this.dx += deltaZoom;
    this.dy += deltaZoom;

    const factor: number = 2.0;

    if (this.dx > this.DefaultStepX * factor) {
      this.dx = this.DefaultStepX + this.dx % (this.DefaultStepX * factor);
      this.xAxisScaleInterval /= (factor);
    } else if (this.dx < this.DefaultStepX / factor) {
      this.dx = this.DefaultStepX - (this.DefaultStepX / factor) % this.dx;
      this.xAxisScaleInterval *= (factor);
    }

    if (this.dy > this.DefaultStepY * factor) {
      this.dy = this.DefaultStepY + this.dy % (this.DefaultStepY * factor);
      this.yAxisScaleInterval /= (factor);
    } else if (this.dy < this.DefaultStepY / factor) {
      this.dy = this.DefaultStepY - (this.DefaultStepY / factor) % this.dy;
      this.yAxisScaleInterval *= (factor);
    }

    this.horizOffset = centerPoint.x - this.actualWidth / 2 - this.dx * coordCenterPoint.x / this.xAxisScaleInterval;
    this.vertOffset = centerPoint.y - this.actualHeight / 2 + this.dy * coordCenterPoint.y / this.yAxisScaleInterval;

    this.renderPlot();
  }

  private pinchZoom(p1: Point, p2: Point): void {
    const currentDistance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

    if (this.previousPointersDistance > 0) {
      const zoomDelta = (currentDistance - this.previousPointersDistance) * ((this.dx + this.dy) / 2) / currentDistance;
      const zoomCenterPoint = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
      };
      this.zoom(zoomDelta, zoomCenterPoint);
    }

    this.previousPointersDistance = currentDistance;
  }

  private marqueeZoom(p1: Point, p2: Point): void {
    const lt: Point = this.pointToPlot2DCoordinate({
      x: Math.min(p1.x, p2.x),
      y: Math.min(p1.y, p2.y)
    });

    const rb: Point = this.pointToPlot2DCoordinate({
      x: Math.max(p1.x, p2.x),
      y: Math.max(p1.y, p2.y)
    });

    const newViewport: Rect = { x: lt.x, y: lt.y, width: Math.abs(rb.x - lt.x), height: Math.abs(lt.y - rb.y) };
    this.setPlot2DViewport(newViewport);

    this.selectedRegionContext.clearRect(0, 0, this.actualWidth, this.actualHeight);
  }

  private movePlot(currentPointerPosition: Point): void {
    this.horizOffset += currentPointerPosition.x - this.lastPointerPosition.x;
    this.vertOffset += currentPointerPosition.y - this.lastPointerPosition.y;

    this.lastPointerPosition = currentPointerPosition;

    this.renderPlot();
  }

  private getFontStyle(fontSize: number, typeface: string) {
    return `${fontSize}px ${typeface}`;
  }

  private resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    const width = this.actualWidth * dpr;
    const height = this.actualHeight * dpr;

    let changed = false;

    if (this.plotElement.nativeElement.width !== width) {
      this.plotElement.nativeElement.width = this.selectionElement.nativeElement.width = width;
      changed = true;
    }

    if (this.plotElement.nativeElement.height !== height) {
      this.plotElement.nativeElement.height = this.selectionElement.nativeElement.height = height;
      changed = true;
    }

    if (changed) {
      this.context.scale(dpr, dpr);
      this.selectedRegionContext.scale(dpr, dpr);
    }
  }

  private getTouchOffset(event: TouchEvent | any, touchIndex: number = 0): Point {
    let touch: Touch;

    if (event.type.toLowerCase() === 'touchend') {
      touch = event.changedTouches[touchIndex];
    } else {
      touch = event.touches[touchIndex];
    }

    const rect = (<Element>event.target).getBoundingClientRect();

    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  private removeLastUnchangedViewport() {
    if (this.undoStack.length > 0 &&
      (JSON.stringify(this.undoStack[this.undoStack.length - 1]) === JSON.stringify(this.getViewport()))) {
      this.undoStack.pop();
    }
  }

  private updatePointerEvent(event: PointerEvent) {
    for (let i = 0; i < this.pointerEvents.length; i++) {
      if (event.pointerId === this.pointerEvents[i].pointerId) {
        this.pointerEvents[i] = event;
        break;
      }
    }
  }

  private removePointerEvent(event: PointerEvent) {
    for (let i = 0; i < this.pointerEvents.length; i++) {
      if (this.pointerEvents[i].pointerId === event.pointerId) {
        this.pointerEvents.splice(i, 1);
        break;
      }
    }
  }

  //#endregion
}

interface Point {
  readonly x: number;
  readonly y: number;
}

interface Rect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface ViewportState {
  horizOffset: number;
  vertOffset: number;
  dx: number;
  dy: number;
  xAxisScaleInterval: number;
  yAxisScaleInterval: number;
}
