# Shortly!

A simple url shortener built with MEVN stack.

> Live at [https://shortly-site.onrender.com/](https://shortly-site.onrender.com/)

## Tech Stack

- **Database:** MongoDB
- **Backend:** Node.js, Express.js
- **Frontend:** Vue.js
- **Client Deployment:** Render
- **Server Deployment:** Fly

## API Usage

> The API is deployed at [https://shortly.fly.dev/](https://shortly.fly.dev/)

```bash
# Shorten the url
POST https://shortly.fly.dev/api/v1/url/shorten
{ "longUrl": "https://www.google.com/" }
```

## TODOs

- [x] make separate directories for **client** and **server** and refactor code
- [x] add toaster message for copy to clipboard
- [x] add QR code functionality for the shortened url
- [ ] make it responsive for smaller devices
- [x] add a **copy to clipboard** button for the shortened url
- [x] add analytics
- [x] add adsense
- [x] add dark mode and fix the UI
- [x] add error handling
- [x] deploy the client and server to their respective hosts
