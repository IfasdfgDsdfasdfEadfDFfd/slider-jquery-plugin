import { IRangeSliderStore } from '../reducer';
import { EventCallback, Provider, Store } from '../../core';
import { actions } from '../reducer';
import { HiddenView } from '../../core/shortcuts';

import styles from '../../exports.scss';


export class InputRange extends HiddenView {
  readonly hidingElementClassName = 'range-slider__input--hidden';

  constructor(marker: RangeSliderThumbMarker) {
    super({tag: 'input', attrs: {type: 'range', class: 'range-slider__input'}, children: [marker]});
  }

  set value(nextValue: number) {
    this.element.setAttribute('value', nextValue.toString());
    (this.element as HTMLInputElement).value = nextValue.toString();
  }

  get value(): number {
    return parseInt(<string>this.element.getAttribute('value'));
  }

  set min(nextMin: number) {
    this.element.setAttribute('min', nextMin.toString());
  }

  set max(nextMax: number) {
    this.element.setAttribute('max', nextMax.toString());
  }

  set step(nextStep: number) {
    this.element.setAttribute('step', nextStep.toString());
  }

  set intervalMode(apply: boolean) {
    const className = 'range-slider__input--interval';
    this.element.classList.toggle(className, apply);
  }

  onChange(cb: EventCallback) {
    this.element.addEventListener('input', cb);
  }
}



export abstract class RangeSliderInputRange extends Provider<IRangeSliderStore, {
  input: InputRange,
  marker: RangeSliderThumbMarker,
}> {
  init(_store?: Store<IRangeSliderStore>) {
    this.elements.marker = new RangeSliderThumbMarker();
    this.elements.input = new InputRange(this.elements.marker);
  }

  render(state: IRangeSliderStore) {
    this.elements.input.min = state.min;
    this.elements.input.max = state.max;
    this.elements.input.step = state.step;
    this.elements.input.intervalMode = state.intervalMode;

  }
}

export class LeftRangeSliderInputRange extends RangeSliderInputRange {
  init(store: Store<IRangeSliderStore>) {
    super.init();

    this.elements.input.onChange(event => {
      store.dispatch({
        type: actions.CHANGE_LEFT_VALUE,
        value: parseInt(event.target.value),
      })
    })
  }

  render(state: IRangeSliderStore) {
    super.render(state);

    if (state.intervalMode) {
      this.elements.input.value = state.value[0];
    } else {
      this.elements.input.value = state.min;
    }
    this.elements.input.hidden = !state.intervalMode;

    this.elements.marker.hidden = !state.markerVisibility || !state.intervalMode;
    this.elements.marker.value = state.value[0];
    this.elements.marker.position = {max: state.max, min: state.min, value: state.value[0]};
  }
}

export class RightRangeSliderInputRange extends RangeSliderInputRange {
  init(store: Store<IRangeSliderStore>) {
    super.init();

    this.elements.input.onChange(event => {
      store.dispatch({
        type: actions.CHANGE_RIGHT_VALUE,
        value: parseInt(event.target.value),
      })
    })
  }

  render(state: IRangeSliderStore) {
    super.render(state);
    this.elements.input.value = state.value[1];

    this.elements.marker.hidden = !state.markerVisibility;
    this.elements.marker.value = state.value[1];
    this.elements.marker.position = {max: state.max, min: state.min, value: state.value[1]};
  }
}

export class RangeSliderThumbMarker extends HiddenView {
  readonly hidingElementClassName = 'range-slider__thumb-marker--hidden';

  constructor() {
    super({ tag: 'div', attrs: { class: 'range-slider__thumb-marker' }, children: [String()]});
  }

  set value(value: number) {
    this.element.replaceChild(document.createTextNode(value.toString()), this.element.firstChild as Node);
  }

  set position({max, min, value}: {max: number, min: number, value: number}) {
    const thumbWidth = <number>parseInt(styles.thumbWidth) * parseInt(styles.rootFontSize);
    const sliderWidth = <number>this.element.parentElement?.clientWidth;

    const ratio = (value - min) / (max - min);

    const thumbPercent = (thumbWidth / sliderWidth) * 100;
    const offset = ((thumbWidth - this.element.clientWidth) / 2 / sliderWidth) * 100;
    const percent = (ratio * 100);

    this.element.style.setProperty('left', `${percent - (thumbPercent * ratio) + offset}%`);
  }
}