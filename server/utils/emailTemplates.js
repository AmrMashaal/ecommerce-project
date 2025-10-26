export const signupHTML = (username, verificationLink) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your Mashaal Market account</title>
</head>
<body style="margin:0; padding:0; background:#f7f7f7; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,.1);">
          <tr>
            <td style="background:#4CAF50; padding:20px; text-align:center; color:#fff; font-size:24px; font-weight:bold;">
              Mashaal Market
            </td>
          </tr>
          <tr>
            <td style="padding:30px; text-align:center;">
              <h1 style="margin:0 0 20px; font-size:22px; color:#333;">
                Verify your email address
              </h1>
              <p style="font-size:16px; color:#555; line-height:1.6;">
                Hi <strong>${username}</strong>,<br/>
                Thank you for creating an account with <b>Mashaal Market</b>.
                Please click the button below to verify your email address.
              </p>
              <a href="${verificationLink}"
                 style="display:inline-block; margin-top:25px; padding:12px 24px;
                        background:#4CAF50; color:#fff; text-decoration:none;
                        border-radius:4px; font-size:16px;">
                 Verify Email
              </a>
              <p style="margin-top:25px; font-size:13px; color:#999;">
                If the button doesn't work, copy and paste this link into your browser:<br/>
                <span style="word-break:break-all;">${verificationLink}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f2f2f2; padding:15px; text-align:center; font-size:12px; color:#999;">
              &copy; ${new Date().getFullYear()} Mashaal Market. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
