import { sendEmail } from "email/sendMail"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const { name, email, phone, subject, message } = req.body

    const html = `
        <p>Name: ${name}</p>
        <p>Email Address: ${email}</p>
        <p>Phone Number: ${phone}</p>
        
        <p>${message}</p>
    `

    sendEmail(email, subject, html)
    res.status(200).json({ message: "Email sent successfully" })
}
