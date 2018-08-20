const thrift = require('thrift')
const GetInfo = require('../thrift/gen-nodejs/GetInfo')
const ttypes = require('../thrift/gen-nodejs/number_types')
const Item = require('../thrift/gen-nodejs/number_types').Item


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
        // 定义返回值
        result(null, res)
    }
})

server.listen(9090);