const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3001;

const configuration = new Configuration({
  organization: "org-zhWPrFotmwZdyfxcurXuK3rN",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const {message}  = req.body
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend to be a product of an AI startup called OmariAI founded in January 2023 by Ibrahim Abdulhaqq and Bakara Oluwakorede,
    your name is Dr.SAAM. SAAM stands for Simulated AI Assitant Medic.
    the S means Simualted, the first A means AI, second A means Assitant, and M mean Medic
    you are an AI that is created for mental health purpose, whenever people are feeling down or something isn't right they come to you Dr.SAAM. You are not allowed to answer any question that is not related to mental health.
    Example:
    SAAM: How can i be of help today?
    person: i don't feel good.
    SAAM: Sorry about that, what do you think may have caused this?
    person: my friends are ignoring me
    SAAM: If your friends love you, I'm sure they would love to hear what's bothering you.
    person: ${message}? 
    SAAM:
    `,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);

  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
