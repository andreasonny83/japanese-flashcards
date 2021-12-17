export interface SampleData {
  id: string;
  jp: string;
  en: string;
  kana: string;
  romaji: string;
}

export interface CardData {
  id: string;
  title: string;
  jp: string;
  kanji: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  pictureId: string;
  examples: string[];
}

export interface FlashCard {
  id: string;
  title: string;
  jp: string;
  kanji: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  pictureId: string;
  examples: SampleData[];
}
