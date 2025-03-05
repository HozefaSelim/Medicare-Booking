import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Failed to update", data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found", err });
  }
};

// create review
export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId; // Corrected line
  const newReview = new Review(req.body);

  try {
    console.log("Saving review...");
    const savedReview = await newReview.save();
    console.log("Review saved:", savedReview);

    console.log("Updating doctor...");
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });
    console.log("Doctor updated");

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    console.log("Error creating review:", err);
    res.status(404).json({ success: false, message: err.message });
  }
};
