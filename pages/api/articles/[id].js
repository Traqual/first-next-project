import { articlesRepo } from "../../../helpers/article-repo";

export default function handler(req, res) {
    if (req.method === 'GET') {
       var article = articlesRepo.getById(req.query.id);
       if(article) {
         res.status(200).json(article);
       } else {
         res.status(404).json({'message': 'NOT FOUND'});
       }
    } else if (req.method === 'PUT') {
        res.status(200).json(articlesRepo.update(req.query.id, req.body));
    } else if (req.method === 'DELETE') {
        res.status(200).json(articlesRepo.delete(req.query.id));
    }
  }
  