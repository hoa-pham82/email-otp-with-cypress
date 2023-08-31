declare namespace Cypress {
    interface Chainable<Subject> {
        getOTP(email: any, key: any): Chainable<any>
    }
}
