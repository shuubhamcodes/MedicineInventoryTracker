import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usage: {
    type: String,
    required: true,
    enum: ['Before Meal', 'After Meal']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isExpiringSoon: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Virtual field for isExpiringSoon
medicineSchema.pre('save', function(next) {
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  this.isExpiringSoon = this.expiryDate <= sevenDaysFromNow;
  next();
});

export default mongoose.model('Medicine', medicineSchema);






