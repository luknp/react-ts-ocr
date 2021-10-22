import React, { useState, useEffect, useRef } from 'react';
import { createWorker, Worker } from 'tesseract.js';
import './style.scss';

function Ocr() {
  const [file, setFile] = useState<File | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [progressProcent, setProgressProcent] = useState('0.00');
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (file) {
      ocrLogic(file);
    }
  }, [file]);

  useEffect(() => {
    const workerInit = createWorker({
      logger: m => updateProgressAndLog(m),
    });
    setWorker(workerInit);
  }, []);

  const ocrLogic = async (file: File) => {
    setProgressProcent('0.00');
    if (!worker) {
      return;
    }
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(file);
    setResultText(text);
  };

  const updateProgressAndLog = (m: any) => {
    const MAX_PARCENTAGE = 1;
    const DECIMAL_COUNT = 2;

    if (m.status === 'recognizing text') {
      const pctg = (m.progress / MAX_PARCENTAGE) * 100;
      setProgressProcent(pctg.toFixed(DECIMAL_COUNT));
    }
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
      //   const filesState = this.state.files.map((f) => ({ ...f }));
      //   filesState.push(file);
      //   setState({ files: filesState });
    } else {
      alert('No image data was found in your clipboard. Copy an image first or take a screenshot.');
    }
  };

  return (
    <div className='ocr' onPaste={onPaste}>
      <h2>add file</h2>
      {file ? <p> file added</p> : <p>No file yet</p>}
      <p>{progressProcent}</p>
      <p>{resultText}</p>
    </div>
  );
}

export default Ocr;
