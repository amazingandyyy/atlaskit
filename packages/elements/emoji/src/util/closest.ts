/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Currently a polyfill would be required for browsers that don't support (IE11)
 * Returns the ancestor element of a particular type if exists or null
 */
export default function closest(
  node: HTMLElement | null,
  s: string,
): HTMLElement | null {
  let el = node as HTMLElement;
  if (!el) {
    return null;
  }
  if (!document.documentElement.contains(el)) {
    return null;
  }
  const matches = el.matches ? 'matches' : 'msMatchesSelector';

  do {
    if (el[matches](s)) {
      return el;
    }
    el = (el.parentElement || el.parentNode) as HTMLElement;
  } while (el !== null && el.nodeType === 1);
  return null;
}