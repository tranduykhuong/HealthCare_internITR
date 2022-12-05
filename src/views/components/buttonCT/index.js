/* eslint-disable react/prop-types */
import React from 'react';
import './styles.scss';
import cx from 'classnames';
import { LoadingDonut } from '../loading';

function ButtonCT(props) {
  const {
    block,
    content,
    disabled,
    outlineBtn,
    noneOutlineBtn,
    textDark,
    textBlue,
    primary,
    icon,
    iconRight,
    pinkColor,
    large,
    small,
    loading,
    active,
    ...passProps
  } = props;

  return (
    <button
      className={cx('my-btn', {
        block,
        disabled,
        outlineBtn,
        noneOutlineBtn,
        textDark,
        textBlue,
        primary,
        pinkColor,
        large,
        small,
        active,
      })}
      {...passProps}
    >
      {loading ? <LoadingDonut small />
        : (
          <>
            {icon && <img src={icon} alt={icon} className={cx('my-btn__icon')} />}
            <span className={cx('my-btn__content')}>{content}</span>
            {iconRight && <img src={iconRight} alt={iconRight} className={cx('my-btn__iconRight')} />}
          </>
        )
      }
    </button>
  );
}

export default ButtonCT;
