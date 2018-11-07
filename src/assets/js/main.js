// import { resolve } from "dns";
// import { reject } from "when";

const async = () => {
    return new Promise((resolve, reject) => {
        const num = 6;
        if (num > 5) {
            resolve(num);
        } else {
           reject('num小于5'); 
        }
    })
}
async()
    .then((data) => {
        console.log('first:' + data);
        return data;
    })
    .then((data) => {
        console.log('second:' + data);
        return data;
    })
    .catch((err) => {
        console.log(err);
    })