import React, { useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import folderIcon from 'assets/blue-folder-icon2.png'; // with import
import { ImageFile, convertToImageFile } from 'utils';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './dropzone-style';
import './style.scss';

type Props = {
  addNewFiles: (files: ImageFile[]) => void;
};

export default function Dropzone({ addNewFiles }: Props) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone();

  useEffect(() => {
    addNewFiles(convertToImageFile(acceptedFiles));

    console.log(acceptedFiles);
  }, [acceptedFiles]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <div className={`container ${isDragActive && 'drag-active'}`}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className='box'>
          <img src={folderIcon} />
          <p className='box__desc'>
            Drag your image here, or <span className='box__desc-file'> browse</span>
          </p>
          <p className='box__support-info'>Support JPG, JPEG2000, PNG</p>
        </div>
      </div>
    </div>
  );
}
