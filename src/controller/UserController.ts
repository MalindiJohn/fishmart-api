import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { Member } from "../entity/Member";
import { pbkdf2Sync, randomBytes} from "crypto";
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../data-source";

export class UserController {


    private userRepository = AppDataSource.getRepository(User); // Initalizing the users repository

    private memberRepository = AppDataSource.getRepository(Member); // Initializing the members repository

    /** Getting a list of all system users */
    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    /** Will be used to show the details of a particular user. For instance in a profile/account view of an account */
    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne({where: {email: request.params.email}});
    }

    /** User registration. Adding a user into the system */
    async register(request: Request, response: Response, next: NextFunction) {
        let user = new User();
        let userToRegister = request.body
        let userObject = {
            firstName: userToRegister.firstName,
            lastName: userToRegister.lastName,
            email: userToRegister.email,
            telephone: userToRegister.telephone,
            location: userToRegister.location,
            password: userToRegister.password
        }

        user.email = userObject.email;

        // create a random salt for the user being registered
        user.salt = randomBytes(16).toString('hex');        

        user.password = pbkdf2Sync(userObject.password, user.salt, 1000, 64, 'sha512').toString('hex');

        // console.log(user.password);

        try {

            const memberToRegister = this.memberRepository.save({
                firstName: userObject.firstName,
                lastName: userObject.lastName,
                telephone: userObject.telephone,
                location: userObject.location,
                user: user
            })
    
            if (memberToRegister) {
                const added_successfuly = {
                    'message': 'Account has been created successfully'
                }
                response.status(201);
                return added_successfuly;
            } else{

                const failed = {
                    'message': 'Account creation failed!'
                }

                return failed;
            }

        } catch (error) {
            response.status(500)
            return error
        }
    }

    /** Login Funtion here */
    async login(request: Request, response: Response, next: NextFunction) {
        const dotenv = require('dotenv')
        dotenv.config();

        const loginRequest = request.body
        

        //an object that holds the request body values
        let userToLogin = {
            email: loginRequest.email,
            password: loginRequest.password
        }

        // first check if user exists in the database
        let user = await this.userRepository.findOne({ where: {
            email: userToLogin.email
        }})
        // if the user exists
        if(user) {
            // attempt login with password
            const hashPassword = pbkdf2Sync(userToLogin.password, user.salt, 1000, 64, 'sha512').toString('hex');

            if(user.password == hashPassword) {
                // successful login
                // get the corresponding member records for the particular user. if any
                const member = await this.memberRepository.findOne({
                    where:{
                        user:{id: user.id}
                    }
                });

                // console.log(member);
                let pvv = false;
                if(member != null || member != undefined) {
                    pvv = member.isVip
                }
                
                // Should generate a jwt token
                let token = this.generateToken({user: user.email,pm: user.isStaff, pvv:pvv})

                // console.log(token)
 
                const success_login = {
                    "message": "Login successful",
                    "email": user.email,
                    'token': token
                }

                response.status(200)
                return success_login;

            } else {
                response.status(404);
                const error_login = {
                    "error": "The password provided is incorrect"
                }

                return error_login;
            }

        } else {
            const message = {
                "error": "The given member does not exist"
            }
            response.status(404);
            return message;
        }

    }

    /** Removing a user from our database */
    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne({where: {id: parseInt(request.params.id)}});
        const removed = await this.userRepository.remove(userToRemove);

        if(removed) {

            const message = {

                "message": "User removed successfully"
            }

            return message;

        } else {

            const message = {

                "message": "there was an error removing the selected user"
            }

            return message;
        }
    }

    async removeMember(request: Request, res: Response, next: NextFunction) {
        let memberToRemove = await this.memberRepository.findOne({where: {id: parseInt(request.params.id)}});
        const removed = await this.memberRepository.remove(memberToRemove);
        if(removed) {

            const message = {

                "message": "Member removed sucessfully"
            }

            return message;

        } else {

            const message = {

                "message": "There was an error removing the selected member"
            }

            return message;
        }
    }

    /** Creating a secret code to use as jwt secret code. This
     * is not a public route and thus not enabled in the controller 
     * routes
     */
    async generate(request: Request, response: Response) {
        return randomBytes(64).toString('hex');
    }

    generateToken(userData: string | object | Buffer) {
        // console.log(userData);
        return jwt.sign(userData, process.env.APP_SECRET, {expiresIn: '60 days'})
    }

}