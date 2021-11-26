import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    boxShadow: string;
    marginTop: string;

    colors: {
      main: string;
      secondary: string;
      brightGray: string;
      midnight: string;
      lightGray: string;
      lightGray1: string;
      silver: string;
      mainColor: string;
      snow: string;
      gainsboro: string;
      suvaGrey: string;
      iron: string;
      whiteSmoke: string;
      pinkSwan: string;
      kashmirBlue: string;
    };
  }
}
