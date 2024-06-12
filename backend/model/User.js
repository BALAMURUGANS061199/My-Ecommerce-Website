const {Schema} = require('mongoose')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const UserSchema = Schema({
    name:{
        type:String,
        required:[true,'is Required']
    },
    email:{
        type:String,
        required: true,
        index: true,
        set:function(email){
            return email.toLowerCase();
        },
        validate:{
            validator:function(email){
                return  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
            },
            message: props =>`${props.value} is not a Valid Email`
        }
    },
    password:{
        type: String,
        required:[true,'is Required'],
        validate:{
            validator:function(password){
        return password.length >=8; 
            },
        message: props => `${props.value} Password Must be 8 Characters` 

            }
        },
    isAdmin:{
        type:Boolean,
        default: false
    },

    cart:{
        type:Object,
        default:{
            total: 0,
            count :0
        }
    },
    notifications:{
        type: Array,
        default:[]
    },

orders:[{
    type:Schema.Types.ObjectId, ref:'Order'
}],
},
{minimize:false})

// UserSchema.pre('save',async function(next){
//     const user =this;
//     if(!user.isModified('password')){
//         return next();
//     }
//     try{
// const salt =await bcrypt.genSalt(10)
// user.password =await bcrypt.hash(user.password,salt);
// next();
//     }
//     catch(err){next(err);}
// })


// UserSchema.methods.comparePassword =function(candidatepassword){
//     return bcrypt.compare(candidatepassword,this.password)
// }

UserSchema.methods.toJSON =function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject
}


// UserSchema.pre('save',function(next){
//     const user = this;
//     if(!user.isModified('password')) return next();

//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err) return next(err)
//         bcrypt.hash(user.password,salt, function(err,hash){
//             if(err) return next(err)
//             user.password = salt;
//         next();
//         })
//     })
// })

UserSchema.pre('remove',function(next){
    this.model('Order').remove({owner:this._id},next)
})


const User = mongoose.model('User',UserSchema)

module.exports = User