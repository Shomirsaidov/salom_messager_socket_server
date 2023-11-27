const crypto = require('crypto')
const fs = require('fs')

const chipherData = fs.readFileSync(`${__dirname}/key.json`)
const {key , algorithm} = JSON.parse(chipherData)

exports.encrypt = function encrypt(string) {
    const iv = crypto.randomBytes(8).toString('hex')
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(string ,'utf-8','hex')
    encrypted += cipher.final('hex')

    return `${encrypted}:${iv}`
}

exports.decrypt = function decrypt(string) {
    const [encryptedString, iv] = string.split(':')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    let decrypted = decipher.update(encryptedString, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
} 

console.log(key ,algorithm)
// console.log(decrypt(encrypt(text1)))
