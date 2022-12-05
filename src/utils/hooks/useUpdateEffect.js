import { useRef, useEffect } from 'react';
import _ from 'lodash';

export default function useUpdateEffect(effect, dependencies = [], cleanup) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
    return cleanup;
  }, dependencies);
}
