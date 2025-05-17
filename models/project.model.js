
import mongoose from 'mongoose';

const projetSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dateDebut: {
    type: Date
  },
  dateFin: {
    type: Date
  },
  budgetPrevu: {
    type: Number
  },
  budgetConsomme: {
    type: Number
  },
  dateCreationBudget: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('Projet', projetSchema);
