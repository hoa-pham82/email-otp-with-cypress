# email-otp-with-cypress

Create Cypress script for email OTP scenario

The scenario: User Signup that requires an OTP code from the registered email

Given the user is on the signup page

When the user fills out the signup form with valid information and submits the form

Then the user should navigate to the OTP screen and an OTP will be sent to their email address

When the user puts in the OTP to the screen

Then they can register the account successfully

