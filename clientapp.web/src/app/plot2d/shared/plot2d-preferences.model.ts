export interface Plot2DPreferences {
  backgroundColor: string;
  foregroundColor: string;
  gridlinesColor: string;
  axesColor: string;
  backgroundColorDark: string;
  foregroundColorDark: string;
  gridlinesColorDark: string;
  axesColorDark: string;
  gridlinesVisibility: boolean;
  axesVisibility: boolean;
}

export const defaultPreferences: Plot2DPreferences = {
  backgroundColor: 'white',
  foregroundColor: 'dimgray',
  gridlinesColor: 'gainsboro',
  axesColor: 'darkgray',
  backgroundColorDark: '#303030',
  foregroundColorDark: 'dimgray',
  gridlinesColorDark: '#4C4C4C',
  axesColorDark: 'darkgray',
  gridlinesVisibility: true,
  axesVisibility: true,
};
