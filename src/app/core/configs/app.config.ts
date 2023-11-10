import packageJson from 'package.json';

export const appConfig = {
  get name() { return packageJson['productName']; },
  get version() { return packageJson['version']; },
  get companyName() { return packageJson['companyName']; },
  get copyright() { return `Copyright © ${ new Date().getFullYear() } ${ appConfig.companyName }`; },
  get feedbackEmail() { return packageJson['feedbackEmail']; },
  get supportEmail() { return packageJson['supportEmail']; },
  get appUrl() { return packageJson['appUrl']; },
  get homepageUrl() { return packageJson['homepageUrl']; },
  get facebookUrl() { return packageJson['facebookUrl']; },
  get twitterUrl() { return packageJson['twitterUrl']; },
  get instagramUrl() { return packageJson['instagramUrl']; }
};
