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
  max = 500
): Promise<string> {
  try {
    const imageBlobBase64 = await loadImageAsBase64(imageBase64);

    return new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        let newWidth = img.width;
        let newHeight = img.height;

        // Calculate the new dimensions while maintaining the aspect ratio
        if (newWidth > max) {
          const aspectRatio = img.width / img.height;
          newWidth = max;
          newHeight = newWidth / aspectRatio;
        }

        if (newHeight > max) {
          const aspectRatio = img.height / img.width;
          newHeight = max;
          newWidth = newHeight / aspectRatio;
        }

        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image onto the canvas with the new dimensions
        const ctx = canvas.getContext('2d');
        ctx!.fillStyle = '#fff'; /// set white fill style
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        ctx!.drawImage(img, 0, 0, newWidth, newHeight);

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
