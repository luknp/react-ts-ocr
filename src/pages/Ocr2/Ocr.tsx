import React, { useState } from 'react';

import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import './style.scss';

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
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='bg-gray-800 h-screen w-screen sm:px-8 md:px-16 sm:py-8'>
        <main className='container mx-auto max-w-screen-lg h-full'>
          <article
            aria-label='File Upload Modal'
            className='relative h-full flex flex-col bg-white shadow-xl rounded-md'
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onPaste={onPaste}
          >
            <div
              id='overlay'
              className='w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md'
            >
              <i>
                <svg
                  className='fill-current w-12 h-12 mb-3 text-blue-700'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
                </svg>
              </i>
              <p className='text-lg text-blue-700'>Paste image to upload</p>
            </div>

            <section className='h-full overflow-auto p-8 w-full h-full flex flex-col'>
              {/* add image zone */}
              <header className='border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center'>
                <p className='mb-3 font-semibold text-gray-900 flex flex-wrap justify-center'>
                  <span className='text-lg text-gray-500'>Drag and drop your image</span>&nbsp;
                </p>
                <p className='mb-3 font-semibold text-gray-900 flex flex-wrap justify-center'>
                  <span className='text-lg text-gray-500'>or</span>&nbsp;
                </p>
                <input id='hidden-input' type='file' multiple className='hidden' />

                <div className='flex items-center justify-center bg-grey-lighter'>
                  <label className='w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white'>
                    <svg className='w-8 h-8' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                      <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                    </svg>
                    <span className='mt-2 text-base leading-normal'>Select a file</span>
                    <input type='file' className='hidden' />
                  </label>
                </div>
              </header>
              <div className='flex items-center justify-center pb-6 md:py-0 md:w-1/2  border-gray-700'>
                <form>
                  <div className='flex flex-col rounded-lg overflow-hidden sm:flex-row mt-4'>
                    <input
                      className='py-3 px-4 bg-gray-200 text-gray-800 border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100'
                      type='text'
                      placeholder='VIN'
                    />
                    <button className='py-3 px-4 bg-gray-700 text-gray-100 font-semibold uppercase hover:bg-gray-600'>
                      <div className='flex items-center justify-cente'>
                        <svg
                          className='h-6 w-6 text-gray-400 mr-2'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />{' '}
                          <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                        </svg>
                        <span>COPY</span>
                      </div>
                    </button>
                  </div>
                </form>
              </div>

              <ul id='gallery' className='flex flex-1 flex-wrap -m-1'>
                <li id='empty' className='h-full w-full text-center flex flex-col items-center justify-center items-center'>
                  <img
                    className='mx-auto w-32'
                    src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png'
                    alt='no data'
                  />
                  <span className='text-small text-gray-500'>No imege selected</span>
                </li>
              </ul>
            </section>

            <footer className='flex justify-end px-8 pb-8 pt-4'>
              <button
                id='submit'
                className='rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none'
              >
                Upload now
              </button>
              <button id='cancel' className='ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none'>
                Cancel
              </button>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}

export default Ocr;
