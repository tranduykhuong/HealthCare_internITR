import { useState } from 'react';

export default function useForceRerender() {
  const [, setValue] = useState(0);

  return () => setValue(value => value + 1);
}
