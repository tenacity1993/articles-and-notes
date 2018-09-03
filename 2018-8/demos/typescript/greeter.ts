// 学生信息： 姓名  年龄  选修课程数组  班级学生数组
class ClassInfo {
    private _list: Array<student> =[];
    get classInfo():  Array<student>{
        return this._list
    }

    addStudent(std: student) {
        this._list.push(std)
    }
}


class student {
    _name: string;
    _age: number;
    _course?: Array<string>;
    constructor(name: string, age: number, course: Array<string>=['math', 'chinese']) {
        this._name = name
        this._age = age
        this._course = [...course]
    }
}

let std1 = new student ('Lilei', 15)
let std2 = new student ('Hanmeimei', 15, ['math', 'chinese', 'science'])

let classOne = new ClassInfo()
classOne.addStudent(std1)
classOne.addStudent(std2)

console.log(classOne.classInfo)