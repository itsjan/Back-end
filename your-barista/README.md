# YOUR-BARISTA

## Project Background and Inspiration

This is a Backend-server API project for a Coffee Shop wishing to provide a subscription service for all hot drinks (coffee, tea, hot chocolate) for a fixed monthly fee.

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

----

### **Register a new Membership**

----

Returns details of a new monthly membership, including a link to download a QR code

* **URL**

  /memberships

* **Method:**
  

  `POST`

* **URL Params**

  None

* **Data Params**

   **Required:**
 
   `member_name=(String)` Member's initials, or nickname. *Do not* include real or full name.


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**  

```json
{
  "data": {
    "redemptions": [],
    "_id": "5fd8bf08a1df8118b5e6d666",
    "member_name": "GABY",
    "valid_until": "2021-01-14T13:50:00.995Z",
    "qr_code_value": "e177ad5d-978f-40e3-b99f-87bac5b1449b",
    "__v": 0,
    "is_valid": true,
    "number_of_redemptions_today": 0,
    "minutes_since_last_redemption": null,
    "can_redeem": true,
    "qr_code_url": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=e177ad5d-978f-40e3-b99f-87bac5b1449b",
    "id": "5fd8bf08a1df8118b5e6d666"
  }
}
```
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
```json
{
  "errors": {
    "message": "Membership validation failed: member_name: Path `member_name` is required."
  }
}
```

* **Sample Call:**

```bash
curl --request POST \
  --url http://localhost:3005/memberships \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"member_name" : "GABY"}'
```

* **Notes:**

The backend server will only handle the registration of the subscription (memberhip). Client application will implement the delivery of the QR code to the customer (member) using an SMS / eMail / mobile wallet etc. Therefore, the backend **does/must not** contain any PII (Personal Identifiable Information) according to the EU GDPR data processing requirements.

----

### **Create a Drink Order**

----

Registers a drink order. Returns an order id. The order can be redeemed by a subscription member by showing the QR code to a scanner at the till point.

* **URL**

  /orders

* **Method:**
  
   `POST`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
 
   `drink=(String)`

   **Optional:**
 
   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
```json
{
  "data": {
    "_id": "5fd8bf2ba1df8118b5e6d667",
    "drink": "CAFE MOCCA",
    "createdTime": "2020-12-15T13:50:35.236Z",
    "__v": 0,
    "is_redeemed": false,
    "id": "5fd8bf2ba1df8118b5e6d667"
  }
}
```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
```json 
{
  "errors": {
    "message": "Order validation failed: drink: Path `drink` is required."
  }
}
```


* **Sample Call:**
```bash
curl --request POST \
  --url http://localhost:3005/orders \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"drink" : "CAFE MOCCA"}'
```


* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>