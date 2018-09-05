const thrift = require('thrift')
const GetInfo = require('../thrift/gen-nodejs/GetInfo')
const ttypes = require('../thrift/gen-nodejs/number_types')
const Item = require('../thrift/gen-nodejs/number_types').Item
const Response = require('../thrift/gen-nodejs/number_types').Response

let list = []
const server = thrift.createServer(GetInfo, {
    ping: function (result) {
        console.log('server ping()')
        result(null)
    },
    getNum: function (num, comment, result) {
        console.log('get info from client: ', num, comment)
        const res = new Item({
            num, comment
        })
        list.push(res)
        // 定义返回值
        result(null, res)
    },
    getList: function(result) {
        const res = new Response({
            code: 200,
            msg: 'success',
            data: list
        })
        console.log('number list: \n', res)
        result(null, res)
    }
})

server.listen(9090);