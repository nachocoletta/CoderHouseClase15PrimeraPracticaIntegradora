import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true }
})
const cartSchema = new mongoose.Schema({
    products: { type: [productSchema] }
}, { timestamps: true });

cartSchema.pre('find', function () {
    this.populate('products._id')
})

export default mongoose.model('Cart', cartSchema);