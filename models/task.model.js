const {Schema, model} = require('mongoose');
const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        default: new Date(),
    },
    endAt : {
        type: Date,
    },
    level:{
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    status:{
        // complete or none
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        index: true,
    }

})
const taskFn = {
    getAll: async function(owner){
        const response = await taskModel.find({owner: owner}).sort({createAt: -1});
        return {status: 200, data: response};
    },
    getOne: async function(data){
        try{
            const {id, owner} = data;
            const response = await taskModel.findOne({_id: id, owner: owner});
            return {status: 200, data: response};
        }catch(error){
            return {status: 404, message: "Not found task!"};
        }
    },
    create: async function(data){
        try{
            const newTask = new taskModel({
                title: data.title,
                content: data.content,
                endAt: data.endAt,
                owner: data.owner
            });
            await newTask.save();
            return {status: 200, message: 'Create task success'};
        }catch(error){
            return {status: 500, message: 'Create task fail'};
        }
    },
    update: async function(data){
        try{
            const response = await taskModel.findOneAndUpdate({_id: data.id, owner: data.owner}, {
                title: data.title,
                content: data.content,
                endAt: data.endAt,
                level: data.level,
                status: data.status,
            },{
                new: true,
            });
            return {status: 200, data:{
                message: 'Update task success',
                data: response
            }};

        }catch(error){
            return { status: 500, message: "Update taks fail!"};
        }
    },
    delete: async function(data){
        try{
            const response = await taskModel.findOneAndDelete({_id: data.id, owner: data.owner});
           if(response === null){
                return {status: 404, message: "Not found task!"};
           }else{
                return {status: 200, message: "Delete task success!"};
           }
        }catch(error){
            return {status: 500, message: 'Delete task fail'};
        }

    }
        
}


const taskModel = model('tasks', schema);
module.exports = taskFn
