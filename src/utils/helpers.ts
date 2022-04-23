enum byteSizes {
  kb = 1024,
  mb = 1e6,
  gb = 1e9,
  tb = 1e12,
}

export const bytesToSize = (bytes: number) => {
  if (bytes === 0) {
    return "0 Byte";
  }

  switch (true) {
    case bytes < byteSizes.kb:
      return bytes + " Bytes";
    case bytes < byteSizes.mb:
      return (bytes / byteSizes.kb).toFixed(1) + " KB";
    case bytes < byteSizes.gb:
      return (bytes / byteSizes.mb).toFixed(1) + " MB";
    case bytes < byteSizes.tb:
      return (bytes / byteSizes.gb).toFixed(1) + " GB";
    default:
      return (bytes / byteSizes.tb).toFixed(1) + " TB";
  }
};
