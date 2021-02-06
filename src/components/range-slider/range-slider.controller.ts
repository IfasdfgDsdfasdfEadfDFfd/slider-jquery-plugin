import { Controller } from '@core';

class RangeSliderController extends Controller {
  mapDispatch(): Partial<RangeSliderProps> {
    return {
      windowResizeHandler(event: Event): void {
        console.log('some event', event);
      },
    };
  }
}

export { RangeSliderController };