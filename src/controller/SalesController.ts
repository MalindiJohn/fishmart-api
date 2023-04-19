import { DataSource, getRepository, TreeParent } from "typeorm";
import { Request, Response, NextFunction } from "express";
import * as authValidator from "../middleware/auth";
import { User } from "../entity/User";
import { fail } from "assert";
import { REPLServer } from "repl";
import { runInThisContext } from "vm";
import { AppDataSource } from "../data-source";
import { Sale } from "../entity/Sale";

export class SalesController {

    // Initialize the repositories to use.
    private salesRepository = AppDataSource.getRepository(Sale);

    private userRepository = AppDataSource.getRepository(User);


    /** Get all sales */
    async allSales(request, response: Response, next: NextFunction) {

        try {

            //pass the user saving the sale
            await authValidator.checkValidateToken(request, response, next);
    
            const userEmail = request.user.user

            const user  = await this.userRepository.findOne({where: {email: userEmail}});

            if(user){

                //pass the user who owns the sales
    
                const sales = await this.salesRepository.find({where: {user: {id: user.id}}});

                response.status(200)

                return sales;  


            } else{
                
                response.status(200)

                let errorMessage = {
    
                    "message": "Whoops! Not authorized to get the sales",
                }
    
                return errorMessage


            } 
            
        } catch (error) {

            response.status(500)

            let errorMessage = {

                "message": "Whoops! something went wrong try again later",
                "error": error
            }

            return errorMessage
            
        }
    }

    /** Adding sales to the database */
    async addSales(request, response: Response, next: NextFunction) {

        try {

            //pass the user saving the sale
            await authValidator.checkValidateToken(request, response, next);
    
            const userEmail = request.user.user

            const user  = await this.userRepository.findOne({where: {email: userEmail}});

            // return user;

            if(user){

                let saleToAdd = request.body;

                let saleObject = {
                    productName: saleToAdd.productName,
                    price: saleToAdd.price,
                    quantity: saleToAdd.quantity,
                    totalPrice: saleToAdd.totalPrice,
                    description: saleToAdd.description,
                    user: user
                }

                // Adding sales to the database
                let added = await this.salesRepository.save(saleObject)
                
                // display a success message on a successful addition of a sale
                if(added != null) {
                    const success_message = {
                        "message": "The sale has been posted successfully, whoah!!"
                    }
        
                    response.status(200) // created
    
                    return success_message;
                }


            } else{

                const success_message = {
                    "message": "You are not authorized to add a sale"
                }
    
                response.status(200) // created

                return success_message;


            }
            
        } catch (error) {

            response.status(500)

            let errorMessage = {

                "message": "Whoops! something went wrong try again later",
                "error": error
            }

            return errorMessage
            
        }
        
    }
   
    /** Incase of any errors or typos in the sale.
     * this method makes it possible to edit the sale
     */
    async editSale(request, response: Response, next: NextFunction) {

        try {
            
            //pass the user saving the sale
            await authValidator.checkValidateToken(request, response, next);
    
            const userEmail = request.user.user

            const user  = await this.userRepository.findOne({where: {email: userEmail}});

            // return user;

            if(user){

                const saleId = request.params.id;
                const saleToEdit = await this.salesRepository.findOne({where: {id: parseInt(saleId), user: {id: user.id}}});
        
                // if a match matching the id is found
                if(saleToEdit) {
                    const tryToUpdate = await this.salesRepository.update(saleId, request.body)
                    
                    if(tryToUpdate.affected > 0) {
                        response.status(200)
                        const update_message = {
                            "message": "Sale updated successfully. done!!"
                        }
                        return update_message;
                    } else{
        
                        response.status(500)
                        const update_message = {
                            
                            "message": "Something went wrong"+tryToUpdate.raw
                        }
                    }
                } else {

                    response.status(200)

                    const update_message = {
                        "message": "Whoops! The sale you are trying to edit doesn't exist."
                    }

                    return update_message;

                }

            } else{

                const success_message = {
                    "message": "You are not authorized to edit a sale"
                }
    
                response.status(200) // created

                return success_message;

            }
            
        } catch (error) {

            response.status(500);

            let errorMessage = {

                "message": "Whoops! something went wrong try again later",
                "error": error
            }

            return errorMessage;
            
        }
    }

    //remove or delete a sale
    async removeSale(request, response: Response, next: NextFunction) {

        try {

            //pass the user saving the sale
            await authValidator.checkValidateToken(request, response, next);
    
            const userEmail = request.user.user

            const user  = await this.userRepository.findOne({where: {email: userEmail}});

            // return user;

            if(user){

                let saleToRemove = await this.salesRepository.findOne({where: {id: parseInt(request.params.id), user: {id: user.id}}});

                //check if the sale to remove exists
                if(saleToRemove){

                    const removed = await this.salesRepository.remove(saleToRemove);
                    if(removed) {
        
                        const message = {
        
                            "message": "Sale removed successfully"
                        }
        
                        return message;
        
                    } else {
        
                        const message = {
        
                            "message": "There was an error removing the selected sale"
                        }
        
                        return message;
                    }


                } else {

                    const success_message = {
                        
                        "message": "Whoops! The sale you are trying to remove does not exist."
                    }
    
                    response.status(200) // created
    
                    return success_message;


                }


            } else {
                
                const success_message = {
                    "message": "You are not authorized to remove this sale"
                }

                response.status(200) // created

                return success_message;


            }
            
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
