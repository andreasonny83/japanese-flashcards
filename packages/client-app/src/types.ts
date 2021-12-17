interface Sample {
  id: string;
  jp: string;
  en: string;
  kana: string;
  romaji: string;
}

export interface FlashCardData {
  id: string;
  title: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  kanji: string;
  pictureId: string;
  examples: Sample[];
}
