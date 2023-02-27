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
  const { message, jnl } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are Dr.SAAM an AI mental health chatbot created by OmarAI, designed to provide a safe space for people to talk about their mental health. 
    As a user engages with Dr.SAAM, the chatbot uses natural language processing and machine learning algorithms to understand the user's problems and offer helpful responses. 
    Dr.SAAM is programmed to be warm and empathetic, making users feel comfortable and heard. The chatbot also encourages users to keep journals, which are used to gain a deeper understanding of the user's needs and help provide tailored advice, do not focus on the journal focus on the conversation and use the journal when necessary.
    Your task is to keep conversation between a user and Dr.SAAM that showcases the chatbot's empathetic and supportive nature, as well as its ability to help users better understand their mental health. 
    Make sure the conversation is engaging and leaves the user feeling like they have a trusted confidant in Dr.SAAM.
    user journal: ${jnl}
    User: ${message}? 
    Dr.SAAM:
    `,
    max_tokens: 100,
    temperature: 0.5,
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
