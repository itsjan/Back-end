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

## Installing from Source and Running the Project Locally.

This assumes that MongoDB is installed and running locally as a service. Also, node and npm need to be installed.

1. Clone this repo
2. `npm i` - install dependencies
3. `npm run dev` - Run a development instance.


---

# The Back-End Process

The following section will document the sequence of API calls to the back-end server required in order to:


1. **Register a new membership**. Membership contains information about the expriry date and time, which is calculated as 30 days from the time of activation. Membership also contains the qr_code value used to redeem drinks.

2. Repeats every time the customer places an order, and redeems it with the membership:
   1.  **Register a drink order**. An orders is sent to the back-end server when the customer holding a membership wants to acquire a free drink. 
   2.   **Redeem the drink** Once the customer's QR code is scanned, it is sent to the server together with the order_id to check the the membership is valid. 

---

# The Membership API

---

### **(1) Register a new Membership**

---

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
  --data '{"member_name" : "GABY"}'
```

* **Notes:**

The backend server will only handle the registration of the subscription (memberhip). Client application will implement the delivery of the QR code to the customer (member) using an SMS / eMail / mobile wallet etc. Therefore, the backend **does/must not** contain any PII (Personal Identifiable Information) according to the EU GDPR data processing requirements.

----

# The Orders API


----

### **(2.1) Create a Drink Order**

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
  --data '{"drink" : "CAFE MOCCA"}'
```


* **Notes:**

---

### **(2.2) Redeem a Drink (order)**

----
Register an order redemption. This checks that the membership is valid and the time related limite (max 5 times per day, one drink every 30 minutes).

* **URL**

  /orders/:order_id/redemption/

* **Method:**
  
  `POST`
  
*  **URL Params**

 
   **Required:**
 
   `order_id=(String)`

   **Optional:**
 
   None

* **Data Params**

   **Required:**
 
   `member_qr_code=(String)`

   **Optional:**
 
   None

* **Success Response:**
  


  * **Code:** 200 <br />
    **Content:**

```json
  {
  "message": "Order successfully redeemed",
  "order": {
    "_id": "5fd8bf2ba1df8118b5e6d667",
    "drink": "CAFE MOCCA for Elias",
    "createdTime": "2020-12-15T13:50:35.236Z",
    "__v": 0,
    "redemption": {
      "_id": "5fd8c0a2a3d17e192e382b95",
      "time": "2020-12-15T13:56:50.918Z",
      "order_id": "5fd8bf2ba1df8118b5e6d667",
      "__v": 0
    },
    "redeemed_by_member_name": "ELIAS",
    "redeemed_by_membership_id": "5fd8bf08a1df8118b5e6d666",
    "is_redeemed": true,
    "id": "5fd8bf2ba1df8118b5e6d667"
  }
```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
  "message": "QR code is missing"
}`

  OR

  * **Code:** 409 CONFLICT <br />
    **Content:** `{
  "message": "Order is already redeemed and cannot be redeemed more times!"
}`

  OR

  * **Code:** 403 FORBITTEN <br />
    **Content:** 
```json 
{
  "message": "Member is not allowed to redeem a drink at this time. Only 1 drink is allowed every 30 minutes, and up to 5 times per day. Please try again later.",
  "membership": {
    "redemptions": [
      {
        "_id": "5fd8c0a2a3d17e192e382b95",
        "time": "2020-12-15T13:56:50.918Z",
        "order_id": "5fd8bf2ba1df8118b5e6d667",
        "__v": 0
      }
    ],
    "_id": "5fd8bf08a1df8118b5e6d666",
    "member_name": "ELIAS",
    "valid_until": "2021-01-14T13:50:00.995Z",
    "qr_code_value": "e177ad5d-978f-40e3-b99f-87bac5b1449b",
    "__v": 1,
    "is_valid": true,
    "number_of_redemptions_today": 1,
    "minutes_since_last_redemption": 2,
    "can_redeem": false,
    "qr_code_url": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=e177ad5d-978f-40e3-b99f-87bac5b1449b",
    "id": "5fd8bf08a1df8118b5e6d666"
  }
}
```

* **Sample Call:**

```bash
curl --request POST \
  --url http://localhost:3005/orders/5fd8c426d38a751a445f4865/redemption/ \
  --header 'content-type: application/json' \
  --data '{"membership_qr_code" : "e177ad5d-978f-40e3-b99f-87bac5b1449b"}'
```

* **Notes:**

---
# Additional API endpoints
---

|  URL | Method   | URL parameters
|---|---| --- |
|  /memberships/:id | GET   | ID = (String) |
|  /orders/:id | GET   | ID = (String) |

