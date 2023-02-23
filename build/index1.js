"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_table_extractor_1 = __importDefault(require("pdf-table-extractor"));
const fs_1 = __importDefault(require("fs"));
// var a 
// //PDF parsed
// function success(result: any)
// {
//    a = result
// //    console.log(a)
// }
// //Error
// function error(err: any)
// {
//    console.error('Error: ' + err);
// }
// pdf_table_extractor("./src/Invoices/KA-2223-2553774.pdf",success,error);
// // async function extract() {
// //    const d = await pdf_table_extractor("./src/Invoices/KA-2223-2553774.pdf",success,error)
// // //    console.log(d)
// // }
// console.log(a)
// // (obj: any) => new Promise(resolve => {
// //     resolve(obj)
// //  })
// // extract()
var table_data;
function extractTableData(path) {
    return new Promise(function (resolve, reject) {
        (0, pdf_table_extractor_1.default)(path, function (result) {
            table_data = result;
            resolve(table_data);
        }, function (err) {
            reject(err);
        });
    });
}
const path = "./src/Invoices/MH-C-23-43568.pdf";
extractTableData(path)
    .then(function (table_data) {
    // console.log(table_data);
    const x = table_data.pageTables.map((x) => x.tables);
    // fs.writeFileSync("result.txt", `${x}`)
    // console.log(x)
    // const arr = x.map((str_arr: any) => {
    //     const final_arr = str_arr.map((x:any) => {
    //         const start_arr = x.findIndex((x:any) => x.match("Reason for Credit: Fee Adjustment"))
    //         // console.log(x[start_arr])
    //         const end_arr = x.findIndex((x:any) => x.match('Details of Fees to the above'))
    //         // console.log(x[end_arr])
    //         return {
    //             str_arr: x[start_arr],
    //             end_arr: x[end_arr]
    //         }
    //     })
    //     return final_arr
    // })
    // const final_arr = x.slice(0, 5)
    // final_arr.map((x:any) => {
    // })
    const data = x.flat().flat();
    const splitString = data.map((x) => x.split('\n')).flat();
    const removeEmptyString = splitString.filter((x) => x != '');
    fs_1.default.writeFileSync('result.txt', `${removeEmptyString}`);
    // const 
    console.log(removeEmptyString);
})
    .catch(function (err) {
    console.error('Error: ' + err);
});
// map((x) => {
//     const a = x.flatMap((x) => x.flatMap((x) => {
//         return {
//             str: x.str,
//             x: x.x,
//             y: x.y
//         }
//     }))
//     const b = a.flatMap((x) => x)
//     return b
// }),
// map((x) => {
//     return x.map((x) => x.str)
// })
// map(async x => {
//     const details = await toArray(from(x).pipe(
//         groupBy((x) => x.x),
//         map(async x => {
//             if(x.key){
//                 return {
//                     x_val: x.key,
//                     details_x: await toArray(from(x).pipe(
//                         groupBy((x) => x.y),
//                         map(async x => {
//                             return {
//                                 y_val: x.key,
//                                 details: await toArray(from(x).pipe(
//                                     map((x)=> {
//                                         return {
//                                            str: x.str
//                                         }
//                                     })
//                                 ))
//                             }
//                         }),
//                         // map(({details}) => {
//                         //     // return {
//                         //     //     data: extractedtext(details)
//                         //     // }
//                         // })
//                     ))
//                 }
//             }
//         })
//     ))
//     return details
// }),
// map((str) => {
//     return str.str
// }),
// map((x) => {
//     return extractedtext(x)
// })
