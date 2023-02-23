export function getIdFromUrl(url: string): string {
  const splittedArray = url.split("/");
  const lastItem = splittedArray[splittedArray.length - 1];
  if (lastItem !== "") {
    return lastItem;
  }
  return splittedArray[splittedArray.length - 2];
}
