import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "mail.crownphoenixadv.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.CONTACT_MAIL_USER,
        pass: process.env.CONTACT_MAIL_PASSWORD,
    },
})

export async function sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
        from: "CPMC <contact@crownphoenixadv.com>",
        to: "contact@crownphoenixadv.com",
        subject,
        html,
    }

    await transporter.sendMail(mailOptions)
}
