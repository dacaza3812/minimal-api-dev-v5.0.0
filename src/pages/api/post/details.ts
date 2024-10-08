// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
import { paramCase } from 'src/utils/change-case';
// _mock
import { _posts } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    const { title } = req.query;

    const post = _posts.find((post) => paramCase(post.title) === title);

    if (!post) {
      res.status(404).json({
        message: 'Post Not Found!',
      });
      return;
    }

    res.status(200).json({
      post,
    });
  } catch (error) {
    console.error('[Blog API]: ', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
