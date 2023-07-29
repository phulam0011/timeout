// import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "618e4e45564dc0929a84d0780fc1b24abac815147c51dd97fe2a7677a81e17f2",
        input: { input_text: req.body.input},
      }),
    });
    console.log(response);

    if (response.status !== 201) {
      const error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    const prediction = await response.json();
    console.log(prediction);
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: 'Internal Server Error' }));
  }
}
