import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Feed from '../../models/feed';

type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const feeds = await Feed.find({});
        res.status(200).json({ success: true, data: feeds });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch feeds' });
      }
      break;

    case 'POST':
      try {
        const feed = await Feed.create(req.body);
        res.status(201).json({ success: true, data: feed });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create feed' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
