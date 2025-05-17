import express from 'express';
import {
  ajouterProjet,
  getProjets,
  supprimerProjet,
  modifierProjet,
  getProjetById
} from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.post('/ajouter', ajouterProjet);
projectRouter.get('/', getProjets);
projectRouter.delete('/:id', supprimerProjet);
projectRouter.put('/:id', modifierProjet);
projectRouter.get('/:id', getProjetById);

export default projectRouter;
