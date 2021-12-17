import { DynamoDB, AWSError, Polly } from "aws-sdk";

export type AudioStream = Polly.AudioStream;

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new DynamoDB.DocumentClient();

export const getTable = async <T>(recordId: string): Promise<T> => {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: `${USERS_TABLE}`,
    Key: {
      id: recordId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();

    if (Item) {
      return Item as T;
    } else {
      throw new Error(`Could not find record '${recordId}'`);
    }
  } catch (error: any) {
    const err: AWSError = error;
    throw new Error(err.message || "Could not find data");
  }
};

export const synthesizeSpeech = async (
  text: string
): Promise<Polly.AudioStream | undefined> => {
  return new Promise((resolve, reject) => {
    const pollyParams: AWS.Polly.Types.SynthesizeSpeechInput = {
      OutputFormat: "mp3",
      SampleRate: "22050",
      Text: `<speak><prosody rate="80%">${text}</prosody></speak>`,
      TextType: "ssml",
      LanguageCode: "ja-JP",
      VoiceId: "Mizuki",
      Engine: "standard",
    };

    const polly = new Polly();

    polly.synthesizeSpeech(
      pollyParams,
      (error: AWS.AWSError, data: AWS.Polly.Types.SynthesizeSpeechOutput) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(data.AudioStream);
      }
    );
  });
};
