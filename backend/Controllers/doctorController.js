import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update", err });
  }
};
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await doctor.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete", err });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      status: true,
      message: "Doctor Found",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "No Doctor Found", err });
  }
};
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      status: true,
      message: "Doctors Found",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "No Doctors Found", err });
  }
};
