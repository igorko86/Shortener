export const sortArrayBasedArray = (array: any, basedArray: any) => {
  return array.sort((a: any, b: any) => basedArray.indexOf(a.id) - basedArray.indexOf(b.id));
};
