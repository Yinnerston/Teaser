export const getFileNameFromPath = (path) => {
  const fragments = path.split("/");
  let fileName = fragments[fragments.length - 1];
  fileName = fileName.split(".")[0];
  return fileName;
};
