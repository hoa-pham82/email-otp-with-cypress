// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Create the command to get OTP from mailsac.com
import { getCode } from './utils.js'

let messageId
let baseUrl = 'https://mailsac.com/api'

// Create command to get OTP
Cypress.Commands.add('getOTP', (email, key) => {
    cy.request({
        method: 'GET',
        url: baseUrl + `/addresses/${email}/messages`,
        headers: {
            'Mailsac-Key': key
        }
    }).as('getMessageId')

    cy.get('@getMessageId')
        .then((res) => {
            expect(res.status).to.eq(200)
            messageId = res.body[0]._id
            cy.log('Retrieved messageId:', messageId)
        })
        .then(() => {
            cy.request({
                method: 'GET',
                url: baseUrl + `/text/${email}/${messageId}`,
                headers: {
                    'Mailsac-Key': key
                }
            })
        })
        .then((res) => {
            expect(res.status).to.equal(200)
            Cypress.env('OTP', getCode(res.body))
            cy.log('Set the OTP value is:', Cypress.env('OTP'))
        })
})
