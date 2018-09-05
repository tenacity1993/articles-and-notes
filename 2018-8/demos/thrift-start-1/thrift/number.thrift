struct Item {
    1: i16 num,
    2: string comment
}

struct Response {
    1: i16 code,
    2: string msg,
    3: list<Item> data
}

service GetInfo {
    void ping(),
    Item getNum(1: i16 num, 2: string comment),
    Response getList()
}