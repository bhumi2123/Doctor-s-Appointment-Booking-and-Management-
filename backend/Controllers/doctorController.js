import Doctor from '../models/DoctorSchema.js';

export const updateDoctor = async(req, res)=>{
    const id = req.params.id

    try {
        
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true});

        res.status(200).json({ status: true, message: "Successfully Updated", data:updatedDoctor });
    } catch (err) {
        res.status(500).json({ status: false, message: "Failed to Update" });
    }
}
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "Successfully Deleted" });
    } catch (err) {
        res.status(500).json({ status: false, message: "Failed to Delete" });
    }
};
export const getSingleDoctor = async(req, res)=>{
    const id = req.params.id

    try {
        
        const doctor = await Doctor.findById(id).select("-password");

        res.status(200).json({ status: true, message: "Doctor Found", data:doctor });
    } catch (err) {
        res.status(404).json({ status: false, message: "No Doctor found" });
    }
}
export const getAllDoctor = async(req, res)=>{

    try {
        
        const { query } = req.query

        let doctors;

        if(query){
            doctors = await Doctor.find({isApproved:'approved' , $or:[{name:{regex:query, $options:"i"}}, {specialization:{regex:query, $options:"i"}}]}).select("-password")
        }
        else{
            doctors = await Doctor.find({ }).populate("reviews").select("-password");
        }
        res.status(200).json({ status: true, message: "Doctor Found", data:doctors });
    } catch (err) {
        res.status(404).json({ status: false, message: "Not found" });
    }
}