# YOUR-BARISTA


## Project Background and Inspiration

This is a Backend-server API project for a Coffee Shop wishing to offer a subscription service offering all hot drinks (coffee, tea, hot chocolate) for a fixed monthly fee.

This inspiration to this project came from PRET and their [YourPret Barista](https://www.pret.co.uk/en-GB/your-pret) Coffe Subscription Service.

### The Business Process

This is how the service works:

1. *Sign up* and we'll send your unique QR code via email

2. *Download* to your mobile wallet or save your email so it's ready to go

3. *Order* your drink from our lovely teams and scan your QR code at the till. Enjoy!

### Business Rules

You can use up to *5 times a day* (with *one redemption every 30 minutes*).

## Installing from Source and Running the Project

1. Clone this repo
2. `npm i` - install dependencies
3. `npm run dev` - Run a development instance.

## The API

### Register a new Membership

 _Returns details of a new monthly membership, including a link to download a QR code_

* **URL**

  /memberships

* **Method:**
  

  `POST`

*  **URL Params**

None


* **Data Params**

   **Required:**
 
   `member_name=[integer]`


* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

```term
curl --request POST \
  --url http://localhost:3005/memberships \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"member_name" : "GABY"}'
```

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 