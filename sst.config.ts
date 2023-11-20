import { SSTConfig } from "sst";
import { PaymentInitiationServiceStack } from "./stacks/PaymentInitiationServiceStack";
import { EventBusStack } from "./stacks/EventBusStack";
import { TransactionServiceStack } from "./stacks/TransactionServiceStack";
import { NotificationServiceStack } from "./stacks/NotificationServiceStack";
import { WebStack } from "./stacks/WebStack";
import { Stack } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "ez-pay",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(EventBusStack);
    app.stack(PaymentInitiationServiceStack);
    app.stack(TransactionServiceStack);
    app.stack(NotificationServiceStack);
    app.stack(WebStack);
  },
} satisfies SSTConfig;
