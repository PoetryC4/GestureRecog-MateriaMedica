


function checkSolution (rule, value, callback){
  if (value.length > 50) {
    callback(new Error("内容不得过长(<=50)"))
  } else {
    callback()
  }
}
function checkTitle (rule, value, callback){
  if (value === "") {
    callback(new Error("请输入内容"))
  } else if (value.length > 100) {
    callback(new Error("内容不得过长(<=100)"))
  } else {
    callback()
  }
}
function checkChoice (rule, value, callback){
  if (value === "") {
    callback(new Error("请输入内容"))
  } else if (value.length > 50) {
    callback(new Error("内容不得过长(<=50)"))
  } else {
    callback()
  }
}

function checkType (rule, value, callback){
  if (parseInt(value)==NaN) {
    callback(new Error("请输入数字"))
  } else if (parseInt(value) > 15 || parseInt(value) < 0) {
    callback(new Error("值必须在0到15之间"))
  } else {
    callback()
  }
}
function checkIngredientName (rule, value, callback){
  if (value==="") {
    callback(new Error("请输入内容"))
  } else if (value.length>20) {
    callback(new Error("内容不得过长(<=20)"))
  } else {
    callback()
  }
}
function checkIngredientText (rule, value, callback){
  if (value.length>400) {
    callback(new Error("内容不得过长(<=400)"))
  } else {
    callback()
  }
}