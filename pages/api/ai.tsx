import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
const apiKey = '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';

// const configuration = new Configuration({
//   //apiKey: process.env.OPEN_API_KEY,
//   apiKey: 'AvGgWJMAOtz98loKir2xT3BlbkFJF5oBc5iXZxChZmuazhrY',
// });

// const openai = new OpenAIApi(configuration);


// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: req.body.prompt,
//       temperature: 1,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       max_tokens: 2048,
//     });

//     // Send a response with a status code of 200 and the generated text as the response body
//     res.status(200).json({ result: completion.data });
//   } catch (error) {
//     console.error("Error making API call:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const completion = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: req.body.prompt,
        max_tokens: 2048, // Response size
        temperature: 0.5, // Creativity in response
      })
    });

    const data = await completion.json();

    //Send a response with a status code of 200 and the generated text as the response body
    res.status(200).json({ result: data });
  } catch (error) {
    console.error("Error making API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
