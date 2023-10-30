import mongoose from "mongoose";

const chazaSchema = new mongoose.Schema(
  {
    owner: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        ref: "Product",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    score: {
      type: Number,
      default: -1,
    },
    image: {
      type: String,
      requried: true,
    },
      // Add the GeoJSON location field
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
    payment_method: [
      {
        type: Number,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

chazaSchema.index({ location: "2dsphere" });
const Chaza = mongoose.model("Chaza", chazaSchema);

export default Chaza;
