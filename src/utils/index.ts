export type ImageFile = File & { preview: string };

export const convertToImageFile = (files: File[]): ImageFile[] => {
  const imageFiles = files.map(file =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
  );
  return imageFiles;
};
