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

      // new
      light5: string;
      light4: string;
      light3: string;
      light2: string;
      light1: string;
      dark1: string;
      dark2: string;
      dark3: string;
      dark4: string;
      dark5: string;
      white: string;
      black: string;
      theme: string;
      grey: string;
      green: string;
      red: string;
    };
  }
}
