// Public name variants supplied by the site owner; the preferred brand stays Moria Rodrig.
export const hebrewNames = ['מוריה רודריג', 'מוריה חדד', 'מוריה רודריג חדד', 'מוריה חדד רודריג'];
export const englishNames = ['Moria Rodrig', 'Moria Hadad', 'Moria Rodrig Hadad', 'Moria Hadad Rodrig'];
export const personNames = [...hebrewNames, ...englishNames];
export const businessNames = [
  'Moria Rodrig - Law Office and Notary',
  ...hebrewNames.map(name => `${name} עו"ד ונוטריון`),
  ...englishNames.map(name => `${name} Law and Notary`),
];
