import DailyForm from "../models/dailyForm.js";

// Créer une nouvelle instance de formulaire quotidien
export async function createDailyForm(req, res) {
    const { bedTime, wakeUpTime, stress, alcoholDrug, medication, moodchanges, sleeping, flashingLights, exercise, mealSleepNoValue, recentChanges, visualAuraChecked, sensoryAuraChecked, auditoryAuraChecked, gustatoryOrOlfactoryAuraChecked, headachesChecked, excessiveFatigueChecked, abnormalMoodChecked, sleepDisturbancesChecked, concentrationDifficultiesChecked, increasedSensitivityChecked, isArchived } = req.body;
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session

    try {
        // Créer une nouvelle instance de formulaire quotidien
        const newDailyForm = new DailyForm({
            userId,
            bedTime,
            wakeUpTime,
            stress,
            alcoholDrug,
            medication,
            moodchanges,
            sleeping,
            flashingLights,
            exercise,
            mealSleepNoValue,
            recentChanges,
            visualAuraChecked,
            sensoryAuraChecked,
            auditoryAuraChecked,
            gustatoryOrOlfactoryAuraChecked,
            headachesChecked,
            excessiveFatigueChecked,
            abnormalMoodChecked,
            sleepDisturbancesChecked,
            concentrationDifficultiesChecked,
            increasedSensitivityChecked,
            isArchived,
        });

        // Enregistrer le formulaire dans la base de données
        const savedDailyForm = await newDailyForm.save();

        res.status(201).json(savedDailyForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Récupérer tous les formulaires quotidiens pour un utilisateur spécifique
export async function getAllDailyForms(req, res) {
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session

    try {
        // Récupérer tous les formulaires quotidiens pour cet utilisateur spécifique
        const dailyForms = await DailyForm.find({ userId: userId });
        res.status(200).json(dailyForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Récupérer un formulaire quotidien par son ID
export async function getDailyFormById(req, res) {
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session
    const formId = req.params.id;

    try {
        // Récupérer le formulaire quotidien par son ID
        const dailyForm = await DailyForm.findById(formId);
        if (!dailyForm) {
            return res.status(404).json({ error: 'DailyForm not found' });
        }

        // Vérifier si le formulaire appartient à l'utilisateur actuellement authentifié
        if (dailyForm.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' }); // L'utilisateur n'est pas autorisé à accéder à ce formulaire
        }

        res.status(200).json(dailyForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/*// Mettre à jour un formulaire quotidien
export async function updateDailyForm(req, res) {
    const formId = req.params.id;
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session
    const { bedTime, wakeUpTime, stress, alcoholDrug, medication, moodchanges, sleeping, flashingLights, exercise, mealSleepNoValue, recentChanges, visualAuraChecked, sensoryAuraChecked, auditoryAuraChecked, gustatoryOrOlfactoryAuraChecked, headachesChecked, excessiveFatigueChecked, abnormalMoodChecked, sleepDisturbancesChecked, concentrationDifficultiesChecked, increasedSensitivityChecked, isArchived } = req.body;

    try {
        // Vérifier si le formulaire quotidien existe
        const dailyForm = await DailyForm.findById(formId);
        if (!dailyForm) {
            return res.status(404).json({ error: 'DailyForm not found' });
        }

        // Vérifier si le formulaire appartient à l'utilisateur actuellement authentifié
        if (dailyForm.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' }); // L'utilisateur n'est pas autorisé à modifier ce formulaire
        }

        // Mettre à jour le formulaire quotidien
        const updatedDailyForm = await DailyForm.findByIdAndUpdate(formId, {
            userId,
            bedTime,
            wakeUpTime,
            stress,
            alcoholDrug,
            medication,
            moodchanges,
            sleeping,
            flashingLights,
            exercise,
            mealSleepNoValue,
            recentChanges,
            visualAuraChecked,
            sensoryAuraChecked,
            auditoryAuraChecked,
            gustatoryOrOlfactoryAuraChecked,
            headachesChecked,
            excessiveFatigueChecked,
            abnormalMoodChecked,
            sleepDisturbancesChecked,
            concentrationDifficultiesChecked,
            increasedSensitivityChecked,
            isArchived
        }, { new: true });

        res.status(200).json(updatedDailyForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}*/

// Mettre à jour un formulaire quotidien
export async function updateDailyForm(req, res) {
    const formId = req.params.id;
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session
    const { isArchived } = req.body;

    try {
        // Vérifier si le formulaire quotidien existe
        const dailyForm = await DailyForm.findById(formId);
        if (!dailyForm) {
            return res.status(404).json({ error: 'DailyForm not found' });
        }

        // Vérifier si le formulaire appartient à l'utilisateur actuellement authentifié
        if (dailyForm.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' }); // L'utilisateur n'est pas autorisé à modifier ce formulaire
        }

        // Mettre à jour le formulaire quotidien avec seulement l'état isArchived
        dailyForm.isArchived = isArchived;
        const updatedDailyForm = await dailyForm.save();

        res.status(200).json(updatedDailyForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Supprimer un formulaire quotidien
export async function deleteDailyForm(req, res) {
    const formId = req.params.id;
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir de la session

    try {
        // Vérifier si le formulaire appartient à l'utilisateur
        const dailyForm = await DailyForm.findById(formId);
        if (!dailyForm) {
            return res.status(404).json({ error: 'DailyForm not found' });
        }

        // Vérifier si le formulaire appartient à l'utilisateur actuellement authentifié
        if (dailyForm.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' }); // L'utilisateur n'est pas autorisé à supprimer ce formulaire
        }

        // Supprimer le formulaire quotidien
        const deletedDailyForm = await DailyForm.findByIdAndDelete(formId);
        res.status(200).json(deletedDailyForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
