const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const bodyParser = require('body-parser');

const clovaSkillHandler = clova.Client
  .configureSkill()
  .onLaunchRequest(responseHelper => {
    responseHelper.setSimpleSpeech({
      lang: 'ja',
      type: 'PlainText',
      value: '書きおこしスキルを起動しました',
    });
  })
  .onIntentRequest(async responseHelper => {
    const intent = responseHelper.getIntentName();
    const sessionId = responseHelper.getSessionId();

    switch (intent) {
      case 'test':
        responseHelper.setSimpleSpeech({
          lang: 'ja',
          type: 'PlainText',
          value: '文字に書き起こしました',
        });
        break;
    }
  })
  .onSessionEndedRequest(responseHelper => {
    const sessionId = responseHelper.getSessionId();

    // Do something on session end
  })
  .handle();

const app = new express();
const clovaMiddleware = clova.Middleware({ applicationId: "com.clova.firebase.vue" });
// Use `clovaMiddleware` if you want to verify signature and applicationId.
// Please note `applicationId` is required when using this middleware.
app.post('/clova', clovaMiddleware, clovaSkillHandler);

// Or you can simply use `bodyParser.json()` to accept any request without verifying, e.g.,
app.post('/clova', bodyParser.json(), clovaSkillHandler);

if(!isNaN(process.env.PORT_APP)) {
    port = process.env.PORT_APP;
} else {
    port =3000;
}
console.log(port)
app.listen(port)
