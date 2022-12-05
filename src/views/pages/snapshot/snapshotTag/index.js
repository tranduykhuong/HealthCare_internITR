import React from 'react';
import { CgClose } from 'react-icons/cg';
import PropTypes from 'prop-types';
import './styles.scss';

const SnapshotTag = ({
  tag,
  iconClose, handleClickIcon,
}) => (
  <div className="snapshot-tag">
    <span>{tag}</span>
    {iconClose && (
      <div
        className="snapshot-tag__icon"
        onClick={handleClickIcon}
        onMouseUp={() => {}}
        role="presentation"
      >
        <CgClose className="icon" />
      </div>
    )}
  </div>
);

SnapshotTag.defaultProps = {
  tag: '',
  iconClose: false,
  handleClickIcon: null,
};

SnapshotTag.propTypes = {
  tag: PropTypes.string,
  iconClose: PropTypes.bool,
  handleClickIcon: PropTypes.func,
};


export default SnapshotTag;
