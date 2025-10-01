//1) lav et Promise
const p = new Promise((resolve, reject) => {
  const numberOfCustomers = 10;
  if (numberOfCustomers > 5) {
    resolve("Success.");
  } else {
    reject("Not enough promotion.");
  }
});

//2) consume et Promise med .then() og .catch()
/*
p.then((value) => {
  console.log(value);
}).catch((reason) => {
  console.log(reason);
}); */

//3) consume et Promise med async/await og try/catch
async function checkResults() {
  try {
    const value = await p;
    console.log(value);
  } catch (reason) {
    console.log(reason);
  }
}

checkResults();

// 4) hvor og hvorfor Promises bruges i webudvikling

// 5) fetch API
/*
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (!response.ok) {
      return Promise.reject("4xx or 5xx problem.");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[1].email);
  })
  .catch((error) => console.log(error));
*/
