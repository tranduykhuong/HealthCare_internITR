import { useState } from 'react';
import _ from 'lodash';

export default function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => setState((prevState) => {
    const expectedState = _.assign(prevState, newState);
    return { ...expectedState };
  });
  return [state, setMergedState];
}
