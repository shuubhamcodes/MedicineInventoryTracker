import Medicine from '../models/Medicine.js';

export const createMedicine = async (req, res) => {
  try {
    const medicine = new Medicine({
      ...req.body,
      createdBy: req.user.userId
    });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Error creating medicine' });
  }
};

export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ createdBy: req.user.userId });
    
    // Update isExpiringSoon flag for each medicine
    const updatedMedicines = medicines.map(medicine => {
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      medicine.isExpiringSoon = medicine.expiryDate <= sevenDaysFromNow;
      return medicine;
    });

    res.json(updatedMedicines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicines' });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Error updating medicine' });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medicine' });
  }
};