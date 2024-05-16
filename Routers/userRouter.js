
import express from 'express'
import { getUsers,getUserByUsername,login ,addUser,updateUserbyID,deleteUserbyID} from '../controllers/userController.js'
import passport from '../Utils/passport.js'

const userRouter = express.Router()

userRouter.get('/',getUsers)
userRouter.get('/username/:username',getUserByUsername)
userRouter.post('/signup',addUser)
userRouter.patch('/:id',updateUserbyID)
userRouter.delete('/:id',deleteUserbyID)
userRouter.post('/login',login) //using post for security reasons
userRouter.post('/verify',passport.authenticate('jwt', { session: false }))
userRouter.post('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Authenticated successfully');
});

export default userRouter