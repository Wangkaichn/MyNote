// class 装饰器
// function Decorator () {
//   return function <T extends new (...args: any[]) => any>(constructor: T) {
//     return class extends constructor {
//       name = 'Decorator'
//       getName() {
//         return this.name
//       }
//     }
//   }
// }
// const X = Decorator()(
//   class {
//     constructor(public name: string) {
//       this.name = name
//     }
//   }
// )
// const x = new X('wk')
// const res = x.getName()
// console.info('res: ', res)

// [普调方法、访问器、属性、参数] - 装饰器: target 对应的是类的 prototype
// [静态方法] - 装饰器: target 对应的是类的 constructor
// function FuncDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
//   console.info('FuncDecorator: ', target, key, descriptor)
// }
// function SetterDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
//   // 已经设置 get/set 访问器的变量, 不能再设置 writable 值, 其行为应由访问器实现
//   // descriptor.writable = false
//   console.info('SetterDecorator: ', target, key, descriptor)
// }
// function PropertyDecorator(target: any, key: string): any {
//   console.info('PropertyDecorator: ', target, key)
//   const descriptor: PropertyDescriptor = {
//     writable: true
//   }
//   return descriptor
// }
// function ParamentDecorator(target: any, key: string, parameterIndex: number) {
//   console.info('ParamentDecorator: ', target, key, parameterIndex)
// }
// class X {
//   public _name: string
//   @PropertyDecorator
//   public age: string = ''
//   constructor(name: string) {
//     console.info('constructor - constructor: ', Object.getOwnPropertyDescriptor(this, 'age'))
//     this._name = name
//   }
//   test() {}
//   @FuncDecorator
//   getInfoByCommon(@ParamentDecorator argA: string, argB: number) {
//     return `class function [${argA} - ${argB}]: ${this._name}`
//   }
//   @FuncDecorator
//   static getInfoByStatic() {
//     return 'static function: getInfo'
//   }
//   @SetterDecorator
//   set name(newName: string) {
//     this._name = newName
//   }
//   get name() {
//     return `Getter: ${this._name}`
//   }
// }
// const x = new X('wk')
// const res1 = x.getInfoByCommon('args', 1)
// console.info('getInfoByCommon: ', res1)
// const res2 = X.getInfoByStatic()
// console.info('static getInfoByStatic: ', res2)
// console.info('name: ', x.name)
// console.info('age: ', x.age)
// console.info('getOwnPropertyDescriptor: ', Object.getOwnPropertyDescriptor(x, 'age'))
// x.age = 'a new age'
// console.info('age: ', x.age)

function CatchError(msg: string) {
  return function (target: any, key: string, decorator: PropertyDescriptor) {
    const fn = decorator.value
    decorator.value = () => {
      try {
        return fn()
      } catch {
        console.info(`${key} - ${msg} 不存在`)
      }
    }
  }
}
// const all: any = undefined
const all: any = {
  name: 'wk'
}
class X {
  @CatchError('all.name')
  getName() {
    console.info(all.name)
    return 'name'
  }
  @CatchError('all.age')
  getAge() {
    console.info(all.age)
    return 'age'
  }
}

const x = new X
const myName = x.getName()
const myAge = x.getAge()
console.info('myName: ', myName)
console.info('myAge: ', myAge)
