# Cloud Functions for Firebase Authentication

## Overview
This repository contains sample code for Cloud Functions for Firebase Authentication.

## Table of Contents
- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Functions](#available-functions)
- [Contributing](#contributing)
- [License](#license)


## Prerequisites
Before you begin, make sure you have the following:

- A Firebase project with the Cloud Functions, Firestore and Authentication for Firebase extension enabled.
- Node.js `v22.17.0` and npm installed on your local machine.
- The Firebase CLI installed on your local machine.

## Getting Started
To get started, follow these steps:

1. Clone or download this repository to your local machine.
2. Open a terminal or command prompt and navigate to the root directory of the repository.
3. Run `cd functions` to navigate to the `functions` directory.
4. Run `npm install` to install the required dependencies.
5. Run `firebase login` to log in to your Firebase account.
6. Run `firebase use --add` to add the Firebase project to your local Firebase configuration.
7. Run `firebase emulators:start --inspect-functions` to start the Firebase emulators and enable the Cloud Functions inspect API.
8. Run launch to go to debug in VS Code.

You can now test your Cloud Functions by calling them using the attached Postman file.

## Available Functions
The following Cloud Functions are available in this repository:
- `register`: Registers a new user with the Firebase Authentication service.
- `verifyAuthCode`: Verifies an authentication code sent to a user's email address.
- `logins`: Logs in a user with the Firebase Authentication service.
- `changePassword`: Changes a user's password.
- `deleteAccount`: Deletes a user's account.

## Contributing
Contributions are welcome! If you have any suggestions or improvements, please create a pull request or issue.


## License
This repository is licensed under the Apache 2.0 license.



