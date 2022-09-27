let s = 'Abdul Bari https://youtu.be/9wgK4-O0GEA \nAbdul Bari https://youtu.be/9wgK4-O0GEA'
let arr=s.split("\n");
for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("https");
}
for (let i = 0; i < arr.length; i++) {
    arr[i][1] = "https"+arr[i][1];
    arr[i][0]=arr[i][0].trim();
    arr[i][1]=arr[i][1].trim();
}

console.log(arr);