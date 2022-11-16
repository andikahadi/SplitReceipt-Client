// if (isSet == true) {
//   for (let i = 0; i < receiptChosen.item.length; i++) {
//     for (let j = 0; j < receiptChosen.item[i].person.length; j++) {
//       if (!(receiptChosen.item[i].person[j] in splitAmount)) {
//         setSplitAmount((prevState) => {
//           let newItem = receiptChosen.item[i].person[j];
//           const dict = { ...prevState };
//           dict[newItem] =
//             receiptChosen.item[i].total_item_price /
//             receiptChosen.item[i].person.length;
//           return dict;
//         });
//       } else {
//         setSplitAmount((prevState) => {
//           const dict = { ...prevState };
//           let existingItem = receiptChosen.item[i].person[j];
//           const prevAmount = dict[existingItem];
//           const newAmount =
//             prevAmount +
//             receiptChosen.item[i].total_item_price /
//               receiptChosen.item[i].person.length;
//           dict[existingItem] = newAmount;
//           return dict;
//         });
//       }
//     }
//   }
// } else {
//   alert("Please assign all items");
// }

// splitAmount = [{name: ,amount:}, {name: ,amount:}]
// splitAmount.map(e => e.name).indexOf(receiptChosen.item[i].person[j])

// if (isSet == true) {
//   let splitAmountTemp: SplitAmountInterface[];
//   for (let i = 0; i < receiptChosen.item.length; i++) {
//     for (let j = 0; j < receiptChosen.item[i].person.length; j++) {
//       console.log(splitAmount);
//       if (
//         splitAmountTemp!
//           .map((e) => e.name)
//           .indexOf(receiptChosen.item[i].person[j]) > -1
//       ) {
//         splitAmountTemp = (splitAmountTemp: any) => {
//           const indexOfPerson = splitAmountTemp
//             .map((e) => e.name)
//             .indexOf(receiptChosen.item[i].person[j]);
//           const dict = [...splitAmountTemp];
//           const prevAmount = dict[indexOfPerson].amount;
//           const newAmount =
//             prevAmount +
//             receiptChosen.item[i].total_item_price /
//               receiptChosen.item[i].person.length;
//           dict[indexOfPerson].amount = newAmount;
//           return dict;
//         };
//         // const indexOfPerson = splitAmountTemp
//         //   .map((e) => e.name)
//         //   .indexOf(receiptChosen.item[i].person[j]);
//       } else {
//         splitAmountTemp = (splitAmountTemp: any) => {
//           let newSplitName = receiptChosen.item[i].person[j];
//           let dict = [...splitAmountTemp];
//           // if (prevState) {
//           //   dict = [...prevState];
//           // } else {
//           //   dict = [];
//           // }
//           let newSplitAmount =
//             receiptChosen.item[i].total_item_price /
//             receiptChosen.item[i].person.length;
//           dict.push({ name: newSplitName, amount: newSplitAmount });
//           return dict;
//         };
//       }
//     }
//   }
//   setSplitAmount(splitAmountTemp);
// } else {
//   alert("Please assign all items");
// }
