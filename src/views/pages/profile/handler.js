
export const handleValidate = (e) => {
  if (e.target.value === '' || e.target.value === 0) {
    return {
      [e.target.name]: 'This is a required field!',
    };
  }
  return {
    [e.target.name]: '',
  };
};


export const handleCm = (e) => {
  // const setCm = useSetRecoilState(Cm);
  // setCm(e);
};

export const handleFt = (e) => {
  // const setFt = useSetRecoilState(Ft);
  // setFt(e);
};

export const handleIn = (e) => {
  // const setIn = useSetRecoilState(In);
  // setIn(e);
};
