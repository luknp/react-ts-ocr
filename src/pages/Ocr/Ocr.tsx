import React, { useState, useEffect, useRef } from 'react';
import { createWorker, Worker } from 'tesseract.js';
import Dropzone from 'components/Dropzone';
import Actions from 'components/Actions';
import { ImageFile, convertToImageFile } from 'utils';
import './style.scss';

function Ocr() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [progressProcent, setProgressProcent] = useState(0);
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (files) {
      ocrLogic(files[0]);
    }
  }, [files]);

  useEffect(() => {
    const workerInit = createWorker({
      logger: m => updateProgressAndLog(m),
    });
    setWorker(workerInit);
  }, []);

  const ocrLogic = async (imageFile: ImageFile) => {
    setProgressProcent(0);
    if (!worker) {
      return;
    }
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(imageFile);
    setResultText(text);
  };

  const updateProgressAndLog = (m: any) => {
    const MAX_PARCENTAGE = 1;

    if (m.status === 'recognizing text') {
      const pctg = (m.progress / MAX_PARCENTAGE) * 100;
      setProgressProcent(pctg);
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLElement | undefined>) => {
    if (e.clipboardData.files.length) {
      const fileObject = e.clipboardData.files[0];
      const filesCopy = [...files];
      const imageFile = convertToImageFile([fileObject])[0];
      filesCopy.unshift(imageFile);
      setFiles(filesCopy);
    } else {
      alert('No image data was found in your clipboard. Copy an image first or take a screenshot.');
    }
  };

  return (
    <div className='ocr' onPaste={onPaste}>
      <h3 className='title'>Upload your images to OCR processing</h3>
      <div className='content'>
        <Dropzone addNewFiles={data => setFiles(data)} />
        <Actions files={files} lastFileProgressProcent={progressProcent} />
        {files ? <p> file added</p> : <p>No file yet</p>}
        <p>{progressProcent}</p>
        <p>{resultText}</p>
      </div>
    </div>
  );
}

export default Ocr;
