import React, { useState, useEffect } from 'react';
import { ImageFile } from 'utils';
import './style.scss';

type Props = {
  files: ImageFile[];
  lastFileProgressProcent: number;
  lastFileStatus?: string;
};

export default function Actions({ files, lastFileProgressProcent, lastFileStatus }: Props) {
  const style = { '--progressProcent': `${lastFileProgressProcent}%` } as React.CSSProperties;

  const getSecondToEnd = (procentDone: number, durationSeconds = 10): number => {
    const secondsAlready = (procentDone * durationSeconds) / 100;
    let secondsToEnd = durationSeconds - secondsAlready;
    secondsToEnd = secondsToEnd < 0 ? 0 : Math.round(secondsToEnd);
    return secondsToEnd;
  };

  const progressProcentSafeguard = (progressProcent: number): number => {
    let result = progressProcent;
    if (progressProcent > 100) {
      result = 100;
    } else if (progressProcent < 0) {
      result = 0;
    }
    return result;
  };

  return (
    <div className='actions'>
      <div className='action' style={style}>
        <div className='action__content'>
          <div className='status'>
            <span className='status2'>Uploading..</span>
            <span className='status3'>{`${progressProcentSafeguard(lastFileProgressProcent)}% - ${getSecondToEnd(
              lastFileProgressProcent,
            )} seconds left`}</span>
          </div>
        </div>
        <div className='buttons'>
          <svg
            className='h-6 w-6 text-gray-500'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect x='6' y='4' width='4' height='16' /> <rect x='14' y='4' width='4' height='16' />
          </svg>
          <svg
            className='h-6 w-6 text-red-500 danger'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' /> <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
          <svg
            className='h-6 w-6 text-gray-500'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='1' /> <circle cx='12' cy='19' r='1' />{' '}
            <circle cx='12' cy='5' r='1' />
          </svg>
        </div>
      </div>
      <img src={files[0]?.preview} />
    </div>
  );
}
