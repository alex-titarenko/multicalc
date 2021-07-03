export interface ReleaseInfo {
  version: string;
  releaseDate: Date;
  description: string;
  notes: string[];
}

export const releaseNotes: ReleaseInfo[] = [
  {
    version: '0.1.0',
    releaseDate: new Date('12/15/2018'),
    description: 'Initial public release.',
    notes: [
      'Feature: Unit-converter module',
      'Feature: Plot 2D module'
    ]
  },
  {
    version: '0.2.5',
    releaseDate: new Date('12/31/2018'),
    description: 'Bug fixes and performance improvements.',
    notes: [
      'Fix: [Plot 2D] Zooming center is relevant to the mouse position',
      'Styles: Customized banner background',
      'Feature: New release notifications',
      'Feature: Install App button for Chrome browser'
    ]
  },
  {
    version: '1.0.0-rc1',
    releaseDate: new Date('3/1/2019'),
    description: 'New calculator module, bug fixes and performance improvements.',
    notes: [
      'Feature: Calculator module',
      'Feature: Install App button for Safari browser',
    ]
  },
  {
    version: '1.0.0',
    releaseDate: new Date('3/9/2019'),
    description: 'First public release',
    notes: [
      'Numerous bugs fixing'
    ]
  },
  {
    version: '1.0.1',
    releaseDate: new Date('3/13/2019'),
    description: 'Improve responsiveness of UI',
    notes: [
      'Improve responsiveness of calculator module on high resolution',
      'Improve responsiveness of unit-converter module on high resolution'
    ]
  },
  {
    version: '1.0.4',
    releaseDate: new Date('3/17/2019'),
    description: 'Small bug fixes',
    notes: [
      'Fix click event for Galaxy devices on Calculator mode'
    ]
  },
  {
    version: '1.0.5',
    releaseDate: new Date('3/28/2019'),
    description: 'Update application icons',
    notes: [
      'Update application icons for all platforms to match brand colors'
    ]
  },
  {
    version: '1.0.6',
    releaseDate: new Date('3/29/2019'),
    description: 'Update application banner',
    notes: [
      'Update application banner to match brand colors'
    ]
  },
  {
    version: '1.1.5',
    releaseDate: new Date('4/6/2019'),
    description: 'Fix minor issues',
    notes: [
      'Allow input numbers with leading \'.\' character',
      'Update splash screen',
      'Fix instant result display issue',
      'Add Facebook and Twitter links'
    ]
  },
  {
    version: '1.2.0',
    releaseDate: new Date('4/21/2019'),
    description: 'Insert function dialog',
    notes: [
      'Add insert function dialog [calculator module]'
    ]
  },
  {
    version: '1.2.7',
    releaseDate: new Date('4/27/2019'),
    description: 'Usage tips for calculator',
    notes: [
      'Add usage tips for calculator [calculator module]',
      'Fix back navigation when a dialog is open'
    ]
  },
  {
    version: '1.2.8',
    releaseDate: new Date('5/18/2019'),
    description: 'Calculus functions',
    notes: [
      'Add calculus functions such as numerical integration and derivation',
    ]
  },
  {
    version: '1.3.0',
    releaseDate: new Date('5/28/2019'),
    description: 'New evaluator engine for Plot 2D',
    notes: [
      'Update evaluator engine for Plot 2D module to the same which is used in Calculator module',
    ]
  },
  {
    version: '1.3.4',
    releaseDate: new Date('7/3/2021'),
    description: 'Bug fixes',
    notes: [
      'Update style for Apple devices',
    ]
  }
];
