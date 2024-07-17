import React, { useState } from "react";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [username, setUsername] = useState("");

  const handleEmailNotificationsChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Settings saved:", { emailNotifications, username });
    // Add API call or local storage update here
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Notification Settings</h3>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={emailNotifications}
            onChange={handleEmailNotificationsChange}
          />
          Email Notifications
        </div>
        <div className="form-group">
          <label>Account Preferences</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default SettingsPage;
