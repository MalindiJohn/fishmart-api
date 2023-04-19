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

export class ExpensesController {

    // Initialize the repositories to use.
    private expenseRepository = AppDataSource.getRepository(Expense);


    /** Get all expenses */
    async allExpenses(request: Request, response: Response, next: NextFunction) {

        try {

            //pass the user who owns the expenses

            const expenses = await this.expenseRepository.find();
            return expenses;    
            
        } catch (error) {

            response.status(500)

            let errorMessage = {

                "message": "Whoops! something went wrong try again later",
                "error": error
            }

            return errorMessage
            
        }
    }

    /** Adding Expenses to the database */
    async addExpense(request, response: Response, next: NextFunction) {

        try {

            //pass the user saving the expense

            // Adding sales to the database
            let added = await this.expenseRepository.save(request.body)
            
            // display a success message on a successful addition of a sale
            if(added != null) {
                const success_message = {
                    "message": "The Expense has been posted successfully, whoah!!"
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
   
    /** Incase of any errors or typos in the expense.
     * this method makes it possible to edit the expense
     */
    async editExpense(request: Request, response: Response) {

        try {

            const expenseId = request.params.id;
            const expenseToEdit = await this.expenseRepository.findOne({where: {id: parseInt(expenseId)}});
    
            // if a match matching the id is found
            if(expenseToEdit) {
                const tryToUpdate = await this.expenseRepository.update(expenseId, request.body)
                
                if(tryToUpdate.affected > 0) {
                    response.status(200)
                    const update_message = {
                        "message": "Expense updated successfully. done!!"
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

    //remove or delete a Expense
    async removeExpense(request: Request, response: Response, next: NextFunction) {

        try {

            let expenseToRemove = await this.expenseRepository.findOne({where: {id: parseInt(request.params.id)}});
            const removed = await this.expenseRepository.remove(expenseToRemove);
            if(removed) {

                const message = {

                    "message": "Expense removed successfully"
                }

                return message;

            } else {

                const message = {

                    "message": "There was an error removing the selected expense"
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
