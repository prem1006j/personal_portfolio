const Joi = require("joi");


const contactSchema = Joi.object({

name:Joi.string()
.required(),

email:Joi.string()
.email()
.required(),

subject:Joi.string(),

message:Joi.string()
.required()


});


module.exports = contactSchema;