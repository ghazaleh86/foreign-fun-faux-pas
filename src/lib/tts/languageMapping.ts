export const islandLanguageCodes: Record<string, string[]> = {
  english: ['en', 'en-us', 'eng'],
  spanish: ['es', 'es-es', 'spa'],
  french: ['fr', 'fr-fr', 'fre', 'fra'],
  german: ['de', 'de-de', 'ger', 'deu'],
  italian: ['it', 'it-it', 'ita'],
  portuguese: ['pt', 'pt-pt', 'por'],
  dutch: ['nl', 'nl-nl', 'dut', 'nld'],
  russian: ['ru', 'ru-ru', 'rus'],
  chinese: ['zh', 'zh-cn', 'chi', 'zho'],
  japanese: ['ja', 'ja-jp', 'jpn'],
  korean: ['ko', 'ko-kr', 'kor'],
  arabic: ['ar', 'ar-ae', 'ara'],
  hindi: ['hi', 'hi-in', 'hin'],
  bengali: ['bn', 'bn-bd', 'ben'],
  tamil: ['ta', 'ta-in', 'tam'],
  telugu: ['te', 'te-in', 'tel'],
  marathi: ['mr', 'mr-in', 'mar'],
  gujarati: ['gu', 'gu-in', 'guj'],
  punjabi: ['pa', 'pa-in', 'pan'],
  urdu: ['ur', 'ur-pk', 'urd'],
  
  // Eastern European Languages - Phase 1 additions
  ukrainian: ['uk', 'uk-ua', 'ukr'],
  hungarian: ['hu', 'hu-hu', 'hun'],
  romanian: ['ro', 'ro-ro', 'rum', 'ron'],
  bulgarian: ['bg', 'bg-bg', 'bul'],
  croatian: ['hr', 'hr-hr', 'hrv'],
  
  // Asian Languages - Phase 2 additions
  indonesian: ['id', 'id-id', 'ind'],
  mongolian: ['mn', 'mn-mn', 'mon'],
  burmese: ['my', 'my-mm', 'bur', 'mya'],
  nepali: ['ne', 'ne-np', 'nep'],
  khmer: ['km', 'km-kh', 'khm'],
};

export function getLanguageFamily(language: string): string {
  const lang = language.toLowerCase();
  
  if (['english', 'german', 'dutch'].includes(lang)) return 'germanic';
  if (['spanish', 'french', 'italian', 'portuguese'].includes(lang)) return 'romance';
  if (['russian'].includes(lang)) return 'slavic';
  if (['chinese', 'japanese', 'korean'].includes(lang)) return 'east-asian';
  if (['arabic'].includes(lang)) return 'semitic';
  if (['hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'punjabi', 'urdu', 'nepali'].includes(lang)) return 'indic';
  
  // Eastern European families
  if (['ukrainian', 'bulgarian', 'croatian'].includes(lang)) return 'slavic';
  if (['hungarian'].includes(lang)) return 'finno-ugric';
  if (['romanian'].includes(lang)) return 'romance';
  
  // Asian families
  if (['indonesian'].includes(lang)) return 'austronesian';
  if (['mongolian'].includes(lang)) return 'mongolic';
  if (['burmese'].includes(lang)) return 'sino-tibetan';
  if (['nepali'].includes(lang)) return 'indic';
  if (['khmer'].includes(lang)) return 'austroasiatic';
  
  return 'other';
}
