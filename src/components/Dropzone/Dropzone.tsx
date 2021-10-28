import React, { useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import folderIcon from 'assets/blue-folder-icon2.png'; // with import
import { ImageFile, convertToImageFile } from 'utils';
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
    <div className={`container ${isDragActive && 'is-drag-active'}`}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className='box'>
          <img src={folderIcon} />

          <p className='desc'>
            Drag your image here, or <span className='desc-file'> browse</span>
          </p>
          <p className='desc-support'>Support JPG, JPEG2000, PNG</p>
        </div>
      </div>
    </div>
  );
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  borderRadius: '1rem',
  border: '3px dashed rgb(216, 216, 216)',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
  backgroundColor: '#9ab8f8',
};

const acceptStyle = {
  borderColor: '#306ae6',
  backgroundColor: '#dce7ff',
};

const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: '#fde7e7',
};
