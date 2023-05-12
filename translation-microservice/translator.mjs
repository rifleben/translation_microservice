import translatePackage from 'translate';

export async function translateText(text, language) {
  const translate = translatePackage;
  translate.engine = 'google';
  return await translate(text, { to: language });
}
