/* eslint-disable consistent-return */
import { useEffect } from 'react';

export default function useWindowEvent(
  event,
  cb,
  win,
) {
  const _window = win === null
    ? null
    : win || (typeof window === 'undefined' ? undefined : window);

  useEffect(() => {
    if (
      typeof _window === 'undefined'
      || !(_window && _window.addEventListener)
    ) { return; }
    _window.addEventListener(event, cb);

    return () => {
      try {
        if (
          typeof _window === 'undefined'
          || !(_window && _window.removeEventListener)
        ) { return; }
        _window.removeEventListener(event, cb);
      } catch (error) {
        //
      }
    };
  }, [event, cb, _window]);
}
