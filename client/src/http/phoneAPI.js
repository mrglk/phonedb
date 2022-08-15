const host = 'http://localhost:3030';
export class API {
    static getPhonesFromDB () {
        return fetch(`${host}/get-phones`)
          .then(response => {
            return response.json();
          })
          .catch((e) => console.log(e))
      }

    static addPhoneToDB(phone) {
        return fetch(`${host}/add-phone`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({phone: phone}),
        })
          .then(response => {
            return response.json();
          })
          .catch((e) => console.log(e))
      }

      static longpoll() {
        return fetch(`${host}/longpoll`)
          .then(response => {
            return response.json();
          })
          .catch((e) => console.log(e))
      }

}