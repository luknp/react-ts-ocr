import React, { useState, useEffect } from 'react';
import { createWorker, Worker } from 'tesseract.js';
import { ImageFile, convertToImageFile, State } from 'utils';

const useOcr = () => {
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
    await worker.initialize();
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

  const handleDeleteFiles = () => {
    setFiles([]);
    setProgressProcent(0);
    setResultText('');
    setCurrentState(State.Pending);
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

  return {
    files,
    setFiles,
    setCurrentState,
    progressProcent,
    resultText,
    currentState,
    handleDeleteFiles,
    onPaste,
  };
};

export default useOcr;
