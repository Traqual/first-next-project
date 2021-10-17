import { categoriesRepo } from "../../../helpers/categorie-repo";

export default function handler(req, res) {
    if (req.method === 'DELETE') {
        res.status(200).json(categoriesRepo.delete(req.query.id));
    }
  }
  