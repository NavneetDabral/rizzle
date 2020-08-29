export const debounce = (func: any, wait: number, immediate: any) => {
  let timeout: any;

  return function executedFunction(this: any) {
    const context = this;
    const args = arguments;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  };
};
