import * as fs from 'fs';
import { flatMap, groupBy, map, take, filter } from 'ix/asynciterable/operators/index.js';
import { from, toArray } from 'ix/asynciterable';
import { PDFExtract, PDFExtractText } from 'pdf.js-extract';
import pdf_table_extractor from "pdf-table-extractor"
// import { includes } from 'ix/iterable';

const giveFiles = (getpath: string): string[] => {
    return fs.readdirSync(getpath).filter(x => x.includes('.pdf'))
};

const month = '/12/'


var table_data;
function extractTableData(path: string) {
    return new Promise(function(resolve, reject) {
      pdf_table_extractor(path, function(result: any) {
        table_data = result;
        console.log(table_data.pageTables[0].tables)
        resolve(table_data);
      }, function(err: any) {
        reject(err);
      });
    });
  }
  
//   .then(function(table_data) {
//     const a:any = table_data
//     return a
// })  


const listPDf = giveFiles("./src/dec-22")

fs.writeFileSync("result.csv" ,"InvoiceNo\tInvoiceDate\tFromGst\tToGst\tCategory\tDescription\tamount\tIGST\tCGST\tSGST\t\n")

// function exxtracted_table(data: PDFExtractText[]) {
//     // const table = data[data.findIndex((x) => x.str.match('SI'))].x
//     // const obj = data.filter((x) => x.x == table)
//     // // 547.76
//     // const regex = /^\d+\./
//     // let noOfRows = obj.filter((x) => regex.test(x.str)  )

//     const find_x = data[data.findIndex((x) => x.str.match('IGST') || x.str.match('SGST'))].x
//     const desc_arr = data.filter((x) => x.x == find_x) 
//     const filteredData = desc_arr.filter(obj => {
//         return !["SGST", "CGST", "Total:", "", "Description of", "Service", "Description of Service", "IGST"].includes(obj.str);
//     });

//     //   const x = data[data.findIndex((x) => x.str.match('FBA Weight Handling'))]
//     //   console.log(x, data[data.findIndex((x) => x.str.match('FBA Weight Handling'))+1])
//     // const desc_Col = desc_arr.filter((x) => x.str != '')
//     // const filter_IGST = desc_Col.filter((x) => x.str != 'IGST')
//     // const filter_CGST = filter_IGST.filter((x) => x.str != 'CGST')
//     // const filter_SGST = filter_CGST.filter((x) => x.str != 'SGST')
//     // const description = filter_SGST.filter((x) => x.str != 'Total:')
//     // const filter_desc = description.filter((x) => x.str)
//     const required_des = filteredData.map((x) => x.str)
//     for (let i = 1; i < required_des.length; i++) {
//         if (required_des[i] === "Shipping Fee") {
//           required_des[i-1] += " " + required_des[i];
//           required_des.splice(i, 1);
//           i--;
//         }
//       }
      
//     console.log(required_des)

//     return 0
// }


// var row:string[]
//     for(let i=1; i<=length; i++){
//         const find_first_index = array.findIndex((x) => x.match(`${i}.`))
//         for(let i=0; i<array.length; i++){
//             if(array[find_first_index+i] == `${i+1}.` || array[find_first_index+i] == "Subtotal of fees amount"){
//                 break;
//             }
//             row.push(array[find_first_index + i])
//         }
//     }

//     const inrValues = [];

//     console.log(row)

//     return 0

// function Inr_values_IGST(array: string[], length: number){
//     // console.log(array)
//     // var row:any = []
//     var row = []
//     for (let i =1; i<=length; i++) {
//         row.push(array.slice(array.findIndex(r => r == `${i}.`), array.findIndex(r => r ==`${i+1}.`)))
//     }

//     const tax_values = row.map((arr) => {
//         console.log(arr)
//         const inrValues = [];
//         for (let i = 0; i < arr.length; i++) {
//             // const currentValue = x[i];
//             // var inrIndex
//             // var value
//             // if (currentValue.includes('INR')) {
//             //     inrIndex = currentValue.indexOf('INR');
//             //     value = currentValue.substring(inrIndex + 4);
//             //     inrValues.push(value);
//             // }
//             // else if(currentValue.includes('-INR')){
//             //     inrIndex = currentValue.indexOf('-INR');
//             //     value = currentValue.substring(inrIndex + 5);
//             //     inrValues.push(value);
//             // }
//             const str = arr[i];
//             if (str.match(/INR/)) {
//                 const match = str.match(/INR\s*([\d.]+)/);
//                 if (match) {
//                     inrValues.push(parseFloat(match[1]));
//                 } 
//                 else if (i + 1 < arr.length) {
//                     const nextStr = arr[i + 1];
//                     if (nextStr.match(/^-?[\d.]+$/)) {
//                         inrValues.push(parseFloat(nextStr));
//                         i++;
//                     }
//                 }
//             }
//         }

//         const obj = {
//             "amount": inrValues[0],
//             "IGST": inrValues[1],
//             "Total_value": inrValues[3] ? inrValues[3] : " "
//         }

//         return obj
//     })
    
//     console.log(tax_values);

//     // const tax_values = row.map((x) => {
//         // var val
//         // for(let i=0; i<x.length; i++){
//         //     x.map((y) => {
//         //         if(y.match('INR')){
//         //             const match = y.match(/-?[\d.]+/);
//         //             if (match) {
//         //                 val = Number(match[0])
//         //                 // inrValues.push(x)
//         //             } 
//         //             else if (i + 1 < x.length) {
//         //                 const nextStr = x[i + 1];
//         //                 if (/^-?[\d.]+$/.test(nextStr)) {
//         //                     val = Number(y.substring(4)) + Number(nextStr)
//         //                     // inrValues.push(Number(str.substring(4)) + Number(nextStr));
//         //                 }
//         //             }
//         //         }
//         //     })
//         // }

//         // console.log(val)
//         // return {
//         //     "Amount": val,
//         //     "IGST": x[x.findIndex((x) => x.match('IGST') || 0)+2]
//         // }
//     // })

//     // console.log(tax_values)

//     // console.log(row_data)
//     // array.findIndex(r => r == '1.')
//     // array.findIndex(r => r == '2.')
//     // array.findIndex(r => r == '3.')
//     // console.log(array)
//     // const tax_values1 = row.map((x) => {
//     //     const inrValues = [];
//     //     // console.log(x)
//     //     for(let i=0; i<x.length; i++){
//     //         const str = x[i];
//     //         if (str.match("INR")) {
//     //             const match = str.match(/-?[\d.]+/);
//     //             if (match) {
//     //                 const x = Number(match[0])
//     //                 inrValues.push(x)
//     //             } 
//     //             else if (i + 1 < x.length) {
//     //                 const nextStr = x[i + 1];
//     //                 if (/^-?[\d.]+$/.test(nextStr)) {
//     //                     inrValues.push(Number(str.substring(4)) + Number(nextStr));
//     //                 }
//     //             }
//     //         }
//     //     }

//     //     console.log(inrValues)
//     //     return {
//     //         "amount": inrValues[0],
//     //         "IGST": inrValues[1]
//     //     }
//     // })

//     // console.log(tax_values1)

//     // const obj = tax_values.map((x) => {

//     // })


//     // console.log(obj)
//     // for (let i = 0; i < array.length; i++) {
//     //     const str = array[i];
//     //     if (str.includes("INR")) {
//     //         const match = str.match(/-?[\d.]+/);
//     //         if (match) {
//     //             inrValues.push(Number(match[0]));
//     //         } 
//     //         else if (i + 1 < array.length) {
//     //             const nextStr = array[i + 1];
//     //             if (/^-?[\d.]+$/.test(nextStr)) {
//     //                 inrValues.push(Number(str.substring(4)) + Number(nextStr));
//     //             }
//     //         }
//     //     }
//     // }

//     // const obj = {
//     //     "amount": inrValues[0],
//     //     "IGST": inrValues[1]
//     // }

//     return 0

// }

function Inr_values_IGST(array: string[], length: number){
    var row = []
    for (let i =1; i<=length; i++) {
        row.push(array.slice(array.findIndex(r => r == `${i}.`), array.findIndex(r => r ==`${i+1}.`)))
    }

    var total_table

    const tax_values = row.map((arr) => {
        // console.log(arr)
        const inrValues = [];
        for (let i = 0; i < arr.length; i++) {
            const str = arr[i];
            if (str.match(/INR/)) {
                const match = str.match(/INR\s*([\d.]+)/);
                if (match) {
                    inrValues.push(parseFloat(match[1]));
                } 
                else if (i + 1 < arr.length) {
                    const nextStr = arr[i + 1];
                    if (nextStr.match(/^-?[\d.]+$/)) {
                        inrValues.push(parseFloat(nextStr));
                        i++;
                    }
                }
            }
        }
        if(inrValues.length == 3){
            total_table = inrValues[2]
        }

        const obj = {
            // "No_of_Rows": length,
            "amount": inrValues[0],
            "IGST": inrValues[1],
            "SGST": 0,
            "CGST": 0
            // "Total_value": inrValues[2] ? inrValues[2] : " "
        }

        return obj
    })

    const final_obj = {
        "No_of_Rows": length,
        "total_value": total_table,
        "taxes": tax_values
    }

    return final_obj

}

function Inr_values_CGST(array: string[], length: number){
    var row = []
    for (let i =1; i<=length; i++) {
        row.push(array.slice(array.findIndex(r => r == `${i}.`), array.findIndex(r => r ==`${i+1}.`)))
    }

    var total_table

    const tax_values = row.map((arr) => {
        // console.log(arr)
        const inrValues = [];
        for (let i = 0; i < arr.length; i++) {
            const str = arr[i];
            if (str.match(/INR/)) {
                const match = str.match(/INR\s*([\d.]+)/);
                if (match) {
                    inrValues.push(parseFloat(match[1]));
                } 
                else if (i + 1 < arr.length) {
                    const nextStr = arr[i + 1];
                    if (nextStr.match(/^-?[\d.]+$/)) {
                        inrValues.push(parseFloat(nextStr));
                        i++;
                    }
                }
            }
        }

        if(inrValues.length == 4){
            total_table = inrValues[3]
        }
        const obj = {
            // "No_of_Rows": length,
            "amount": inrValues[0],
            "IGST": 0,
            "SGST": inrValues[1],
            "CGST": inrValues[2],
            // "Total_value": inrValues[3] ? inrValues[3] : " "
        }

        return obj
    })

    const final_obj = {
        "No_of_Rows": length,
        "total_value": total_table,
        "taxes": tax_values,
    }

    return final_obj

}



function extract_amt (array: PDFExtractText[]) {
    const str_arr = array.map((x) => x.str)
    const filteredData = str_arr.filter(obj => {
        return ![" ", ""].includes(obj);
    });
    const filteredArray = filteredData.filter(str => !str.includes('Original for') && !str.includes('*ASSPL-Amazon Seller'))
    const start_index = filteredArray.findIndex((x) => x.match('SI'))
    const end_index = filteredArray.findIndex((x) => x.match('Subtotal of fees amount'))

    const amt_arr = filteredArray.slice(start_index, end_index+1)

    
    const noOfRows = array.filter((x) => x.x == array[array.findIndex((x) => x.str.match('SI'))].x)
    const remove_SI = noOfRows.filter((x) => !x.str.includes('SI') && !x.str.includes('No'))
    const remove_emptyStr = remove_SI.filter((x) => {
        return ![""," "].includes(x.str)
    })
    const start = remove_emptyStr.findIndex((x) => x.str.match('1.'))
    const end = remove_emptyStr.findIndex((x) => x.str.match('Date') || x.str.match(month))
    const NumberRows = remove_emptyStr.slice(start, end)
    var tax_arr_test
    // console.log(amt_arr.includes('IGST'))
    if(amt_arr.includes('IGST')){
        tax_arr_test = Inr_values_IGST(amt_arr, NumberRows.length)
    }
    else {
        tax_arr_test = Inr_values_CGST(amt_arr, NumberRows.length)
    }
    // console.log(remove_emptyStr)
    return tax_arr_test
}

function sub_total_Igst(array: string[]){
    var sub_total
    if(array.includes('IGST')){
        return sub_total = {
            "IGST": array[array.findIndex((x) => x.match('Subtotal for IGST'))+1],
        }
    }
    else {
        return sub_total = {
            "SGST": array[array.findIndex((x) => x.match('Subtotal for SGST'))+1],
            "CSGT": array[array.findIndex((x) => x.match('Subtotal for CGST'))+1]
        }
    }
}


function extractedtext(data: PDFExtractText[]) {
    const InvoiceNo = data.findIndex((x) => x.str.match('Invoice Number'))
    const creditNoteNo = data.findIndex((x) => x.str.match('-C-'))
    const isInvoiceNo = InvoiceNo == -1 ? data[creditNoteNo].str : data[InvoiceNo].str

    const InvoiceDate = data.findIndex((x) => x.str.match(month))
    const creditNoteDate = data.findIndex((x) => x.str.match('Credit Note Date'))
    const isInvoiceDate = InvoiceDate == -1 ? data[creditNoteDate].str : data[InvoiceDate].str

    const FromGst = data.findIndex((x) => x.str.match("CIN No"))
    const ToGst = data.findIndex((x) => x.str.match("GSTIN"))

    const filter_array = data.filter((x) => {
        return !['', ' '].includes(x.str)
    })
    const taxes = filter_array.map((x) => x.str)

    const find_x = data[data.findIndex((x) => x.str.match('IGST') || x.str.match('SGST'))].x
    const desc_arr = data.filter((x) => x.x == find_x) 
    const filteredData = desc_arr.filter(obj => {
        return !["SGST", "CGST", "Total:", "", "Description of", "Service", "Description of Service", "IGST"].includes(obj.str);
    });
    const required_des = filteredData.map((x) => x.str)
    for (let i = 1; i < required_des.length; i++) {
        if (required_des[i] === "Shipping Fee") {
          required_des[i-1] += " " + required_des[i];
          required_des.splice(i, 1);
          i--;
        }
    }

    // console.log(sub_total_Igst(taxes))
    var obj
    obj = {
        "Invoice Number": isInvoiceNo.split(" ").slice(-1)[0],
        "Invoice Date": isInvoiceDate.split(':')[1],
        "FromGst": data[FromGst].str,
        "ToGst": data[ToGst].str,
        "Description": required_des,
        "taxes_and_amount": extract_amt(data),
        "Sub Total Fees Amt": taxes[taxes.findIndex((x) => x.match('Subtotal of fees amount'))+1],
        "Sub_Total IGST": sub_total_Igst(taxes).IGST ? sub_total_Igst(taxes).IGST : 0,
        "Subtotal for SGST": sub_total_Igst(taxes).SGST ? sub_total_Igst(taxes).SGST : 0,
        "Subtotal fo CGST": sub_total_Igst(taxes).CSGT ? sub_total_Igst(taxes).CSGT : 0,
        "Total Invoice amount": taxes[taxes.findIndex((x) => x.match('Total Invoice amount'))+1]

    }

    return obj
}

// const program1 = from(listPDf).pipe(
//     map((x) => {
//         return x
//     } ),
//     filter((x) => x.includes('MH-C-23-43568.pdf')),
//     map((x) => {
//         extractTableData(`./src/Invoices/${x}`)
//     }),
// )


const program = from(listPDf).pipe(
    map((x) => {
        console.log(x)
        return x
    }),
    // filter((x) => x.includes('MH-C-23-43568.pdf')),
    // map((x) => {
    //     return pdfJson(x)
    // })
    // take(1),
    map((pdf ) => {
        const pdfextract = new PDFExtract()
        const data = pdfextract.extract(`./src/dec-22/${pdf}`, {})
        return data
    }),
    // map((x) => {
    //     const path = `./src/Invoices/${x}`
    //     // console.log(path)
    //     const b = PDFTableExtractor(path,success)
    //     return b
    // }),
    map((data) => {
        const x = data.pages.flatMap((x) => x.content)
        return x
    }),
    map((pdf_arr) => {
        // if(pdf_arr.map((x) => x.str.match('IGST'))){
        //     return extract_amt(pdf_arr)
        // }
        // else if(pdf_arr.map((x) => x.str.match('CGST'))){
        //     return extract_amt(pdf_arr)
        // }

        return extractedtext(pdf_arr)
        
    }),
    // map((x) => {
    //     return extract_amt(x)
    // })
    
)



program.forEach((x) => {
    console.dir(x, {depth: null})
    fs.appendFileSync("result.csv", `Total\t \t \t \t \t${x['Total Invoice amount']} \t ${x['Sub Total Fees Amt']}\t ${x['Sub_Total IGST']} \t ${x['Subtotal for SGST']} \t ${x['Subtotal fo CGST']} \t\n`)

    for(let desc=0; desc<x.Description.length; desc++){
        fs.appendFileSync("result.csv", `${x['Invoice Number']}\t${x['Invoice Date']}\t${x.FromGst}\t${x.ToGst}\t \t${x.Description[desc]}\t${x.taxes_and_amount.taxes[desc].amount}\t${x.taxes_and_amount.taxes[desc].IGST}\t${x.taxes_and_amount.taxes[desc].SGST}\t${x.taxes_and_amount.taxes[desc].CGST}\t\n`)
    }
    // console.log(x)
    // console.log("x: " ,x?.x_val)
    // for(let v of x!.details_x){
    //     // console.log("y: ", v.y_val)
    //     for(let d of v.details){
    //         // console.log("str: " , d.str)
    //         const table = d.str.match('SI No')
    //         console.log(table)
    //     }
    // }

})