/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './styles.scss';
import cx from 'classnames';
import { logo } from '../../../assets/images/svg/index';


const SliderCT = (props) => {
  const { imgs, descriptions } = props;
  const [idxItem, setIdxItem] = useState(0);
  const { length } = imgs;

  useEffect(() => {
    const timer = setInterval(() => {
      setIdxItem(prev => (prev + 1) % length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [length]);

  return (
    <div className="slider">
      <div className="arrow">
        <IoIosArrowBack
          className={cx(`arrow__item ${idxItem !== 0 ? 'arrow--action' : ''}`)}
          onClick={() => {
            if (idxItem !== 0) setIdxItem(prev => (prev - 1) % length);
          }}
        />
        <IoIosArrowForward
          className={cx(
            `arrow__item + ${idxItem !== length - 1 ? 'arrow--action' : ''}`,
          )}
          onClick={() => {
            if (idxItem !== length - 1) { setIdxItem(prev => (prev + 1) % length); }
          }}
        />
      </div>

      <div className="slider__interface">
        <div
          className="list"
          style={{ transform: `translateX(-${idxItem * 100}%)` }}
        >
          {imgs.map((img, idx) => (
            <div className="list__item" key={+idx}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>

        <div className="dots">
          {imgs.map((_, idx) => (
            <div
              className={
                  `dots__item ${idx === idxItem ? 'dots--active' : ''}`
                }
              key={+idx}
              onClick={() => setIdxItem(idx)}
              onMouseUp={() => {}}
              role="presentation"
            />
          ))}
        </div>
      </div>

      <div className="slider__introduce">
        <div className="slider__introduce__logo">
          <img src={logo} alt={logo} />
        </div>
        {descriptions.map((description, idx) => (
          <div
            className={
                `slider__introduce__description ${
                  idx === idxItem ? 'slider__introduce--active' : ''}`
              }
            key={+idx}
          >
            {description}
          </div>
        ))}
      </div>
    </div>
  );
};

SliderCT.defaultProps = {
  imgs: [],
  descriptions: [],
};

SliderCT.propTypes = {
  imgs: PropTypes.array,
  descriptions: PropTypes.array,
};

export default SliderCT;
