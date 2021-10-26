import React, { useState, useEffect } from 'react';
import { ImageFile, State } from 'utils';
import './style.scss';

type Props = {
  files: ImageFile[];
  lastFileProgressProcent: number;
  appState: State;
  resultText: string;
};

export default function Actions({ files, lastFileProgressProcent, appState, resultText }: Props) {
  const [resultInput, setResultInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (resultText) {
      setResultInput(resultText);
    }
  }, [resultText]);

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
  if (appState === State.Pending) {
    return <></>;
  }

  const getStatusText = () => {
    let statusText = '';
    switch (appState) {
      case State.Uploading:
        statusText = 'Uploading';
        break;
      case State.Ocr:
        statusText = 'Processing..';
        break;

      default:
        break;
    }
    return statusText;
  };

  const contentInit = (
    <div className='status'>
      <span className='status2'>{getStatusText()}</span>
      <span className='status3'>{`${progressProcentSafeguard(lastFileProgressProcent)}% - ${getSecondToEnd(
        lastFileProgressProcent,
      )} seconds left`}</span>
    </div>
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResultInput(e.target.value ?? resultText);
  };

  const handleCopyToClipboard = async () => {
    setIsCopied(true);
    await navigator.clipboard.writeText(resultInput);
    setTimeout(() => setIsCopied(false), 2000);
  };
  // alert(resultText);

  const contentResult = (
    <div className='result'>
      {/* <div className='preview'>
        <img src={files[0]?.preview} />
      </div> */}

      <div className='status'>
        <span className='status3'>100% done</span>
      </div>

      <div className='result-text'>
        <input className='result-input' type='text' placeholder='VIN' value={resultInput} onChange={handleOnChange} />
        <svg
          className={`h-5 w-5 mr-2 ${isCopied ? 'text-green-400' : 'text-gray-400'} `}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          onClick={handleCopyToClipboard}
        >
          <rect x='9' y='9' width='13' height='13' rx='2' ry='2' /> <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
        </svg>
      </div>
    </div>
  );

  return (
    <div className='actions'>
      <div className='action' style={style}>
        <svg
          className='h-6 w-6 text-green-400 mr-1'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' /> <polyline points='22 4 12 14.01 9 11.01' />
        </svg>
        <div className='action__content'>{appState == State.Result ? contentResult : contentInit}</div>
        <div className='buttons'>
          {appState !== State.Result && (
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
          )}
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
    </div>
  );
}
