export const shuffle = (arr: any) => {
  const newArray = [...arr];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const currentItem = newArray[i];
    const randomItem = newArray[j];

    newArray[i] = randomItem;
    newArray[j] = currentItem;
  }

  return newArray;
};
