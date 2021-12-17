const fs = require("fs");
const path = require("path");
const { DynamoDB } = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;
const REGION = process.env.REGION;
const dynamoDbClient = new DynamoDB.DocumentClient({
  region: REGION,
});

(async () => {
  const scanParams = {
    TableName: `${USERS_TABLE}`,
  };

  const existingData = await dynamoDbClient.scan(scanParams).promise();

  for (const data of existingData.Items || []) {
    const deleteParams = {
      TableName: `${USERS_TABLE}`,
      Key: {
        id: data.id,
      },
    };

    try {
      await dynamoDbClient.delete(deleteParams).promise();
      console.warn(`Item ${data.id} deleted`);
    } catch (err) {
      console.warn(err);
    }
  }

  const tableData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "table-data.json"), "utf8")
  );

  for (const data of tableData) {
    const params = {
      TableName: `${USERS_TABLE}`,
      Item: data,
    };

    try {
      await dynamoDbClient.put(params).promise();
      console.log(`PutItem succeeded: ${data.id}`);
    } catch (error) {
      const err = error;
      console.error(err);

      throw new Error(`Unable to add ${data.title}`);
    }
  }
})();
