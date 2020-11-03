import {
  CHANGE_LEFT_VALUE,
  CHANGE_RIGHT_VALUE,
  getValue,
} from './change-value';
import { CHANGE_MIN, getMin } from './change-min';
import { CHANGE_MAX, getMax } from './change-max';
import { CHANGE_STEP } from './change-step';

const actionNames = {
  CHANGE_LEFT_VALUE,
  CHANGE_RIGHT_VALUE,
  CHANGE_MIN,
  CHANGE_MAX,
  CHANGE_STEP,
  CHANGE_PREFIX: '@CHANGE_PREFIX',
  CHANGE_ORIENT: '@CHANGE_ORIENT',
  CHANGE_INTERVAL_MODE: '@CHANGE_INTERVAL_MODE',
  CHANGE_MARKER_VISIBILITY: '@CHANGE_MARKER_VISIBILITY',
  CHANGE_TRACK_SCALE_VISIBILITY: '@CHANGE_TRACK_SCALE_VISIBILITY',
};

export { actionNames, getValue, getMin, getMax };
