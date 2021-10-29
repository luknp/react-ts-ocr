import React from 'react';
import Dropzone from 'components/Dropzone';
import Actions from 'components/Actions';
import useOcr from './useOcr';
import './style.scss';

export default function Ocr() {
  const { files, setFiles, progressProcent, resultText, currentState, handleDeleteFiles, onPaste } = useOcr();

  return (
    <div className='ocr' onPaste={onPaste}>
      <h3 className='ocr__title'>Upload your images to OCR VIN processing</h3>
      <div className='ocr__content'>
        <Dropzone addNewFiles={data => setFiles(data)} />
        {files.length > 0 ? (
          <Actions
            files={files}
            lastFileProgressProcent={progressProcent}
            appState={currentState}
            resultText={resultText}
            handleDeleteFiles={handleDeleteFiles}
          />
        ) : (
          noFileImageSection
        )}
      </div>
    </div>
  );
}

const noFileImageSection = (
  <ul id='gallery' className='flex flex-1 flex-wrap mt-16'>
    <li id='empty' className='h-full w-full text-center flex flex-col items-center justify-center items-center'>
      <img
        className='mx-auto w-32'
        src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png'
        alt='no data'
      />
      <span className='text-small text-gray-500'>No imege selected</span>
    </li>
  </ul>
);
