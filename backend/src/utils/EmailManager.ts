import { GlobalSettings } from "./GlobalSettings";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

sgMail.setApiKey(GlobalSettings.sendGrid.key);

export class EmailManager {
    private static replaceInEmail(template: string, variable: string, value: string) {
        return `${template}`.replace(new RegExp(`<%%${variable}%%>`, "g"), value);
    }
    private static replaceDefaultsInTemplate(emailTemplate: string) {
        emailTemplate = EmailManager.replaceInEmail(emailTemplate, "HOME_LINK", GlobalSettings.app.routes.homePage);
        emailTemplate = EmailManager.replaceInEmail(emailTemplate, "FRONTEND_ORIGIN", GlobalSettings.app.frontendOrigin);
        emailTemplate = EmailManager.replaceInEmail(emailTemplate, "LOGO_URL", GlobalSettings.app.logo.withText);
        emailTemplate = EmailManager.replaceInEmail(emailTemplate, "CONTACT_US_LINK", GlobalSettings.app.routes.contactUsPage);
        emailTemplate = EmailManager.replaceInEmail(
            emailTemplate,
            "MYGYM_ADDRESS",
            "Australia - 1234 Main Street - New South Wales, NSW - 56789"
        );
        return emailTemplate;
    }
    static async sendEmail(to: string, subject: string, text: string, html: string, from = "") {
        const mail = {
            to,
            from: from || `"MyGYM" <mygym@celsoppe.com>`, // Use the email address or domain you verified above
            subject,
            text,
            html,
        };

        let transporter = nodemailer.createTransport({
            host: "de13.fcomet.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ausplan@celsoppe.com",
                pass: "ausplan2021",
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });

        // return sgMail.send(mail);
        console.log("SENDING EMAIL TO ", to, ", FROM ", from);
        return await transporter.sendMail(mail);
    }

    static getEmailTemplate(templateName: string) {
        let template = require(`./emailTemplates/${templateName}`);
        return EmailManager.replaceDefaultsInTemplate(template);
    }

    static async sendWelcomeEmail(toEmail: string, name: string, loginCreds: string) {
        let welcomeTemplate = this.getEmailTemplate("welcomeTemplate");
        welcomeTemplate = EmailManager.replaceInEmail(welcomeTemplate, "LOGIN_CREDS", loginCreds);
        welcomeTemplate = EmailManager.replaceInEmail(welcomeTemplate, "NAMES", name);

        return await this.sendEmail(
            toEmail,
            "Welcome to Ausplan",
            "We're excited to have you",
            welcomeTemplate,
            `"Ausplan-Welcome" <ausplan@celsoppe.com>`
        );
    }

    static async sendUserNotificationEmail(userNames: string, toEmail: string, orgName: string, subject: string, message: string) {
        let userNotfTemplate = this.getEmailTemplate("simpleNotificationTemplate");
        userNotfTemplate = EmailManager.replaceInEmail(userNotfTemplate, "USER_NAMES", userNames);
        userNotfTemplate = EmailManager.replaceInEmail(userNotfTemplate, "SUBJECT", subject);
        userNotfTemplate = EmailManager.replaceInEmail(userNotfTemplate, "MESSAGE", message);
        userNotfTemplate = EmailManager.replaceInEmail(userNotfTemplate, "ORG_NAME", orgName);

        return await this.sendEmail(
            toEmail,
            `[${orgName}] ${subject}`,
            `You've received a new notification from MyGYM.`,
            userNotfTemplate,
            `"MyGYM" <mygym@celsoppe.com>`
        );
    }
}
