const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const vendorify = (
  propName: string,
  capitalizeText: boolean = true,
): string => {
  let prefix = '';

  if (HTMLElement.prototype.webkitRequestFullscreen) {
    prefix = 'webkit';
  } else if (HTMLElement.prototype['mozRequestFullScreen']) {
    prefix = 'moz';
  } else if (HTMLElement.prototype['msRequestFullScreen']) {
    prefix = 'ms';
  }

  const capitalizeProp =
    capitalizeText !== undefined ? capitalizeText : !!prefix;

  return `${prefix}${capitalizeProp ? capitalize(propName) : propName}`;
};

export const requestFullscreen = (element: HTMLElement) => {
  const methodName = vendorify('requestFullScreen');
  console.log('methodName', methodName);

  if (methodName && element[methodName]) {
    element[methodName]();
  }
};

export const exitFullscreen = () => {
  const methodName = vendorify('exitFullscreen');

  if (methodName && document[methodName]) {
    document[methodName]();
  }
};

export const getFullscreenElement = (): HTMLElement | undefined => {
  const propertyName = vendorify('fullscreenElement');

  return propertyName && document[propertyName];
};

export const toggleFullscreen = (element?: HTMLElement) => {
  if (getFullscreenElement()) {
    exitFullscreen();
  } else if (element) {
    requestFullscreen(element);
  }
};
