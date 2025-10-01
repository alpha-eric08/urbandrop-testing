import { useState, useEffect } from 'react';

/**
 * Converts a base64 data URL to a blob URL
 * @param dataUrl - The base64 data URL (e.g., "data:image/webp;base64,...")
 * @returns A blob URL that can be used as src for images
 */
export const convertDataUrlToBlobUrl = (dataUrl: string): string => {
  if (!dataUrl.startsWith('data:')) {
    // If it's already a regular URL, return as is
    return dataUrl;
  }

  try {
    // Extract the base64 data and mime type
    const [header, base64Data] = dataUrl.split(',');
    const mimeMatch = header.match(/data:([^;]+)/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    // Convert base64 to binary
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create blob and return blob URL
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error converting data URL to blob URL:', error);
    return dataUrl; // Return original if conversion fails
  }
};

/**
 * Cleans up a blob URL to free memory
 * @param blobUrl - The blob URL to revoke
 */
export const revokeBlobUrl = (blobUrl: string): void => {
  if (blobUrl.startsWith('blob:')) {
    URL.revokeObjectURL(blobUrl);
  }
};

/**
 * Hook to manage blob URL conversion and cleanup
 */
export const useBlobUrl = (dataUrl: string | undefined): string | undefined => {
  const [blobUrl, setBlobUrl] = useState<string | undefined>();

  useEffect(() => {
    if (dataUrl) {
      const url = convertDataUrlToBlobUrl(dataUrl);
      setBlobUrl(url);

      // Cleanup function
      return () => {
        if (url.startsWith('blob:')) {
          revokeBlobUrl(url);
        }
      };
    }
  }, [dataUrl]);

  return blobUrl;
};

export default { convertDataUrlToBlobUrl, revokeBlobUrl, useBlobUrl };