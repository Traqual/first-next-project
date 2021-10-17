import { categoriesRepo } from "../../../helpers/categorie-repo";

export default function handler(req, res) {
    if (req.method === 'POST') {
        categoriesRepo.create(JSON.parse(req.body));
        res.status(200).json({'message': 'OK'});
    } else if(req.method === 'GET') {
        res.status(200).json(categoriesRepo.getAll());
    }
  }
  