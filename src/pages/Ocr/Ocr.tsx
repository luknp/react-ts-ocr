import React, { useState, useEffect, useRef } from 'react';
import { createWorker, Worker } from 'tesseract.js';
import Dropzone from 'components/Dropzone';
import Actions from 'components/Actions';
import { ImageFile, convertToImageFile, State } from 'utils';
import './style.scss';

function Ocr() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [progressProcent, setProgressProcent] = useState(0);
  const [resultText, setResultText] = useState('');
  const [currentState, setCurrentState] = useState(State.Pending);

  useEffect(() => {
    if (files.length) {
      setCurrentState(State.Ocr);
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
    setCurrentState(State.Result);
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
        {files.length > 0 && (
          <Actions files={files} lastFileProgressProcent={progressProcent} appState={currentState} resultText={resultText} />
        )}
      </div>
    </div>
  );
}

export default Ocr;
