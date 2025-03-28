import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error.message);
        
        throw new Error("error sending verification email", error);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome!!",
            html: `<h1>Welcome!!</h1>`,
            category: "Welcome Email",
        });
        console.log("welcome email sent");
        
    } catch (error) {
        console.log(error.message);
        
        throw new Error("error sending welcome email", error);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset password",
            text: resetURL,
            category: "Password reset"
        })
    } catch (error) {
        console.log('error sending password reset email', error.message);
        throw new Error(error.message);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            to: recipient,
            from: sender,
            subject: "Password Reset Successful",
            text: "Password reset successfully",
            category: "Password reset",
        });

    } catch (error) {
        console.log("error in reset success email");
        res.status(400).json({success:false, message: "server error"})
    }
}