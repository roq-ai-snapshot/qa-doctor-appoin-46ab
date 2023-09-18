interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Administrator'],
  customerRoles: ['Guest'],
  tenantRoles: ['System Administrator', 'Office Manager'],
  tenantName: 'Organization',
  applicationName: 'QA Doctor Appointment System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View list of organizations, doctors, and available appointment slots.',
    'Manage personal appointments.',
    'View status of personal appointments.',
  ],
  ownerAbilities: ['Manage organizations', 'Invite Office Managers', 'View all appointments', 'Manage Office Managers'],
  getQuoteUrl: 'https://roq-wizzard-git-qa03-roqtech.vercel.app/proposal/6e4e91fe-803a-4e13-8dfb-5ea321f61c2e',
};
