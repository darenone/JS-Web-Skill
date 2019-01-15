// create shallow-cloned and deep-clone several methods

// method1
function deepClone1(source) {
  if(source && typeof source !== 'object') {
    throw new Error('error arguments,shallowClone')
  }
  var targetObj = Array.isArray(source) ? [] : {} //IE9 above support
  try
    {
      var targetObj = Array.isArray(source) ? [] : {} //IE9 above support
    }
  catch (err) {
    console.log(err.message)
    function isArray(arr) {
      return Object.prototype.toString.call(arr) == '[object Array]'
    }
    var targetObj = isArray(source) ? [] : {}
  }
  for(var keys in source) {
    if(source.hasOwnProperty(keys)) {
      // 判断子元素是否未对象，如果是，递归复制
      if(source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone1(source[keys])
      } else {
        // 如果不是，简单复制
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
var a = { name: 'tom', age: 20}
var b = deepClone1(a)
console.log(a === b)
a.age = 30
console.log(a)
console.log(b)
var c = 1
// deepClone1(c)

// method2
function deepClone2(source) {
  if(source && typeof source !== 'object') {
    throw new Error('argumens 是 primitive')
  }
  return JSON.parse(JSON.stringify(source))
}
var d = deepClone2(a)
console.log(a === d)
a.age = 40
console.log(a)
console.log(d)