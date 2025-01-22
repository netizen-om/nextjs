import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import {connect} from "@/dbConfig/doConfig"

connect()

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "556e186125605e",
            pass: "11818cadaf0927"
            }
        });

        let mailOptions : any
        if (emailType === "VERIFY") {
                mailOptions = {
                    from: 'om@gmail.com',
                    to: email,
                    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`
                }
        } else if (emailType === "RESET"){
            const user = await User.findById(userId)
            const OTP = user.forgotPasswordToken
            mailOptions = {
                from: 'verify@gmail.com',
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p> Your OTP to reset password is : ${OTP} </p>`
            }
        }
        

        const mailResponse = await transport.sendMail(mailOptions);
        
        return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}