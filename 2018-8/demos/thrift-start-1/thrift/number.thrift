struct Item {
    1: i16 num,
    2: string comment
}

struct List {
    1: string msg,
    2: list<Item> dataList
}

service GetInfo {
    void ping(),
    Item getNum(1: i16 num, 2: string comment)
}