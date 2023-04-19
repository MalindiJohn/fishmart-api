import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';

/** Middleware for checking and validating the jwt token */
export async function checkValidateToken(req, res, next ) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // split the auth headers to find the token, which is the second element of the array string.

    if(token == null) return res.status(401); // If the token string does not exist in the header

    jwt.verify(token, process.env.APP_SECRET, async (error, user) => {
        if(error) return res.status(403)
        // console.log(req.isvip);
        req.isvip = user.pvv
        req.user = user;

    })
    
}

/** Middlware for checking whether the user is an admin user */
export async function checkAdminUser(req, res, next) {
    req.admin = {}
    req.user;
    const userRepo = AppDataSource.getRepository(User);
    
    const user = await userRepo.findOne(req.user['user']);

    if(!user) return res.status(403)

    let specialUser = user.isStaff;
    console.log('special user');
    
    if(!specialUser) res.status(401);

    req.admin = specialUser;
    next();
 

}