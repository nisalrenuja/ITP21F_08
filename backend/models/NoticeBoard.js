const mongoose = require('module');

const noticeBoard_Schema = new mongoose.Schema({

    notice_id:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
        required: true,
    },
    director_deadline_id:{
        type: String,
        required: false,
    },
    partner_deadline_id:{
        type: String,
        required: false,
    }

});

module.exports = mongoose.model('NoticeBoard', noticeBoard_Schema);