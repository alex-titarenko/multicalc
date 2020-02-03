export interface Plot2DPreferences {
  backgroundColor: string;
  foregroundColor: string;
  gridlinesColor: string;
  axesColor: string;
  gridlinesVisibility: boolean;
  axesVisibility: boolean;
}

export const defaultPreferences: Plot2DPreferences = {
  backgroundColor: 'white',
  foregroundColor: 'dimgray',
  gridlinesColor: 'gainsboro',
  axesColor: 'darkgray',
  gridlinesVisibility: true,
  axesVisibility: true,
};
