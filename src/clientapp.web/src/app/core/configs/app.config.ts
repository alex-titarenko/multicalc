import packageJson from 'root/package.json';

export const appConfig = {
  get name() { return packageJson['productName']; },
  get version() { return packageJson['version']; },
  get companyName() { return packageJson['companyName']; },
  get copyright() { return `Copyright © ${ new Date().getFullYear() } ${ appConfig.companyName }`; },
  get feedbackEmail() { return packageJson['feedbackEmail']; },
  get supportEmail() { return packageJson['supportEmail']; },
  get homepageLink() { return packageJson['homepageLink']; },
  get facebookLink() { return packageJson['facebookLink']; },
  get twitterLink() { return packageJson['twitterLink']; },
  get instagramLink() { return packageJson['instagramLink']; }
};
