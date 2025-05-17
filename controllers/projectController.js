import Projet from '../models/project.model.js';

// Ajouter un projet
export const ajouterProjet = async (req, res) => {
  const {
    nom,
    description,
    dateDebut,
    dateFin,
    budgetPrevu,
    budgetConsomme,
    dateCreationBudget
  } = req.body;

  // Vérifier les champs obligatoires
  if (!nom || !description) {
    return res.status(400).json({
      success: false,
      message: "Le nom et la description sont obligatoires."
    });
  }

  try {
    // Vérifier si un projet avec le même nom ET description existe
    const existingProjet = await Projet.findOne({ nom, description });

    if (existingProjet) {
      return res.status(400).json({
        success: false,
        message: "Un projet avec le même nom et la même description existe déjà."
      });
    }

    // Créer et sauvegarder le nouveau projet
    const nouveauProjet = new Projet({
      nom,
      description,
      dateDebut,
      dateFin,
      budgetPrevu,
      budgetConsomme,
      dateCreationBudget
    });

    await nouveauProjet.save();

    return res.status(201).json({
      success: true,
      message: "Projet ajouté avec succès.",
      projet: nouveauProjet
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message
    });
  }
};

// Récupérer tous les projets
export const getProjets = async (req, res) => {
  try {
    const projets = await Projet.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, projets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  }
};

// Supprimer un projet par ID
export const supprimerProjet = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Projet.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Projet introuvable." });
    }
    res.status(200).json({ success: true, message: "Projet supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  }
};

// Modifier un projet par ID
export const modifierProjet = async (req, res) => {
  const { id } = req.params;
  try {
    const projet = await Projet.findByIdAndUpdate(id, req.body, { new: true });
    if (!projet) {
      return res.status(404).json({ success: false, message: "Projet introuvable." });
    }
    res.status(200).json({ success: true, message: "Projet mis à jour.", projet });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  } 
};
export const getProjetById = async (req, res) => {
    try {
      const projet = await Projet.findById(req.params.id);
      if (!projet) {
        return res.status(404).json({ success: false, message: "Projet non trouvé." });
      }
      res.status(200).json({ success: true, projet });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  