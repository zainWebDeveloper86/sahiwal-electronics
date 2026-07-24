// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     cart:{
//         type: Array,
//         required: true,
//     },
//     shippingAddress:{
//         type: Object,
//         required: true,
//     },
//     user:{
//         type: Object,
//         required: true,
//     },
//     totalPrice:{
//         type: Number,
//         required: true,
//     },
//     status:{
//         type: String,
//         default: "Processing",
//     },
//     paymentInfo:{
//         id:{
//             type: String,
//         },
//         status: {
//             type: String,
//         },
//         type:{
//             type: String,
//         },
//     },
//     paidAt:{
//         type: Date,
//         default: Date.now,
//     },
//     deliveredAt: {
//         type: Date,
//     },
//     createdAt:{
//         type: Date,
//         default: Date.now,
//     },
// });

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

// Nested User Schema (Type Safety ke liye)
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
}, { _id: false }); //  _id: false, kyunki parent _id use kar rahe hain

const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  user: {
    type: userSchema, //  Nested schema
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
    type: { type: String },
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);