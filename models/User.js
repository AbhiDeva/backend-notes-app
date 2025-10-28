import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema  =  new mongoose.Schema({
    name: {
        type: String,
        required:  true,
        trim:  true
    }, 
    email: {
        type: String,
        required:  true,
        unique: true,
        lowercase: true,
        trim: true
    }, 
    password: {
        type : String,
        required: true,
        minLength: 6
    }
}, {
    timestamps : true
});


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


userSchema.methods.comparePassword = async function(candiatePassword) {
    return await bcrypt.compare(candiatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;