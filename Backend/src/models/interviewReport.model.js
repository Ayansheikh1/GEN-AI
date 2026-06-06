const moongoose = require('mongoose');


const technicalQuestionSchema = new moongoose.Schema({
    question:{
        type:String,    
        required:[true,"technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention of the question is required"] 
    },
    answer:{
        type:String,
        required:[true,"answer to the question is required"]
    }
},{
    _id:false
})

const behavioralQuestionSchema = new moongoose.Schema({
    question:{
        type:String,    
        required:[true,"behavioral question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention of the question is required"] 
    },
    answer:{
        type:String,
        required:[true,"answer to the question is required"]
    }
},{
    _id:false
});

const skillGapSchema = new moongoose.Schema({
    skill:{
        type:String,   
        required:[true,"skill name is required"]
    },
    severity:{  
        type:String,
        enum:["low","medium","high"],
        required:[true,"skill gap level is required"]
    }
},{
    _id:false
});

const preparationPlanSchema = new moongoose.Schema({
    day:{
        type:Number,
        required:[true,"day number is required"]
    },
    focus:{

    },
    task:[
        {
            type:String,
            required:[true,"preparation task is required"]
        }
    ]
},{
    _id:false
})




const interviewReportSchema = new moongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Please provide job description"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
});

const interviewReportModel = moongoose.model("interviewReport",interviewReportSchema);

module.exports = interviewReportModel;


/**file description:
 * -----------------
 * This file contains the Mongoose schema and model for the interview report. The interview report includes details about the job description, resume, self-description, match score, technical questions, behavioral questions, skill gaps, and preparation plan. Each of these sections is defined as a sub-schema within the main interview report schema. The model is then exported for use in other parts of the application.
 * input -> job description 
 *          resume
 *          self-description
 *          match score
 * 
 * output -> technical questions (question, intention, answer)
 *           behavioral questions (question, intention, answer)
 *           skill gaps (skill, severity)
 *           preparation plan (day, focus, task)
 * 
 */ 

