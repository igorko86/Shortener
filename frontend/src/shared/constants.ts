const SIZE = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

type Keys = keyof typeof SIZE;

export const DEVICE: Record<Keys, string> = {
  mobileS: `(max-width: ${SIZE.mobileS})`,
  mobileM: `(max-width: ${SIZE.mobileM})`,
  mobileL: `(max-width: ${SIZE.mobileL})`,
  tablet: `(max-width: ${SIZE.tablet})`,
  laptop: `(max-width: ${SIZE.laptop})`,
  laptopL: `(max-width: ${SIZE.laptopL})`,
  desktop: `(max-width: ${SIZE.desktop})`,
};
