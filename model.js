const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const mongooseUniqueValidator=require("mongoose-unique-validator");

const schema=new Schema({
    //firstName : {type:JSON,required:true},
    //firstName1 : {type:Object,required:true,unique:true},
    //firstName1 : {type:Schema.Types.ObjectId,ref: "Message"}
    // Message might be the name of a model
    Weather: {type:JSON,require:true},
    Humidity: {type:JSON,require:true},
    Temperature:{type:JSON,require:true}
});

schema.plugin(mongooseUniqueValidator);

module.exports=mongoose.model('Climate',schema);
