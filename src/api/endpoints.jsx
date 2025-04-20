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
const Rewards = `/Rewards`

const AuthEndpoints = {
    login: `${Auth}/login`,
    register: `${Auth}/register`
}

const ChildrenEndpoints = {
    tasks: `${Children}/tasks`,
    getSavingsGoals: `${Children}/savings-goals`,
    createSavingsGoal: `${Children}/savings-goals`,
    loyaltyTransactions: `${Children}/loyalty-transactions`,
    savingsGoalsDeposit: `${Children}/savings-goals/{id}/deposit`,
    // break endpoint means ???
    savingsGoalsBreak: `${Children}/savings-goals/{id}/break`,
    tasksComplete: `${Children}/tasks/{id}/complete`,
}

const ParentsEndpoints = {
    tasks: `${Parents}/tasks`,
    getChildTasks: `${Parents}/tasks/{id}`,
    createChild: `${Parents}/create-child`,
    depositToChild: `${Parents}/deposit-to-child/{id}`,
    createTaskForChild: `${Parents}/create-task`,
    tasksVerify: `${Parents}/tasks/{id}/verify`,
    getChildSavingsGoals: `${Parents}/savings-goals/{id}`,
}

const TransactionsEndpoints = {
    Transactions: `${Transactions}`,
}

const UsersEndpoints = {
    balance: `${Users}/balance`,
    profile: `${Users}/profile`,
}

const RewardsEndpoints = {
    rewards: `${Rewards}/reward`,
    create: `${Rewards}/create`,
}

export { AuthEndpoints, ChildrenEndpoints, 
    ParentsEndpoints, TransactionsEndpoints, 
    UsersEndpoints, RewardsEndpoints  }; 

