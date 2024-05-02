async function loadImageAsBase64(imageBase64: string): Promise<string> {
  const response = await fetch(imageBase64);
  const blob = await response.blob();
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}

export async function getDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const _URL = window.URL || window.webkitURL;
    const img = new Image();
    const objectUrl = _URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      _URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  });
}
export async function resizeImage(
  imageBase64: string,
  targetSize = 500
): Promise<string> {
  try {
    const imageBlobBase64 = await loadImageAsBase64(imageBase64);

    return new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const imgSize: number = Math.min(img.width, img.height);
        const left: number = (img.width - imgSize) / 2;
        const top: number = 0;

        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;

        // Draw the image onto the canvas with the new dimensions
        const ctx = canvas.getContext('2d');

        ctx!.drawImage(
          img,
          left,
          top,
          imgSize,
          imgSize,
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Convert the canvas content back to a base64 string
        const resizedImageBase64 = canvas.toDataURL('image/jpeg');

        resolve(resizedImageBase64);
      };

      img.src = imageBlobBase64;
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
