export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #111;">
  <div style="background: linear-gradient(to right, #8e44ad, #6a1b9a); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Verify Your Email</h1>
  </div>
  <div style="background-color: #222; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
    <p style="margin-bottom: 10px; color: #bbb;">Hello,</p>
    <p style="margin-bottom: 10px; color: #bbb;">Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #9b59b6;">{verificationCode}</span>
    </div>
    <p style="color: #bbb;">Enter this code on the verification page to complete your registration.</p>
    <p style="color: #bbb;">This code will expire in 15 minutes for security reasons.</p>
    <p style="color: #bbb;">If you didn't create an account with us, please ignore this email.</p>
    <p style="margin-top: 20px; color: #aaa;">Best regards,<br><strong style="color: #9b59b6;">Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #666; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
