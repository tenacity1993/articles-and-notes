const thrift = require('thrift')
const GetInfo = require('../thrift/gen-nodejs/GetInfo')
const ttypes = require('../thrift/gen-nodejs/number_types')
const assert = require('assert')

let transport = thrift.TBufferedTransport;
let protocol = thrift.TBinaryProtocol;



let connection = thrift.createConnection("localhost", 9090, {
    transport: transport,
    protocol: protocol
});

connection.on('error', function (err) {
    assert(false, err);
});

let client = thrift.createClient(GetInfo, connection)

client.ping(function (err, response) {
    console.log('client ping()')
})

let length = 0
let timer = setInterval(function () {
    client.getNum(Math.random() * 10, 'hello', function (err, response) {
        console.log('send num to server:  ', response.num, response.comment)
    })
    length++
    if(length >= 5) {
        client.getList((err, response)=> {
            console.log('response from server: \n', response)
        })
        connection.end()
        clearInterval(timer)
    }
}, 1000)
