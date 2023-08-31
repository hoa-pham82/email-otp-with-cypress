describe('Email OTP', { baseUrl: 'https://playground.mailslurp.com' }, () => {
    let username = 'hoa.pham' + Math.floor(Math.random() * 10000).toString()
    let password = Math.floor(Math.random() * 99 ** 9).toString()

    it('Register account in Mailslurp', () => {
        cy.visit('/')

        cy.get('[data-test="sign-in-create-account-link"]').click()

        cy.get('[name=email]').type(`${username}` + '@mailsac.com')
        cy.get('[name=password]').type(`${password}`)
        cy.log('username', `${username}@mailsac.com`)
        cy.log('password', `${password}`)

        cy.get('[data-test="sign-up-create-account-button"]').click()

        cy.contains('Confirm Sign Up')

        cy.getOTP(`${username}@mailsac.com`, Cypress.env('API_KEY')).then(
            () => {
                cy.get('[name=code]').type(Cypress.env('OTP'))

                cy.get('[data-test="confirm-sign-up-confirm-button"]').click()
            }
        )

        cy.contains('Sign in to your account')

        // need to check whether we can sign in successfully
        cy.get('[data-test="username-input"]').type(`${username}@mailsac.com`)
        cy.get('[data-test="sign-in-password-input"]').type(`${password}`)
        cy.get('[data-test="sign-in-sign-in-button"]').click()
        cy.contains('Welcome')
    })
})
