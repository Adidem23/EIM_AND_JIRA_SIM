const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    appID: {
        type: Number,
    },
    issueID: {
        type: Number,
    },
    issueType: {
        type: String,
    },
    summary:{
        type: String,
    },
    technologyType:{
        type:String,
    },
    technologyVersion:{
        type:String, 
    },
    obsolateDate:{
        type:Date,
    },
    issueRemediationDate:{
        type:Date,
    },
    hardwareDetails:{
       type:[Object]
    },
    softwareDetails:{
        type:[Object]
    },
    department:{
        type:String, 
    }, 
    servers:{
        type:[String]
    },
    ipAddress:{
        type:String,
    },
    serverRole:{
        type:String,
    },
    environment:{
        type:String,
    }
})

module.exports = mongoose.model("Records", RecordSchema);