export const baseStyle = {
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

export const activeStyle = {
  borderColor: '#2196f3',
  backgroundColor: '#9ab8f8',
};

export const acceptStyle = {
  borderColor: '#306ae6',
  backgroundColor: '#dce7ff',
};

export const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: '#fde7e7',
};
