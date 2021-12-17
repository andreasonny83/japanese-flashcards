import { createAudioData, getAudioWord } from "./helpers";

export const handler = async (event: any = {}) => {
  const audioSid: string = event?.pathParameters?.cardId;

  if (!audioSid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "A valid audioSid must be provided",
      }),
    };
  }

  try {
    const audioWord = await getAudioWord(audioSid);
    const audioData = await createAudioData(audioWord);

    if (!audioData) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Cannot find any audio data",
        }),
      };
    }

    const response = {
      statusCode: 200,
      headers: {
        "content-type": "audio/mpeg",
        // "Access-Control-Allow-Origin": "https://www.google.com",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
      body: audioData.toString("base64"),
      isBase64Encoded: true,
    };
    return response;
  } catch (error: any) {
    console.error(error);
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message || "Cannot get any audio data",
      }),
    };
    return response;
  }
};
