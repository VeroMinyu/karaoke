const User = require("../models/User");

const notificationServer = io => {
  console.log("Notification Server Started!");

  io.on("connection", function(socket) {
    socket.on("newPerformanceNotification", data => {
      User.findById(data.user)
        .then(user => {
          socket.broadcast.emit("newPerformanceNotification", {
            user: {
              id: user._id,
              username: user.username
            },
            video: data.video
          });
        })
    });
  });
};

module.exports = notificationServer;
