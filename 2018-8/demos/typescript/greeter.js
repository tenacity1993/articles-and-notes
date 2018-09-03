// 学生信息： 姓名  年龄  选修课程数组  班级学生数组
var ClassInfo = /** @class */ (function () {
    function ClassInfo() {
        this._list = [];
    }
    Object.defineProperty(ClassInfo.prototype, "classInfo", {
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    ClassInfo.prototype.addStudent = function (std) {
        this._list.push(std);
    };
    return ClassInfo;
}());
var student = /** @class */ (function () {
    function student(name, age, course) {
        if (course === void 0) { course = ['math', 'chinese']; }
        this._name = name;
        this._age = age;
        this._course = course.slice();
    }
    return student;
}());
var std1 = new student('Lilei', 15);
var std2 = new student('Hanmeimei', 15, ['math', 'chinese', 'science']);
var classOne = new ClassInfo();
classOne.addStudent(std1);
classOne.addStudent(std2);
console.log(classOne.classInfo);
