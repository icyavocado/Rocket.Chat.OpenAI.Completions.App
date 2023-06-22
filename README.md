# OpenAI Chat App
Use OpenAi Completions (ChatGPT3) inside Rocket.Chat!

## Installing this App

You can find the [app packages here](https://github.com/icyavocado/Rocket.Chat.OpenAI.Completions.App/releases)

## Using this App
After installing, [grab your Open AI key](https://platform.openai.com/account/api-keys)

Now, configure your App with those credentials:

![image](https://user-images.githubusercontent.com/1761174/223877973-208e0e95-26fb-4117-adaf-22439ea0a955.png)

### Use with /chatgpt
You can use it with `/chatgpt`, like so:

![image](https://user-images.githubusercontent.com/1761174/223879215-4482a3ea-dd3c-4c6e-aed7-8687b112a2e9.png)

or you can call only `/chatgpt` and get the modal

### Use the message action button
Or you can call as a message action button:

![image](https://user-images.githubusercontent.com/1761174/223878804-6c144c3f-3252-48a6-81c0-5354aaeacb5f.png)

![image](https://user-images.githubusercontent.com/1761174/225786569-6cf715f2-8bf3-4123-a019-233ce2aa3ffc.png)


### Or send a direct message to the App user. The answer will come as a thread, and will consider the context
![image](https://user-images.githubusercontent.com/1761174/226495574-bd0fc66a-f82b-4b8e-bcc3-c5dccc4170d8.png)

### Setup development environment

You need to install npm packages, setup config file, and then deploy the app:

```
# Install npm packages
npm ci
# Duplicate the config file to deploy
cp .rcappsconfig.dist .rcappsconfig
# Deploy app straight to your testing environment
npm run deploy
```

## ROADMAP
- Summarize Threads/Livechat
- Allow to send the response to a group of users
- Optionally preview the response
- Configuration modal for the user with pre-defined system instruction and optional preview flow.
