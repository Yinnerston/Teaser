export const getSplitFileNameFromPath = (path) => {
  const fragments = path.split("/");
  let fileName = fragments[fragments.length - 1];
  let splitFileName = fileName.split(".");
  return {
    fileName: splitFileName[0],
    extension: splitFileName[1],
  };
};
