import { articlesRepo } from "../../../helpers/article-repo";

export default function handler(req, res) {
    if (req.method === 'POST') {
        articlesRepo.create(JSON.parse(req.body));
        res.status(200).json({'message': 'OK'});
    } else if(req.method === 'GET') {
        res.status(200).json(articlesRepo.getAll());
    }
  }
  