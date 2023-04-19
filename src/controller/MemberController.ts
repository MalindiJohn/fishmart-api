import { Member } from "../entity/Member";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class MembersController {
    private membersRepo = AppDataSource.getRepository(Member);

    /** Getting a list of all registerd members and users */
    async all(request: Request, response: Response, next: NextFunction) {
        return this.membersRepo.find();
    }

    /** Adding the vip status of a user for them to receive premium trading tips */
    async makevip(request: Request, response: Response, next: NextFunction) {
        let email = request.body.email;
        
        // console.log(email);
        const usersRepo = AppDataSource.getRepository(User);
        const user = await usersRepo.findOne({where: {email: email}});
        // console.log(user.id);
        const member = await this.membersRepo.findOne({
            where:{
                user:{id: user.id}
            }
        });
        // console.log(member)
        
        if (!member.isVip) {
            member.isVip = true;
            await this.membersRepo.save(member);
            const status_message = {
                'message': 'User added to vip successfully'
            }
            return status_message;

        } else {
            const status_message = {
                "message": "The selected user is already subscribed"
            }

            return status_message;
        }
    }

    async revokevip(request: Request, response: Response, next: NextFunction) {
        const member = await this.membersRepo.findOne({where: {id: parseInt(request.params.id)}})
        if(member.isVip) {
            member.isVip = false;

            await this.membersRepo.save(member);
            return member
        } else {
            let status_message = {
                "error": "the selected member is not subscribed to a premium service"
            }

            return status_message;
        }
    }

     /** Will be used to show the details of a particular user. For instance in a profile/account view of an account */
    async profile(request: Request, response: Response, next: NextFunction) {

        try {

            const reqBody = request.body;
            const email = reqBody.email;
            const usersRepo = AppDataSource.getRepository(User);
            const user = await usersRepo.findOne({where: {email: email}})
            // console.log(user);
            const member = await this.membersRepo.findOne({
                where: {
                    user: {id: user.id}
                }
            });
            // console.log(member)
            
            return member;  
            
        } catch (error) {

            response.status(500);

            let errorMessage = {

                "message": "Whoops! something went wrong try again later",
                "error": error
            }

            return errorMessage;
            
        }
    }


}