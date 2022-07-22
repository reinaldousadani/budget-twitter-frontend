// no 3 alice & Michael

function comparePoints(arr1, arr2) {
  let len = arr1.length;
  let alicePoints = 0;
  let michaelPoints = 0;
  for (let i = 0; i < len; i++) {
    if (arr1[i] > arr2[i]) {
      alicePoints++;
    }
    if (arr1[i] < arr2[i]) {
      michaelPoints++;
    }
  }

  return [alicePoints, michaelPoints];
}

// no 4 word mirror ("ABBA") = true, ("GAKTRUE") = false

function wordMirror(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log("----------------------------------------------")
console.log("\nNomor 3:");
console.log(comparePoints([0,0,0], [1,2,3]));

console.log("\nNomor 4:")
console.log(wordMirror("KATAK"))
