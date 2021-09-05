const mongoose = require("mongoose");
const { ObjectId } = mongoose.SchemaTypes;


const attendancesSchema = new mongoose.Schema({
    //declare variables/properties
    /*
    emp_id: {
        type: ObjectId,
        ref: "Staff",
        required: [true, "employee_id is required"],
      },

      */
      date: {
        type: Date,
        required: [true, "date is required"],
      },
      type: {
        type: String,
        required: [true, "type is required"],
        enum: ["present", "absent"],
      },
      /*
    location: [
        {

            tag: "location1",
            type:String,
            required:false//since must have
        },
        {

            tag: "location2",
            type:String,
            required:false//since must have
        }
    ],
    time_in: {
        type: String,
        required: false,
    },
    time_out: {
        type: String,
        required: false,
    },
    
    att_status: {
        type: String,
        required: false,
    },
    */

},

    {
        timestamps: true,
    }

);

//attendanceSchema.index({ employee_id: 1, date: 1 }, { unique: true });
attendancesSchema.index({date: 1 }, { unique: true });
module.exports = mongoose.model("attendances", attendancesSchema);