import { createRangeSlider } from './components';
import { actionNames, IRangeSliderState } from './components/reducer';

interface PluginApi {
  subscribe(cb: (state: IRangeSliderState) => void): void;
  setLeftValue(value: number): void;
  setRightValue(value: number): void;
  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setOrientVertical(value: boolean): void;
  setIntervalMode(value: boolean): void;
  setMarkerVisibility(value: boolean): void;
  setTrackScaleVisibility(value: boolean): void;
}

function rangeSlider(
  this: JQuery,
  props: Partial<IRangeSliderState> = {},
): PluginApi {
  const store = createRangeSlider(this.get(0), props);

  return {
    subscribe(cb: (state: IRangeSliderState) => void) {
      store.subscribe(cb);
    },

    setLeftValue(value: number) {
      store.dispatch({ name: actionNames.CHANGE_LEFT_VALUE, value });
    },

    setRightValue(value: number) {
      store.dispatch({ name: actionNames.CHANGE_RIGHT_VALUE, value });
    },

    setMin(value: number) {
      store.dispatch({ name: actionNames.CHANGE_MIN, value });
    },

    setMax(value: number) {
      store.dispatch({ name: actionNames.CHANGE_MAX, value });
    },

    setStep(value: number) {
      store.dispatch({ name: actionNames.CHANGE_STEP, value });
    },

    setOrientVertical(value: boolean) {
      store.dispatch({ name: actionNames.CHANGE_ORIENT, value });
    },

    setIntervalMode(value: boolean) {
      store.dispatch({ name: actionNames.CHANGE_INTERVAL_MODE, value });
    },

    setMarkerVisibility(value: boolean) {
      store.dispatch({ name: actionNames.CHANGE_MARKER_VISIBILITY, value });
    },

    setTrackScaleVisibility(value: boolean) {
      store.dispatch({
        name: actionNames.CHANGE_TRACK_SCALE_VISIBILITY,
        value,
      });
    },
  };
}

export { rangeSlider };
