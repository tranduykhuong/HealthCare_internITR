import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BiCalendar, BiSearch } from 'react-icons/bi';
import { MdFilterList } from 'react-icons/md';
import { AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import * as _ from 'lodash';
import cx from 'classnames';
import { Label } from 'reactstrap';
import { useRecoilState } from 'recoil';
import { CgSandClock } from 'react-icons/cg';
import { Calendar } from 'react-calendar';
import moment from 'moment';
import ButtonCT from '../../../components/buttonCT';
import './styles.scss';
import { plus } from '../../../../assets/images/svg';
import SnapshotTag from '../snapshotTag';
import { TAGS } from '../handler';
import { filterRecoil, typeRecoil } from '../recoil';
import useMergeState from '../../../../utils/hooks/useMergeState';
import 'react-calendar/dist/Calendar.css';
import '../../../../styles/calendar.scss';

const SnapshotSearch = () => {
  const [type, setType] = useRecoilState(typeRecoil);
  const [filter, setFilter] = useRecoilState(filterRecoil);
  const [searchText, setSearchText] = useState('');
  const [formSearch, setFormSearch] = useMergeState({
    tagsSelected: [],
    durations: [],
    date: undefined,
    star: undefined,
  });
  const [state, setState] = useMergeState({
    openListTag: false,
    openFilter: false,
    openCalendar: false,
    openDuration: false,
  });

  const handleSelectTag = (item) => {
    if (!item?.selected) {
      setFormSearch({ tagsSelected: [...formSearch.tagsSelected, item?.tag] });
      item.selected = true;
      setState({ openListTag: false });
      setSearchText('');
    }
  };

  const handleUnselectedTag = (item) => {
    const newSelected = _.filter(formSearch.tagsSelected, e => e !== item);
    setFormSearch({ tagsSelected: newSelected });

    _.forEach(TAGS, (e) => {
      if (item === e?.tag) {
        e.selected = false;
      }
    });
  };

  const handleSelectDuration = (e) => {
    if (e.target.checked) {
      setFormSearch({ durations: [...formSearch.durations, +e.target.value] });
    } else {
      setFormSearch({ durations: _.filter(formSearch.durations, item => item !== +e.target.value) });
    }
  };

  const handleSelectDate = (e) => {
    setFormSearch({ date: e });
    setState({ openCalendar: false });
  };

  const handleClickSearchBtn = () => {
    setFilter({
      ...filter,
      tags: formSearch.tagsSelected,
      date: formSearch.date,
      duration: formSearch.durations,
      star: formSearch.star,
    });
    setType('filter');
    setSearchText('');
    setState({
      openListTag: false,
      openCalendar: false,
      openDuration: false,
    });
  };

  useEffect(() => {
    if (formSearch.durations.length === 0
      && formSearch.tagsSelected.length === 0
      && formSearch.date === undefined
      && formSearch.star === undefined) {
      setType('recent');
    }
  }, [formSearch]);

  return (
    <div className="search">
      <div className="search__input">
        <BiSearch className="icon-search" />
        <div className="search__input-list">
          <div className="list-tag">
            {_.map(formSearch?.tagsSelected, item => (
              <span key={item}>
                <SnapshotTag
                  tag={item}
                  iconClose
                  handleClickIcon={() => handleUnselectedTag(item)}
                />
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search snapshot with tags"
            onChange={(e) => {
              setState({ openListTag: true, openCalendar: false, openDuration: false });
              setSearchText(e?.target?.value);
            }}
            value={searchText}
          />
        </div>
        <MdFilterList
          className={cx(`icon-filter ${type === 'filter' ? 'active-filter' : ''}`)}
          onClick={() => setState({ openFilter: !state.openFilter })}
          onMouseUp={() => {}}
          role="presentation"
        />

        <div className="search-filter">
          {state.openFilter && (
            <div className="search-filter__filter">
              <div className={cx(`filter-date ${formSearch?.date ? 'active' : ''}`)}>
                <div
                  className="flex"
                  onClick={() => setState({ openCalendar: !state.openCalendar, openDuration: false, openListTag: false })}
                  onMouseUp={() => {}}
                  role="presentation"
                >
                  <BiCalendar className="iconCalendar" />
                  <p>{formSearch?.date ? moment(formSearch?.date).format('MMM DD, YYYY') : 'Snapshot date'}</p>
                </div>
                {formSearch?.date && (
                <h4
                  onClick={() => setFormSearch({ date: undefined })}
                  onMouseUp={() => {}}
                  role="presentation"
                >
                  x
                </h4>
                )}
              </div>
              <div className={cx(`filter-duration ${formSearch?.durations.length ? 'active' : ''}`)}>
                <div
                  className="flex"
                  onClick={() => setState({ openDuration: !state.openDuration, openCalendar: false, openListTag: false })}
                  onMouseUp={() => {}}
                  role="presentation"
                >
                  <CgSandClock className="iconDuration" />
                  <p>
                    {formSearch?.durations.length
                      ? _.map(formSearch?.durations, item => `${item / 60} mins`).join(', ')
                      : 'Snapshot duration'}
                  </p>
                </div>
                {formSearch?.durations.length && (
                <h4
                  onClick={() => setFormSearch({ durations: [] })}
                  onMouseUp={() => {}}
                  role="presentation"
                >
                  x
                </h4>
                )}
              </div>
              <div className={cx(`filter-star ${formSearch?.star ? 'active' : ''}`)}>
                <div
                  className="flex"
                  onClick={() => setFormSearch({ star: true })}
                  onMouseUp={() => {}}
                  role="presentation"
                >
                  <AiOutlineStar className="iconStar" />
                  <p>Starred</p>
                </div>
                {formSearch?.star && (
                <h4
                  onClick={() => setFormSearch({ star: undefined })}
                  onMouseUp={() => {}}
                  role="presentation"
                >
                  x
                </h4>
                )}
              </div>

              {state.openCalendar && (
                <div className="filter-calendar">
                  <Calendar
                    onChange={handleSelectDate}
                    value={formSearch?.date}
                    maxDate={new Date()}
                  />
                </div>
              )}

              {state.openDuration && (
                <div className="filter-duration-dropdown">
                  {_.map(['1 minute', '2 minutes', '3 minutes', '4 minutes', '5 minutes'], (item, idx) => (
                    <div
                      className={cx(`filter-duration-dropdown__item ${_.indexOf(formSearch.durations, (idx + 1) * 60) !== -1 ? 'active-duration' : ''}`)}
                      key={idx}
                    >
                      <input
                        type="checkbox"
                        name="duration"
                        value={(idx + 1) * 60}
                        id={idx}
                        onChange={handleSelectDuration}
                        checked={_.indexOf(formSearch.durations, (idx + 1) * 60) !== -1}
                      />
                      <Label htmlFor={idx}>{item}</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {state.openListTag && (
          <ul className="search-list">
            {_.map(_.filter(TAGS, (e) => {
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
          )}
        </div>
      </div>
      <div
        className="search__btn-search"
        onClick={handleClickSearchBtn}
        onMouseUp={() => {}}
        role="presentation"
      >
        <AiOutlineArrowRight className="icon-arrow" />
      </div>
      <div className="search__btn-create">
        <ButtonCT content="Create Snashot" primary iconRight={plus} />
      </div>
    </div>
  );
};

SnapshotSearch.propTypes = {};

export default SnapshotSearch;
