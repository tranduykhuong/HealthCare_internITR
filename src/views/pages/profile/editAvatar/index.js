import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { CgClose } from 'react-icons/cg';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { iconAvatar } from '../../../../assets/images/svg';
import ButtonCT from '../../../components/buttonCT';
import { avatarUrlRecoil, dataRecoil, isSaveRecoil } from '../recoil';
import { ToastError } from '../../../components/toastStr';
import fetchRequestFileUpload from '../../../../services/apollo/functions/fetchRequestFileUpload';
import useMergeState from '../../../../utils/hooks/useMergeState';

const EditAvatar = ({ setClose }) => {
  const setIsSave = useSetRecoilState(isSaveRecoil);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlRecoil);
  const [data, setData] = useRecoilState(dataRecoil);
  const [state, setState] = useMergeState({
    img: avatarUrl,
    error: '',
    loading: false,
  });

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file?.size > 1024 * 1024) {
      setState({ error: 'Failed to upload as your image size is too big.' });
    } else {
      setState({ error: '' });
      file.url = URL.createObjectURL(file);
      setState({ img: file });
    }
  };

  const handleRemoveImg = () => {
    if (state?.img) {
      URL.revokeObjectURL(state?.img?.url);
    }
    setState({ img: undefined });
  };

  const handleCloseError = () => {
    setState({ error: '' });
  };

  const handleClickSave = async () => {
    try {
      if (state?.img) {
        setState({ loading: true });
        const urls = await fetchRequestFileUpload({ amount: 1, type: 'png' });

        await fetch(urls[0], {
          method: 'PUT',
          headers: {
            'Content-Type': state?.img.type,
          },
          body: state?.img,
        });

        setAvatarUrl(state?.img);
        setData({ ...data, avatar: urls[0] });
        setIsSave(true);
        setClose(false);
      }
    } catch (err) {
      console.log(err);
    }
    setState({ loading: false });
  };


  return (
    <div className="edit-avatar">
      <div className="edit-avatar__heading">
        <h3>Profile Picture</h3>
        <div className="heading-btn">
          <div className="save-btn">
            <ButtonCT
              content="Save"
              primary
              loading={state?.loading}
              onClick={handleClickSave}
            />
          </div>
          <div
            className="close-btn"
            onClick={() => setClose(false)}
            onMouseUp={() => {}}
            role="presentation"
          >
            <CgClose className="icon" />
          </div>
        </div>
      </div>
      <div className="edit-avatar__content">
        <img
          className="edit-avatar__content__avatar"
          src={state?.img?.url || iconAvatar}
          alt=""
          width="200px"
          height="200px"
        />
        <div className="edit-avatar__content__btn">
          <div className="upload-btn">
            <ButtonCT content="Upload image" outlineBtn />
            <input
              className="file-upload"
              type="file"
              accept="image/*"
              onChange={onChangeFile}
            />
          </div>
          {state?.img && (
          <div className="upload-btn">
            <ButtonCT
              content="Remove image"
              outlineBtn
              pinkColor
              onClick={handleRemoveImg}
            />
          </div>
          )}
        </div>
        <div className="note">
          <p className="note">JPG or PNG. Maximum size 1Mb</p>
          {state?.error && (
          <ToastError
            message={state?.error}
            setClose={handleCloseError}
          />
          )}
        </div>
      </div>
    </div>
  );
};

EditAvatar.defaultProps = {
  setClose: null,
};

EditAvatar.propTypes = {
  setClose: PropTypes.func,
};


export default EditAvatar;
