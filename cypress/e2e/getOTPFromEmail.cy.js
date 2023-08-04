

describe('Email OTP',{baseUrl:'https://playground.mailslurp.com'}, ()=>{
    it('register account', ()=> {
        let username = 'hoa.pham' + Math.floor(Math.random()*10000).toString();
        cy.visit('/');
        // cy.get('[data-test="username-input"]');
        // cy.get('[data-test="sign-in-password-input"]');
        cy.get('[data-test="sign-in-create-account-link"]').click();
        cy.get('[name=email]').type(`${username}` + '@mailsac.com');
        cy.get('[name=password]').type('12345678');
        cy.get('[data-test="sign-up-create-account-button"]').click();
        cy.contains('Confirm Sign Up');
    })

    it('get otp', {baseUrl: 'https://mailsac.com'}, ()=> {       
            cy.visit('/');
            cy.get('.myinbox').type(`${username}`);
            cy.get('.btn-primary').should('be.visible').click();
            cy.contains('Please confirm your email address')
        });       
    })
