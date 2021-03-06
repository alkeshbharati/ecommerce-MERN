import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'

connectDb()

export default async (req,res) => {
    const { name , email , password } = req.body
     try{
        const user  = await User.findOne({ email })
        if(user){
            return res.status(422).send(`User already exists with ${email}`)
        }
        const hash = await bcrypt.hash(password,10)
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save()

        await new Cart({
            user : newUser._id
        }).save()
       const token = jwt.sign({ userId : newUser._id }, process.env.JWT_SECRET,{ expiresIn :'7d'})
       res.status(201).json(token)
    }catch(error){
            res.status(500).send("Error in Sign up Plese try again later")
    }

}