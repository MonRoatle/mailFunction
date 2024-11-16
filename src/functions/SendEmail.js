const { EmailClient } = require("@azure/communication-email");

const connectionString = "endpoint=https://fujitapjmailservice.japan.communication.azure.com/;accesskey=3Z14wruZDzzYJTD1VFEqL2vQnE8rJ0kijgb0c9h1IE6Mbscf1H5SJQQJ99AKACULyCpBPHK3AAAAAZCSiZAS";
const client = new EmailClient(connectionString);

module.exports = async function (context, req) {
    const { emailAddress } = req.body;

    if (!emailAddress) {
        context.res = {
            status: 400,
            body: "Email address is required",
        };
        return;
    }

    const emailMessage = {
        senderAddress: "DoNotReply@4693a3f1-4f27-46f4-a5a0-21f8b80abbcd.azurecomm.net",
        content: {
            subject: "テスト メール",
            plainText: "メールで Hello World。",
            html: `
            <html>
                <body>
                    <h1>メールで Hello World。</h1>
                </body>
            </html>`,
        },
        recipients: {
            to: [{ address: emailAddress }],
        },
    };

    try {
        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();
        context.res = {
            status: 200,
            body: "Email sent successfully",
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Failed to send email: ${error.message}`,
        };
    }
};
