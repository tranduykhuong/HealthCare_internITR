import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonCT from '../../components/buttonCT';
import {
  CmUnit, errorsRecoil, FtUnit, InUnit, isSaveRecoil, KgUnit, LbsUnit, Unit,
} from './recoil';
import InputCT from '../../components/inputCT';
import { handleValidate } from './handler';

const Measurement = () => {
  const [unit, setUnit] = useRecoilState(Unit);
  const [ftUnit, setFt] = useRecoilState(FtUnit);
  const [inUnit, setIn] = useRecoilState(InUnit);
  const [cmUnit, setCm] = useRecoilState(CmUnit);
  const [kgUnit, setKg] = useRecoilState(KgUnit);
  const [lbsUnit, setLbs] = useRecoilState(LbsUnit);
  const [errors, setErrors] = useRecoilState(errorsRecoil);
  const setIsSave = useSetRecoilState(isSaveRecoil);

  const handleCm = (e) => {
    setCm(+e.target.value || 0);
  };

  const handleKg = (e) => {
    setKg(+e.target.value || 0);
  };

  const handleBlur = (e) => {
    setErrors(handleValidate(e));
    setIsSave(true);
  };

  return (
    <>
      <div className="profile__measurement">
        <h3>System of measurement</h3>
        <div className="measurement-list">
          <div className="input-item">
            <ButtonCT
              content="Imperial (ft,lb)"
              small
              noneOutlineBtn
              onClick={() => setUnit('ft')}
              active={unit === 'ft' ? 'active' : ''}
            />
          </div>
          <div className="input-item">
            <ButtonCT
              content="Metric (cm,kg)"
              small
              noneOutlineBtn
              onClick={() => setUnit('cm')}
              active={unit === 'cm' ? 'active' : ''}
            />
          </div>
        </div>
      </div>

      {unit === 'ft' ? (
        <>
          <div className="profile__height">
            <div className="input-item">
              <InputCT
                label="Height"
                placeholder="Ex: 5"
                name="height"
                type="number"
                unit="ft"
                onChange={setFt}
                onBlur={handleBlur}
                message={errors.height}
                value={ftUnit === 0 ? '' : ftUnit}
              />
            </div>
            <div className="input-item">
              <InputCT
                label="-"
                placeholder="Ex: 5"
                name="height"
                type="number"
                unit="in"
                onChange={setIn}
                onBlur={handleBlur}
                message={errors.height}
                value={inUnit === 0 ? '' : inUnit}
              />
            </div>
          </div>
          <InputCT
            label="Weight"
            placeholder="Ex: 150"
            name="weight"
            type="number"
            unit="lbs"
            onChange={setLbs}
            onBlur={handleBlur}
            message={errors.weight}
            value={lbsUnit === 0 ? '' : Math.round(lbsUnit)}
          />
        </>
      )
        : (
          <>
            <InputCT
              label="Height"
              placeholder="Ex: 5"
              name="height"
              type="number"
              unit="cm"
              onChange={handleCm}
              onBlur={handleBlur}
              message={errors.height}
              value={cmUnit === 0 ? '' : cmUnit}
            />
            <InputCT
              label="Weight"
              placeholder="Ex: 150"
              name="weight"
              type="number"
              unit="kg"
              onChange={handleKg}
              onBlur={handleBlur}
              message={errors.weight}
              value={kgUnit === 0 ? '' : Math.round(kgUnit)}
            />
          </>
        )}
    </>
  );
};


Measurement.propTypes = {

};


export default Measurement;
