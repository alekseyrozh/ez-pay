import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity } from "electrodb";
import { Table } from "sst/node/table";

const dynamoDBClient = new DynamoDBClient({});

export const TransactionEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Transaction",
      service: "TransactionService",
    },
    attributes: {
      transactionId: {
        type: "string",
        required: true,
      },
      from: {
        type: "string",
        required: true,
      },
      to: {
        type: "string",
        required: true,
      },
      amount: {
        type: "number",
        required: true,
      },
      savedAt: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "transactionId",
          composite: ["transactionId"],
        },
      },
    },
  },
  { table: Table.Transactions.tableName, client: dynamoDBClient }
);
