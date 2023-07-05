import { Logger } from "@nestjs/common";

const passwordHash = require('password-hash');

export const verifyMail = (createdAt:string) => {
    const verifyLink = `http://[::1]:3000/auth/verify/${createdAt}`
    const VERIFY_HTML = `
    <h1>
    HESABINI BU LİNKTEN DOĞRULAYABİLİRSİNİZ: <a href="${verifyLink}" target="_blank">${verifyLink}</a>
    </h1>
    `
    return VERIFY_HTML
}