import { getFlashCardData } from "./helpers";

export const handler = async (event: any = {}) => {
  const cardId: string = event?.pathParameters?.cardId;

  if (!cardId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "cardId not provided" }),
    };
  }

  try {
    const cardInfo = await getFlashCardData(cardId);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTION",
      },
      body: JSON.stringify(cardInfo),
    };
    return response;
  } catch (error: any) {
    console.error(error);
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message || "Cannot get the flashcard data",
      }),
    };
    return response;
  }
};
