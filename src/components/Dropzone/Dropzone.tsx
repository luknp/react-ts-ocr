import React, { useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import folderIcon from 'assets/blue-folder-icon2.png'; // with import
import './style.scss';

type Props = {
  addNewFile: (file: File) => void;
};

export default function Dropzone({ addNewFile }: Props) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone();

  useEffect(() => {
    addNewFile(acceptedFiles[0]);
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
  border: '3px dashed rgb(182, 182, 182)',
  backgroundColor: '#f3f3f3',
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
