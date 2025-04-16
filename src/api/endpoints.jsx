// This file contains the endpoints for the API.
/*
How to use:
-Url parameter
use .replace("{id}", tasksId) to replace the {id} with the tasksId
*/
const Auth = `/Auth`;
const Children = `/Children`
const Parents = `/Parents`
const Transactions = `/Transactions`
const Users = `/Users`

const AuthEndpoints = {
login: `${Auth}/login`,
register: `${Auth}/register`
}

const ChildrenEndpoints = {
    tasks: `${Children}/tasks`,
    tasksComplete: `${Children}/tasks/{id}/complete`,
    loyaltyTransactions: `${Children}/loyalty-transactions`,
    getSavingsGoals: `${Children}/savings-goals`,
    createSavingsGoal: `${Children}/savings-goals`,
    savingsGoalsDeposit: `${Children}/savings-goals/{id}/deposit`,
    savingsGoalsBreak: `${Children}/savings-goals/{id}/break`,
}

const ParentsEndpoints = {
    tasks: `${Parents}/tasks`,
    tasksComplete: `${Parents}/tasks/{id}/complete`,
    createChild: `${Parents}/create-child`,
    depositToChild: `${Parents}/deposit-to-child/{id}`,
    createTask: `${Parents}/create-task`,
    tasksVerify: `${Parents}/tasks/{id}/verify`,
    savingsGoals: `${Parents}/savings-goals/{id}`,
}

const TransactionsEndpoints = {
    Transactions: `${Transactions}/Transactions`,
}

const UsersEndpoints = {
balance: `${Users}/balance`,
profile: `${Users}/profile`,
}
export { AuthEndpoints, ChildrenEndpoints, ParentsEndpoints, TransactionsEndpoints, UsersEndpoints };
