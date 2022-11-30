var fields = {
  name:{regex:/^[A-Za-z\s]{3,15}$/,class:"enterAlphabet"},
  add:{regex:/^[A-Za-z0-9'\.\-\s\,]{7,45}$/,class:"tooShort"},
  phone:{regex:/^[6-9][0-9]{9}$/,class:"enterValid"},
  email:{regex:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,class:"enterValid"},
  pin:{regex:/^[0-9]{6}$/,class:"enter6Digits"},
  area:{regex:/^[A-Za-z0-9'\.\-\s\,]{7,}$/,class:"tooShort"}
}
function validateElement(elm){
  let field=fields[elm.name];
  let regex = field.regex;
  let className = field.class;
  if(elm.parentElement.tagName=="TD"){className="dummy"}
  if(!regex.test(elm.value)){
    // elm.css("border","2px solid red");
    elm.style.border="2px solid red";
    elm.parentElement.classList.add(className);
    return false
  }
  else{
    elm.style.border="1px solid rgb(186, 186, 186)";
    elm.parentElement.classList.remove(className);
    return true
  }
}
var ok=true;
$(document).ready( function() { // Wait until document is fully parsed
  $("form").on('submit', function(e){
    e.preventDefault();
    let xx=0;
    let inputs=$("input:not([type=checkbox]):not([type=radio])")
    for (let i = 0; i < inputs.length; i++) {
      ok=ok && validateElement(inputs[i]);
    }
    ok=ok && $("select").val()!="";
    let checkboxes = $("input[type='checkbox']:checked");
    let check=checkboxes.length>0;
    ok=ok && check;
    ok=$("input[type=radio]:checked").length==0?false:ok;
    let msg = ok?"Done":"Not Proper";
    alert(msg);
  });
})
// function validate(e) {
//   alert("hello");
//   e.preventDefault();
  
// }
// $("form").submit = validate;

