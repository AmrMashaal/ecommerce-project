import axios from "axios";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Mashaal Market", email: "amrhossammashal@gmail.com" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          Accept: "application/json",
        },
          timeout: 5000, 
        }
    );

    console.log("✅ Email sent:", response.data);  
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message
    );
    throw error;
  }
};
