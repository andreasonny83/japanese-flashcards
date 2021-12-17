import React, { useCallback, useEffect, useState } from "react";
import { Column, Grid, Box } from "@twilio-paste/core";
import { FlashCard } from "./FlashCard";
import { useParams } from "react-router-dom";
import { FlashCardData } from "./types";
import { API_URL } from "./Constants";

export const App = () => {
  const { id: cardId } = useParams();
  const [cardData, setCardData] = useState<FlashCardData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${API_URL}/card/${cardId}`, {
      method: "POST",
    })
      .then(async (response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
        }
        setCardData(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cardId]);

  const playMedia = useCallback((dataSid: string) => {
    fetch(`${API_URL}/play/${dataSid}`, {
      method: "POST",
    })
      .then(async (response) => response.body as ReadableStream)
      .then(async (media: any) => {
        const context = new AudioContext();
        const source = context.createBufferSource();
        const reader = media.getReader();
        source.connect(context.destination);

        reader.read().then(async ({ done, value }: any) => {
          if (done) {
            return;
          }

          const buffer = await context.decodeAudioData(value.buffer);
          source.buffer = buffer;

          return reader.read();
        });
        source.start();
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  }, []);

  if (loading) {
    return (
      <Box maxWidth="size100" marginLeft="auto" marginRight="auto">
        <Grid gutter="space80" vertical>
          <Column span={8} offset={2}>
            Loading...
          </Column>
        </Grid>
      </Box>
    );
  }

  if (!cardData) {
    return (
      <Box maxWidth="size100" marginLeft="auto" marginRight="auto">
        <Grid gutter="space80" vertical>
          <Column span={8} offset={2}>
            Error. Cannot find this flashcard
          </Column>
        </Grid>
      </Box>
    );
  }

  return (
    <Box maxWidth="size100" marginLeft="auto" marginRight="auto">
      <Grid gutter="space80" vertical>
        <Column span={8} offset={2}>
          <FlashCard onPlay={playMedia} data={cardData} />
        </Column>
      </Grid>
    </Box>
  );
};
