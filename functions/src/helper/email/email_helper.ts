

import * as fs from 'fs'
import * as nodemailer from "nodemailer"
import { configUseCase } from '../../use_case/auth_use_case/config_use_case'

export async function createSendEmail(emailReceive: string, authCode: string): Promise<boolean> {

    try {
        var content = fs.readFileSync('./src/helper/email/email_send.txt', 'utf-8')
        content = content.replace("::email::", emailReceive)
        content = content.replace("::auth-code::", authCode)
        const config = await configUseCase.run()
        if (config != undefined) {
            const email = config.email
            const pass = config.password
            //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
            var transporter = nodemailer.createTransport({ // config mail server
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: email, //Tài khoản gmail vừa tạo
                    pass: pass //Mật khẩu tài khoản gmail vừa tạo
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: email,
                to: emailReceive,
                subject: "Regiter code",
                html: content //Nội dung html mình đã tạo trên kia :))
            }

            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Message sent: ' + info.response)
                }
            })
            return true
        } else {
            throw Error('unknown')
        }
    } catch (err) {
        console.error(err)
    }
    return false
}
