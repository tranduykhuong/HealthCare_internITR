/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import './styles.scss';
import { iconAvatar, iconEdit, logo } from '../../../assets/images/svg';
import ButtonCT from '../../components/buttonCT';
import useMergeState from '../../../utils/hooks/useMergeState';
import {
  avatarUrlRecoil,
  CmUnit, dataRecoil, errorsRecoil, isSaveRecoil, KgUnit,
} from './recoil';
import ModalCT from '../../components/modalCT';
import EditAvatar from './editAvatar';
import updateProfileRequest from '../../../redux/actions/updateProfile';
import { ToastError, ToastSuccess } from '../../components/toastStr';
import Measurement from './measurement';
import PersonalInfo from './personalInfo';

const ProfileRecoil = () => {
  const dispatch = useDispatch();
  const me = useSelector(state => state.login);
  const history = useHistory();
  const cmUnit = useRecoilValue(CmUnit);
  const kgUnit = useRecoilValue(KgUnit);
  const setErrors = useSetRecoilState(errorsRecoil);
  const [avatarUrl, setAvatarUrl] = useRecoilState(avatarUrlRecoil);
  const [isSave, setIsSave] = useRecoilState(isSaveRecoil);
  const [data, setData] = useRecoilState(dataRecoil);
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useMergeState({
    loading: false,
    isSave: false,
    toastError: false,
    toastSuccess: false,
  });

  const handleCloseToastError = () => {
    setState({ toastError: false });
  };
  const handleCloseToastSuccess = () => {
    setState({ toastSuccess: false });
  };

  const handleSave = async () => {
    let isDataValid = true;
    for (const x in data) {
      if ((data[x] === '' && x !== 'avatar') || data[x] === 0) {
        setErrors({ [x]: 'This is a required field!' });
        isDataValid = false;
      } else {
        setErrors({ [x]: '' });
      }
    }

    if (isDataValid) {
      setState({ loading: true, isSave: false });
      try {
        await dispatch(updateProfileRequest(data));
        setState({ loading: false, toastSuccess: true });
      } catch (err) {
        setState({ loading: false, toastError: true });
        console.log(err);
      }
    }
    setIsSave(false);
  };

  useEffect(() => {
    setData({ ...data, height: cmUnit });
  }, [cmUnit]);
  useEffect(() => {
    setData({ ...data, weight: kgUnit });
  }, [kgUnit]);

  useEffect(() => {
    setAvatarUrl({ url: me?.avatar });
    setData({
      firstName: me?.firstName || '',
      lastName: me?.lastName || '',
      gender: me?.gender || 'Male',
      height: me?.height || '',
      weight: me?.weight || '',
      dob: me?.dateOfBirth ? me?.dateOfBirth.substring(0, 10) : '',
      email: me?.email || 'aghtr245@example.com',
    });
  }, []);

  return (
    <>
      {openModal
      && (
      <ModalCT>
        <EditAvatar setClose={setOpenModal} setData={setData} />
      </ModalCT>
      )}

      <div className="profile-wrap">
        <div
          className="back-btn"
          onClick={() => history.push('/overview')}
          onKeyUp={() => {}}
          role="presentation"
        >
          <AiOutlineArrowLeft className="iconArrow" />
        </div>
        <div className="profile">
          <img src={logo} alt="logo" width="200px" />

          {/* Edit profile */}
          {me?.isProfileCompleted ? (
            <>
              <div className="toast-message">
                {state.toastError && (
                <ToastError
                  title="Something went wrong!"
                  message="Could not update your profile. Please try again."
                  setClose={handleCloseToastError}
                />
                )}
                {state.toastSuccess && (
                <ToastSuccess
                  message="Update successfully!"
                  setClose={handleCloseToastSuccess}
                />
                )}
              </div>
              <div className="profile__heading">
                <div className="heading-edit">
                  <h2>Edit profile</h2>
                  <ButtonCT
                    content="Save"
                    disabled={!isSave}
                    primary
                    loading={state.loading}
                    onClick={handleSave}
                  />
                </div>
              </div>
            </>
        )
            : (
              // Complete profile
              <div className="profile__heading">
                <h2>Complete your profile</h2>
                <p>Please enter the information below. All fileld are required.</p>
              </div>
          )}

          <div className="profile__email">
            <div
              className="avatar"
              onClick={() => setOpenModal(true)}
              onKeyUp={() => {}}
              role="presentation"
            >
              <img src={avatarUrl?.url || iconAvatar} alt="avatar" width="70px" height="70px" />
              <div className="avatar__edit">
                <img src={iconEdit} alt="" width="14px" height="14px" />
              </div>
            </div>
            <div className="email-infor">
              <h3>Email</h3>
              <p>{data.email}</p>
            </div>
          </div>

          <PersonalInfo />
          <Measurement />

          {!me?.isProfileCompleted
          && (
            <>
              <div className="toast-message">
                {state.toastError && (
                <ToastError
                  title="Something went wrong!"
                  message="Could not update your profile. Please try again."
                  setClose={handleCloseToastError}
                />
                )}
                {state.toastSuccess && (
                <ToastSuccess
                  message="Update successfully!"
                  setClose={handleCloseToastSuccess}
                />
                )}
              </div>
              <ButtonCT
                content="Save"
                disabled={!isSave}
                primary
                loading={state.loading}
                onClick={handleSave}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const Profile = () => (
  <RecoilRoot>
    <ProfileRecoil />
  </RecoilRoot>
);
export default Profile;
