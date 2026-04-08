const sendPushNotification = async (pushToken, title, body) => {
  if (!pushToken) return;

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        sound: "default",
        title,
        body,
      }),
    });
  } catch (error) {
    console.log("Push notification error:", error.message);
  }
};

module.exports = sendPushNotification;
