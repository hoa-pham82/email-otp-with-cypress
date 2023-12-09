# email-otp-with-cypress

Created Cypress script for email OTP scenario

 	Scenario: User Signup that requires an valid OTP code from the registered email
		GIVEN the user is on the signup page
		AND the user filled out the signup form with valid information and submitted the form
		AND the user is in the OTP screen and an OTP is sent to their email address
		WHEN the user puts in the OTP to the signup screen
		THEN the user registers the account successfully

