var xlsx = require('node-xlsx');
var fs = require('fs');

var data = [{

        data: [
            [
                '健康表id',
                '学号',
                '用户名',
                '是否发烧',
                '是否去过高危地区',
                '是否核酸',
                '学院'
            ],
            [
                '1',
                '201307080',
                '范小伟',
                '否',
                '否',
                '是',
                '数计学院'

            ]

        ]
    }


]

let arr = [
        '2',
        '201307080',
        '范大伟',
        '否',
        '否',
        '是',
        '数计学院'

    ]
    // let arr1 = data[0].data[1].push(arr)
    // console.log(arr1);

// // 写xlsx
// var buffer = xlsx.build(data);
// fs.writeFile('./resut.xlsx', buffer, function(err) {
//     if (err)
//         throw err;
//     console.log('Write to xls has finished');

//     // 读xlsx
//     var obj = xlsx.parse("./" + "resut.xlsx");
//     console.log(JSON.stringify(obj));
// });

const obj = xlsx.parse('src/upload/' + "1.xlsx")
    // console.log(JSON.stringify(obj));
    // console.log((obj[0].data));
const obj1 = obj[0].data
const arr1 = {}
    // console.log("-------------------");
    // for (let i = 1; i < obj1.length; i++) {
    //     for (let j = 0; j < obj1[i].length; j++) {


//     }
//     arr1 = obj1[i]
//     console.log(arr1);
// }