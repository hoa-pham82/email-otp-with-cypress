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

let messageId;

function getCode(message) {
  const otpPattern = /\d+/;
  const otpMatch = message.match(otpPattern);
  if (otpMatch) {
    console.log('extracted OTP', otpMatch[0]);
    return otpMatch[0];
  } else {
    console.log('no OTP in the message');
  }
}

Cypress.Commands.add('getOTP', (email, key) => {
  cy.request({
    method: 'GET',
    url: 'https://mailsac.com/api/addresses/' + `${email}` + '/messages',
    headers: {
      'Mailsac-Key': key,
    },
  }).as('getMessageId');

  cy.get('@getMessageId')
    .then((res) => {
      expect(res.status).to.eq(200);
      messageId = res.body[0]._id;
      cy.log(messageId);
    })
    .then(() => {
      cy.request({
        method: 'GET',
        url: 'https://mailsac.com/api/text/' + `${email}/` + `${messageId}`,
        headers: {
          'Mailsac-Key': key,
        },
      });
    })
    .then((res) => {
      expect(res.status).to.equal(200);
      Cypress.env('OTP', getCode(res.body));
      cy.log(Cypress.env('OTP'));
    });
});
