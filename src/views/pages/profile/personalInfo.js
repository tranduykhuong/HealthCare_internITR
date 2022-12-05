import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InputCT from '../../components/inputCT';
import { dataRecoil, errorsRecoil, isSaveRecoil } from './recoil';
import { handleValidate } from './handler';
import ErrorMessage from '../../components/errormessage';


const PersonalInfo = () => {
  const setIsSave = useSetRecoilState(isSaveRecoil);
  const [data, setData] = useRecoilState(dataRecoil);
  const [errors, setErrors] = useRecoilState(errorsRecoil);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
    setErrors(handleValidate(e));
    setIsSave(true);
  };

  const handleBlur = (e) => {
    setErrors(handleValidate(e));
  };

  useEffect(() => {
    const genders = document.getElementsByName('gender');
    for (let i = 0; i < genders.length; i += 1) {
      if (genders[i].value === data.gender) {
        genders[i].checked = true;
      }
    }
    return genders;
  }, []);

  return (
    <>
      <div className="profile__name">
        <div className="input-item">
          <InputCT
            label="First name"
            placeholder="Enter first name"
            name="firstName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            message={errors.firstName}
            value={data.firstName}
          />
        </div>
        <div className="input-item">
          <InputCT
            label="Last name"
            placeholder="Enter last name"
            name="lastName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            message={errors.lastName}
            value={data.lastName}
          />
        </div>
      </div>

      <InputCT
        label="Date of birth"
        placeholder="DD/MM/YYYY"
        data-date=""
        name="dob"
        type="date"
        onChange={handleChange}
        onBlur={handleBlur}
        message={errors.dob}
        value={data.dob}
      />

      <div className="profile__gender">
        <h3>Gender</h3>
        <div className="gender-list">
          <div className="input-item">
            <input type="radio" id="male" name="gender" value="Male" onChange={handleChange} />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="input-item">
            <input type="radio" id="female" name="gender" value="Female" onChange={handleChange} />
            <Label htmlFor="female">Female</Label>
          </div>
        </div>
        <ErrorMessage />
      </div>
    </>
  );
};


PersonalInfo.propTypes = {

};


export default PersonalInfo;
