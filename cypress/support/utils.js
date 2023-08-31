import { faker } from '@faker-js/faker'
export function getCode(message) {
    const otpPattern = /\d+/
    const otpMatch = message.match(otpPattern)
    if (otpMatch) {
        console.log('extracted OTP', otpMatch[0])
        return otpMatch[0]
    } else {
        console.log('no OTP in the message')
    }
}

export function generateEmail() {
    return faker.internet.email({ provider: 'mailsac.com' })
}

export function generatePassword() {
    return faker.internet.password({ length: 12, memorable: true })
}
