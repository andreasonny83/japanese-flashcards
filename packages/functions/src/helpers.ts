import { AudioStream, getTable, synthesizeSpeech } from "./aws";
import { SampleData, CardData, FlashCard } from "./types";

export const getAudioWord = async (audioSid: string): Promise<string> => {
  const data = await getTable<CardData | SampleData>(audioSid);

  return data.jp;
};

export const getFlashCardData = async (dataSid: string): Promise<FlashCard> => {
  const card = await getTable<CardData>(dataSid);

  const examples = await Promise.all(
    card.examples.map(async (example) => {
      const data = await getTable<SampleData>(example);

      return {
        id: data.id,
        jp: data.jp,
        en: data.en,
        kana: data.kana,
        romaji: data.romaji,
      };
    })
  );

  return {
    id: card.id,
    title: card.title,
    jp: card.jp,
    kanji: card.kanji,
    hiragana: card.hiragana,
    katakana: card.katakana,
    romaji: card.romaji,
    pictureId: card.pictureId,
    examples,
  };
};

export const createAudioData = async (
  data: string
): Promise<AudioStream | undefined> => {
  if (data) {
    return synthesizeSpeech(data);
  } else {
    return undefined;
  }
};
