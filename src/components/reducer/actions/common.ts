/* I know this is an unjustified overcomplicated but I like it */

const makeValue = (
  value: number,
): { multipleBy: (step: number) => number } => ({
  multipleBy: step => {
    if (Math.abs(value) < step) {
      return value % step === 0 ? value : step;
    }

    if (Math.round(value) !== value && Math.round(step) === step) {
      value = Math.floor(value);
    }

    if (Math.round(value) === value && Math.round(step) !== step) {
      return value - Number((value % step).toFixed(2));
    }

    return value - Math.round(value % step);
  },
});

export { makeValue };
