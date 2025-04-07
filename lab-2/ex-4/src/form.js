const guests = [
  "Marcin Stachowicz",
  "Jan Kowlski",
  "Agnieszka Przyblska",
  "Tomasz Pączek",
  "Wiktoria Adamczyk",
  "Ignacy Ogiński",
  "Hieronim Będzimyśl",
  "Mariusz Wojtaszek",
];

const rooms = new Map([
  //room number, room capacity
  [1, 2],
  [2, 3],
  [3, 2],
  [4, 1],
  [5, 2],
  [6, 4],
  [7, 4],
  [8, 2],
  [9, 5],
]);
const dbName = "hotel";
let db;
const request = indexedDB.open(dbName);
request.onerror = (event) => {
  console.error(`Error in connecting to db`);
};
request.onsuccess = (event) => {
  db = event.target.result;
};
request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("reservations", { keyPath: "roomNumber" });
};

const form = window.document.forms[0];
const input = form.elements["inp"];
const output = form.elements["out"];
const addToDatabase = (roomNumber, occupiedSpace, nameSurname) => {
  return new Promise((resolve) => {
    const req = db
      .transaction(["reservations"], "readwrite")
      .objectStore("reservations")
      .add({
        roomNumber: roomNumber,
        occupiedSpace: occupiedSpace,
        nameSurname: nameSurname,
      });
    req.onsuccess = (event) => {
      console.log(`Reservation for room ${roomNumber} added`);
      input.setCustomValidity("");
      resolve();
    };
    req.onerror = () => {
      console.log(`Error in adding reservation ${roomNumber}`);
      input.setCustomValidity("Can't add reservation");
      reject();
    };
  });
};
const deleteFromDatabase = (roomNumber) => {
  return new Promise((resolve) => {
    const req = db
      .transaction(["reservations"], "readwrite")
      .objectStore("reservations")
      .delete(roomNumber);
    req.onsuccess = (event) => {
      console.log(`Reservation for room ${roomNumber} deleted`);
      resolve();
    };
    req.onerror = () => {
      console.log(`Error in deleting reservation for room ${roomNumber}`);
      reject();
    };
  });
};
const getFromDatabase = (roomNumber) => {
  return new Promise((resolve) => {
    const req = db
      .transaction(["reservations"])
      .objectStore("reservations")
      .get(roomNumber);
    req.onsuccess = (event) => {
      console.log(
        `Successful retrieval for room ${roomNumber}: ${JSON.stringify(event.target.result)}`
      );
      resolve(event.target.result);
    };
    req.onerror = () => {
      console.log(`Error in getting reservation for room ${roomNumber}`);
      reject();
    };
  });
};
const isInputCorrect = (str) => {
  const arr = str.split(",");
  if (!arr || arr.length != 4) {
    console.error("Input is invalid: bad format");
    input.setCustomValidity("Bad format");
    return false;
  }
  const nameSurname = arr[0] + " " + arr[1];
  const roomNumber = Number(arr[2]);
  const demandedSpace = Number(arr[3]);
  if (!guests.includes(nameSurname)) {
    console.error("Input is invalid: There is no such guest");
    input.setCustomValidity("There is no such guest");
    return false;
  }
  if (isNaN(roomNumber) || isNaN(demandedSpace)) {
    console.error("Input is invalid: room number or space is not a number");
    input.setCustomValidity("Input is invalid");
    return false;
  }
  if (!rooms.get(roomNumber)) {
    console.error("Input is invalid: There is no room with this number");
    input.setCustomValidity("There is no room with this number");
    return false;
  }
  if (rooms.get(roomNumber) < demandedSpace) {
    console.error("Input is invalid: Number of guests exceeds capacity of room");
    input.setCustomValidity("Number of guests exceeds capacity of room");
    return false;
  }
  console.log("Input is valid");
  input.setCustomValidity("");
  return true;
};
const retrieveInput = (str) => {
  if (isInputCorrect(str)) return str.split(",");
  return null;
};
const doesReservationExist = async (roomNum) => {
  const result = await getFromDatabase(roomNum);
  return result != null;
};
async function addReservation() {
  console.groupCollapsed("Add reservation request");
  const inputVal = retrieveInput(input.value);
  if (inputVal && await doesReservationExist(inputVal[2])) {
    console.warn("Reservation for this room already exists")
  }else if(inputVal){
    await addToDatabase(inputVal[2], inputVal[3], inputVal[0] + " " + inputVal[1]);
  }
  console.groupEnd("Request ended");
}
async function deleteReservation() {
  console.groupCollapsed("Delete reservation request");
  const inputVal = retrieveInput(input.value);
  if (inputVal && !(await doesReservationExist(inputVal[2]))) {
    console.warn("Reservation doesn't exists")
  }else if(inputVal){
    await deleteFromDatabase(inputVal[2]); 
  }
  console.groupEnd("Request ended");
}
async function viewReservation() {
  console.groupCollapsed("View reservation request");
  const inputVal = retrieveInput(input.value);
  if (inputVal && !(await doesReservationExist(inputVal[2]))) {
    console.warn("Reservation doesn't exists")
  }else if(inputVal){
    await getFromDatabase(inputVal[2]);
  }
  console.groupEnd("Request ended");
}
