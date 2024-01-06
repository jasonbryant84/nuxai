import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { workbookId } = req.query;

  try {
    const BEARER_TOKEN = process.env.API_BEARER_TOKEN;
    const url = `https://api.nux.ai/run/workbook/${workbookId}`;

    const responseObj = await axios.post(url, null, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });

    res.status(200).json(responseObj?.data);
  } catch (error) {
    console.error('Error making POST request:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while making the API request.' });
  }
};
