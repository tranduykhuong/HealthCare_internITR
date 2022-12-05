/* eslint-disable no-useless-escape */
export const handleValidateEmail = (value) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!value) {
    return { email: 'This is a required field!' };
  } if (!regex.test(value)) {
    return { email: 'This in not a valid email format!' };
  }
  return { email: '' };
};

export const handleValidatePassword = (value) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!value) {
    return { password: 'This is a required field!' };
    // } else if (!regex.test(value)) {
    //   return {
    //     password:
    //       "At least 8 characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case character",
    //   };
  }
  return { password: '' };
};
