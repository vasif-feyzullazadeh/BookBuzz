export const debounce = (func: any, time: number) => {
  let timer: any;
  const that = this;
  return function (...args: any) {
    const context = that;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, time);
  };
};
