const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    // Azure Communication Services への接続文字列
    const emailClient = new EmailClient(process.env["ACS_CONNECTION_STRING"]);
    const toAddress = req.body.email;

    const emailContent = {
        subject: "Your Subject",
        plainText: "Hello, this is your message content.",
        html: "<strong>Hello, this is your message content.</strong>",
    };

    const emailMessage = {
        senderAddress: "<your-verified-email@example.com>",
        content: emailContent,
        recipients: { to: [{ address: toAddress }] },
    };

    try {
        const response = await emailClient.send(emailMessage);
        context.res = { status: 200, body: "Email sent successfully." };
    } catch (error) {
        context.res = { status: 500, body: `Error sending email: ${error.message}` };
    }
};
