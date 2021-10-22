import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import './style.scss';
import OcrResult from 'components/OcrResult';

registerPlugin(FilePondPluginImagePreview);

type TDragEvent = React.DragEvent<HTMLElement | undefined>;

function Ocr() {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = (event: TDragEvent) => {
    console.log(event);
  };
  const onDragOver = (e: TDragEvent) => {
    console.log(e);
  };
  const onDragLeave = (e: TDragEvent) => {
    console.log(e);
  };
  const onDragEnter = (e: TDragEvent) => {
    console.log(e);
  };
  const onPaste = (e: React.ClipboardEvent<HTMLElement | undefined>) => {
    if (e.clipboardData.files.length) {
      const fileObject = e.clipboardData.files[0];
      const file = {
        getRawFile: () => fileObject,
        name: fileObject.name,
        size: fileObject.size,
        uid: 1,
        status: 2,
        progress: 0,
      };
      setFile(fileObject);
      console.log('fileeeeeeeeee');

      //   const filesState = this.state.files.map((f) => ({ ...f }));
      //   filesState.push(file);

      //   this.setState({ files: filesState });
    } else {
      alert('No image data was found in your clipboard. Copy an image first or take a screenshot.');
    }
  };

  const filePondLabel = () => {
    return (
      <div id='overlay' className='w-full h-full flex flex-col items-center justify-center'>
        {/* <div className='flex flex-col items-center justify-center bg-grey-lighter'>
          <i>
            <svg
              className='fill-current w-12 h-12 mb-3 text-blue-700'
              xmlns='http://www.w3.org/2000/svg'
              width='34'
              height='34'
              viewBox='0 0 24 24'
            >
              <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
            </svg>
          </i>
          <p className='text-lg text-blue-700'>Paste image to upload</p>
        </div> */}

        <div className='flex flex-col items-center justify-center items-center justify-center bg-grey-lighter'>
          <i>
            <svg
              className='fill-current w-12 h-12 mb-3 text-blue-700'
              xmlns='http://www.w3.org/2000/svg'
              width='34'
              height='34'
              viewBox='0 0 24 24'
            >
              <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
            </svg>
          </i>
          <span className='text-lg text-gray-500'>Drag and drop your image</span>&nbsp;
          <div className='w-64 flex flex-col items-center justify-center px-3 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white'>
            <span className='mt-2 text-lg text-blue-700 text-base leading-normal '>Select a file</span>
            <input type='file' className='hidden' />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='bg-gray-800 h-screen w-screen sm:px-8 md:px-16 sm:py-8'>
        <main className='container mx-auto max-w-screen-lg h-full'>
          <article
            aria-label='File Upload Modal'
            className='relative h-full flex flex-col bg-white shadow-xl rounded-md p-12'
            onPaste={onPaste}
          >
            <div className='border-dashed border-2 border-gray-400 py-12 background'>
              <FilePond labelIdle={ReactDOMServer.renderToString(filePondLabel())} />
            </div>
            <div className=''>
              <OcrResult />
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

export default Ocr;
