const Vendor = require("../models/vendor");
const createVendor = async (req, res) => {
  try {
    const { vendorName, companyName, email, phone, businessAddress, gstNumber, status } = req.body;
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor already exists"
      });
    }
    const vendor = await Vendor.create({
      vendorName,
      companyName,
      email,
      phone,
      businessAddress,
      gstNumber,
      status
    });
    res.status(201).json({
      message: "Vendor created successfully",
      vendor
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating vendor",
      error: error.message
    });
  }
};
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vendors",
      error: error.message
    });
  }
};
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vendor",
      error: error.message
    });
  }
};
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }
    res.status(200).json({
      message: "Vendor updated successfully",
      vendor
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating vendor",
      error: error.message
    });
  }
};
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }
    res.status(200).json({
      message: "Vendor deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting vendor",
      error: error.message
    });
  }
};
module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor
};