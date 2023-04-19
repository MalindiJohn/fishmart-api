import { ExpensesController } from "./controller/ExpensesController"
import { FishinfosController } from "./controller/FishinfosController"
import { MembersController } from "./controller/MemberController"
import { SalesController } from "./controller/SalesController"
import { UserController } from "./controller/UserController"

export const Routes = [
    
//users routes
    {
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/api/users/:email",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/api/auth/register",
    controller: UserController,
    action: "register"
}, {
    method: "delete",
    route: "/api/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: 'post',
    route: '/api/auth/login',
    controller: UserController,
    action: 'login'
}, {
    method: 'delete',
    route: '/api/users/remove/:id',
    controller: UserController,
    action: 'removeMember'
},
// Members Routes
{
    method: 'get',
    route: '/api/members',
    controller: MembersController,
    action: 'all'
},
{
    method: 'post',
    route: '/api/members/makevip/',
    controller: MembersController,
    action: 'makevip'
},
{
    method: 'post',
    route: '/api/members/revokevip/:id',
    controller: MembersController,
    action: 'revokevip'
},
{
    method: 'post',
    route: '/api/members/profile/',
    controller: MembersController,
    action: 'profile'
},

// Sales Routes
{
    method: 'get',
    route: '/api/sales/all',
    controller: SalesController,
    action: 'allSales'
},
{
    method: 'get',
    route: '/api/sales/:id',
    controller: SalesController,
    action: 'getSale'
},
{
    method: 'post',
    route: '/api/sales/create',
    controller: SalesController,
    action: 'addSales'
},
{
    method: 'patch',
    route: '/api/sales/edit/:id',
    controller: SalesController,
    action: 'editSale'
},
{
    method: 'delete',
    route: '/api/sales/remove/:id',
    controller: SalesController,
    action: 'removeSale'
},

// Expenses Routes
{
    method: 'get',
    route: '/api/expenses/all',
    controller: ExpensesController,
    action: 'allExpenses'
},
{
    method: 'get',
    route: '/api/expenses/:id',
    controller: ExpensesController,
    action: 'getExpense'
},
{
    method: 'post',
    route: '/api/expenses/create',
    controller: ExpensesController,
    action: 'addExpense'
},
{
    method: 'patch',
    route: '/api/expenses/edit/:id',
    controller: ExpensesController,
    action: 'editExpense'
},
{
    method: 'delete',
    route: '/api/expenses/remove/:id',
    controller: ExpensesController,
    action: 'removeExpense'
},

// fish info Routes
{
    method: 'get',
    route: '/api/fishinfo/all',
    controller: FishinfosController,
    action: 'allFishInfo'
},
// {
//     method: 'get',
//     route: '/api/fishinfo/:id',
//     controller: FishinfosController,
//     action: 'getFishInfo'
// },
// {
//     method: 'post',
//     route: '/api/fishinfo/create',
//     controller: FishinfosController,
//     action: 'addFishInfo'
// },
// {
//     method: 'patch',
//     route: '/api/fishinfo/edit/:id',
//     controller: FishinfosController,
//     action: 'editFishInfo'
// },
// {
//     method: 'delete',
//     route: '/api/fishinfo/remove/:id',
//     controller: FishinfosController,
//     action: 'removeFishInfo'
// }
]