export const sortArrayBasedArray = (array: any, basedArray: any) => {
  return array.sort((a: any, b: any) => basedArray.indexOf(a.id) - basedArray.indexOf(b.id));
};

export const generatePassword = (passwordLength = 8) => {
  const numberChars = '0123456789';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const allChars = numberChars + upperChars + lowerChars;
  let randPasswordArray = Array(passwordLength);

  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);

  return shuffleArray(
    randPasswordArray.map((x) => {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join('');
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];

    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
