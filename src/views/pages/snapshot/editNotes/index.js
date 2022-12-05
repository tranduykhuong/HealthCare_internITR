import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import * as _ from 'lodash';
import { BiSearch } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import cx from 'classnames';
import { useRecoilState } from 'recoil';
import ButtonCT from '../../../components/buttonCT';
import SnapshotTag from '../snapshotTag';
import { TAGS_GROUP } from '../handler';
import useMergeState from '../../../../utils/hooks/useMergeState';
import { currentSnapshotRecoil, snapshotsListRecoil } from '../recoil';
import handleUpdateSnapshot from '../../../../services/apollo/functions/handleUpdateSnapshot';
import { ToastError, ToastSuccess } from '../../../components/toastStr';
import { handleInitTagList, handleUnselectedTagList } from './handler';

const EditNotes = ({ setOpen }) => {
  const [currentSnapshot, setCurrentSnapshot] = useRecoilState(currentSnapshotRecoil);
  const [dataList, setDataList] = useRecoilState(snapshotsListRecoil);
  const [searchText, setSearchText] = useState('');
  const [values, setValues] = useMergeState({
    tagsList: JSON.parse(JSON.stringify(TAGS_GROUP)),
    tagsSelected: currentSnapshot?.tags,
    note: currentSnapshot?.note,
  });
  const [state, setState] = useMergeState({
    tag: 'symptoms',
    loading: false,
    isSuccess: 0,
  });

  const handleSave = async () => {
    const input = {
      id: currentSnapshot?._id,
      tags: values.tagsSelected,
      note: values.note,
    };

    try {
      setState({ loading: true });
      const result = await handleUpdateSnapshot(input);
      if (result?.isSuccess) {
        setState({ isSuccess: 1 });
        setCurrentSnapshot({ ...currentSnapshot, tags: values.tagsSelected, note: values.note });

        const newDataList = _.map(dataList, (item) => {
          const tmp = { ...item };
          if (item?._id === currentSnapshot?._id) {
            tmp.tags = values.tagsSelected;
            tmp.note = values.note;
          }
          return tmp;
        });
        setDataList(newDataList);
      } else {
        setState({ isSuccess: -1 });
      }
    } catch (err) {
      console.log(err);
    }
    setState({ loading: false });
  };

  const handleSelectTag = (item) => {
    if (!item?.selected) {
      setValues({ tagsSelected: [...values.tagsSelected, item?.tag] });
      item.selected = true;
    }
  };

  const handleUnselectedTag = (item) => {
    const newSelected = _.filter(values.tagsSelected, e => e !== item);
    const tmp = values.tagsList;
    handleUnselectedTagList(tmp, item);
    setValues({ tagsSelected: newSelected, tagsList: tmp });
  };

  useEffect(() => {
    const tmp = values.tagsList;
    handleInitTagList(tmp, values.tagsSelected);
    setValues({ tagsList: tmp });
  }, []);

  return (
    <div className="edit-notes">
      <div className="edit-notes__heading">
        <h3>Notes</h3>
        <div className="heading-btn">
          <div
            className="save-btn"
            onClick={handleSave}
            onMouseUp={() => {}}
            role="presentation"
          >
            <ButtonCT
              content="Save"
              primary
              loading={state.loading}
            />
          </div>
          <div
            className="close-btn"
            onClick={() => setOpen(false)}
            onMouseUp={() => {}}
            role="presentation"
          >
            <CgClose className="icon" />
          </div>

          {state.isSuccess === -1 && (
            <ToastError
              message="Error to update snapshot!"
              setClose={() => setOpen(false)}
            />
          )}
          {state.isSuccess === 1 && (
            <ToastSuccess
              message="Update snapshot successfully!"
              setClose={() => setOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="edit-notes__content">
        <div className="tags">
          {_.map(values.tagsSelected, (item, idx) => (
            <div key={idx}>
              <SnapshotTag
                tag={item}
                iconClose
                handleClickIcon={() => handleUnselectedTag(item)}
              />
            </div>
          ))}
        </div>

        <div className="note">
          <input
            type="text"
            maxLength="160"
            value={values.note}
            placeholder="Enter note..."
            onChange={e => setValues({ note: e.target.value })}
          />
          <span>
            {values.note.length}
            /160
          </span>
        </div>

        <div className="tabs">
          <ul className="tabs__list">
            <li
              className={cx(`tabs__item ${state.tag === 'symptoms' ? 'active' : ''}`)}
              onClick={() => setState({ tag: 'symptoms' })}
              onMouseUp={() => {}}
              role="presentation"
            >
              Symptoms
            </li>
            <li
              className={cx(`tabs__item ${state.tag === 'activitiesDiet' ? 'active' : ''}`)}
              onClick={() => setState({ tag: 'activitiesDiet' })}
              onMouseUp={() => {}}
              role="presentation"
            >
              Activities & Diet
            </li>
            <li
              className={cx(`tabs__item ${state.tag === 'mood' ? 'active' : ''}`)}
              onClick={() => setState({ tag: 'mood' })}
              onMouseUp={() => {}}
              role="presentation"
            >
              Mood
            </li>
          </ul>
          <BiSearch className="tabs__search-icon" />
        </div>
        <ul className="search-list">
          {_.map(_.filter(values.tagsList[state.tag], (e) => {
            if (searchText === ''
            || e.tag.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
              return e;
            }
            return '';
          }), item => (
            <li
              className={cx(`search-list__item ${item?.selected ? 'selected' : ''}`)}
              key={item?.tag}
              onClick={() => handleSelectTag(item)}
              onKeyUp={() => {}}
              role="presentation"
            >
              <span>{item?.tag}</span>
              {item?.selected
                ? <i className="fa fa-check" aria-hidden="true" />
                : <i className="fa fa-plus" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

EditNotes.defaultProps = {
  setOpen: null,
};

EditNotes.propTypes = {
  setOpen: PropTypes.func,
};


export default EditNotes;
