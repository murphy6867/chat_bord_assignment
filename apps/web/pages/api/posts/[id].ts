import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Mock posts data
  const posts = [
    {
      id: 8,
      title: "opopopopopopopop",
      content: "opopopopopopopopo",
      createdAt: "2024-10-21T18:28:24.872Z",
      updatedAt: "2024-10-21T18:28:24.872Z",
      userId: 5,
      categoryId: null,
    },
    {
      id: 9,
      title: "The Big Short War",
      content: "Tall, athletic, handsome with cerulean eyes...",
      createdAt: "2024-10-21T18:28:24.872Z",
      updatedAt: "2024-10-21T18:28:24.872Z",
      userId: 5,
      categoryId: null,
    },
  ];

  const post = posts.find((p) => p.id === parseInt(id as string));

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}
