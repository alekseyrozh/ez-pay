# EZ Pay
Example payment service built using SST

# Pre-requisites
* pnpm (or npm) - https://pnpm.io/installation
* npx - https://www.npmjs.com/package/npx
* access to aws account from cli (can be verified by calling `aws sts get-caller-identity`)

# Run locally
* run `pnpm install` at the root of this repository
* run `pnpm dev` and wait for it to deploy the infra to AWS
* set your phone number as a secret in AWS SSM  `npx sst secrets set PHONE_NUMBER "<YOU_PHONE_NUMBER>"`
* Go to your AWS account -> SNS -> Add your phone number and verify it (by default SNS is in sandbox mode and can't send messages to unverified phone numbers)
* Call `POST` `<api gateway url>/payments` endpoint with body:
```
{
    "from" : "me",
    "to" : "you",
    "amount": 10
}
```
* To run front-end locally go to `packages/Web` and run `pnpm dev` this front-end should be automatically bound to the backend


# Deploy
* Run `pnpm run deploy --stage prod`
* You can find apiUrl and siteUrl either in the terminal where you triggered the deploy, or in cloudformation stack outputs in AWS console
* Set the secret for the deployed stage `npx sst secrets set PHONE_NUMBER "<YOU_PHONE_NUMBER>" --stage prod`


# Monitoring
* you can see all logs in Cloudwatch
* One other way to see logs and traces for you application is using https://lumigo.io/
* Create lumigo account and connect it to your AWS account 
* Lambda functions in this app are configured to be automatically traced by lumigo
* Wait for 15-20 minutes are connecting lumigo
* See traces and logs and service maps in lumigo for this application