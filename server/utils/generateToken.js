import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email, 
        },
        config.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
}