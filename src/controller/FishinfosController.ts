import { DataSource, getRepository, TreeParent } from "typeorm";
import { Request, Response, NextFunction } from "express";
import * as authValidator from "../middleware/auth";
import { User } from "../entity/User";
import { fail } from "assert";
import { REPLServer } from "repl";
import { runInThisContext } from "vm";
import { AppDataSource } from "../data-source";
import { Sale } from "../entity/Sale";
import { Expense } from "../entity/Expense";
import { Fishinfo } from "../entity/Fishinfo";

export class FishinfosController {

    // Initialize the repositories to use.
    private fishinfoRepository = AppDataSource.getRepository(Fishinfo);


    /** Get all fish info */
    async allFishInfo(request: Request, response: Response, next: NextFunction) {

        try {

            //pass the user who owns the fish info

            const fishInfo = await this.fishinfoRepository.find();
            return fishInfo;    
            
        } catch (error) {

            response.status(500)

            let errorMessage = {

                "message": "Whoops! something went wrong try again later",
                "error": error
            }

            return errorMessage
            
        }
    }

    /** Adding fish info to the database */
    async addFishInfo(request, response: Response, next: NextFunction) {

        try {

            //pass the user saving the expense

            // Adding sales to the database
            let added = await this.fishinfoRepository.save(request.body)
            
            // display a success message on a successful addition of a sale
            if(added != null) {
                const success_message = {
                    "message": "The Fish info has been posted successfully, whoah!!"
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
   
    /** Incase of any errors or typos in the fish info.
     * this method makes it possible to edit the fish info
     */
    async editExpense(request: Request, response: Response) {

        try {

            const fishInfoId = request.params.id;
            const fishInfoToEdit = await this.fishinfoRepository.findOne({where: {id: parseInt(fishInfoId)}});
    
            // if a match matching the id is found
            if(fishInfoToEdit) {
                const tryToUpdate = await this.fishinfoRepository.update(fishInfoId, request.body)
                
                if(tryToUpdate.affected > 0) {
                    response.status(200)
                    const update_message = {
                        "message": "Fish info updated successfully. done!!"
                    }
                    return update_message;
                } else{
    
                    response.status(500)
                    const update_message = {
                        
                        "message": "Something went wrong"+tryToUpdate.raw
                    }
                }
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

    //remove or delete a fish info
    async removeFishInfo(request: Request, response: Response, next: NextFunction) {

        try {

            let fishInfoToRemove = await this.fishinfoRepository.findOne({where: {id: parseInt(request.params.id)}});
            const removed = await this.fishinfoRepository.remove(fishInfoToRemove);
            if(removed) {

                const message = {

                    "message": "Fish info removed successfully"
                }

                return message;

            } else {

                const message = {

                    "message": "There was an error removing the selected fish info"
                }

                return message;
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
