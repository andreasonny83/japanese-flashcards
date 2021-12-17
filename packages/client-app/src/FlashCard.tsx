import React from "react";
import { Button, Card, Heading, Paragraph, Text } from "@twilio-paste/core";
import { FlashCardData } from "./types";

interface CardProps {
  data: FlashCardData;
  onPlay: (dataSid: string) => void;
}

export const FlashCard = ({ onPlay, data }: CardProps) => {
  return (
    <Card padding="space70">
      <Text as="div" textAlign="center">
        <Heading as="h2" variant="heading20">
          {data.title}
        </Heading>
        {data.kanji && (
          <Paragraph marginBottom="space0">{data.kanji}</Paragraph>
        )}
        {data.hiragana && (
          <Paragraph marginBottom="space0">{data.hiragana}</Paragraph>
        )}
        {data.katakana && (
          <Paragraph marginBottom="space0">{data.katakana}</Paragraph>
        )}
        {data.romaji && <Paragraph>{data.romaji}</Paragraph>}
        <Button variant="primary" onClick={() => onPlay(data.id)}>
          🔊 Play
        </Button>
      </Text>
      {data.examples.map((example) => (
        <Text as="div" key={example.id} marginBottom="space80">
          <Paragraph marginBottom="space0">{example.kana}</Paragraph>
          <Paragraph marginBottom="space0">{example.romaji}</Paragraph>
          <Paragraph>{example.en}</Paragraph>
          <Button variant="primary" onClick={() => onPlay(example.id)}>
            🔊 Play
          </Button>
        </Text>
      ))}

      <Paragraph marginBottom="space0">#{data.id}</Paragraph>
    </Card>
  );
};
