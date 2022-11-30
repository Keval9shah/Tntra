var fields = {
  name:{regex:/^[A-Za-z\s]{3,15}$/,class:"enterAlphabet"},
  add:{regex:/^[A-Za-z0-9'\.\-\s\,]{7,45}$/,class:"tooShort"},
  phone:{regex:/^[6-9][0-9]{9}$/,class:"enterValid"},
  email:{regex:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,class:"enterValid"},
  pin:{regex:/^[0-9]{6}$/,class:"enter6Digits"},
  area:{regex:/^[A-Za-z0-9'\.\-\s\,]{7,}$/,class:"tooShort"}
}

var ok=false;
function validate(e) {
  e.preventDefault();
  ok && document.querySelectorAll("input:not([type=checkbox]):not([type=radio])").forEach(element => {
    ok=ok && validateElement(element);
  });
  ok=ok && document.querySelector("select").value!="";
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked:not([value='Table'])");
  let check=checkboxes.length>0;
  ok=ok && check;
  ok=document.querySelector("input[type=radio]:checked")==null?false:ok;
  let msg = ok?"done":"notproper";
  let submitBtn=document.querySelector("button[type='submit']").parentElement;
  submitBtn.className=msg;
  ok?addData():"";
  ok=true;
}
document.querySelector("form").onsubmit = validate;

var counter=0;
function addData(){
  document.querySelector(".data").style.display="block";
  counter++;
  let entry = document.createElement("tr");
  entry.innerHTML="<td>"+counter+"</td>";
  document.querySelectorAll(".input__field").forEach(element => {
    entry.innerHTML+="<td>"+element.value+"</td>";
  });
  let checkValues="";
  document.querySelectorAll("input[type='checkbox']:checked:not([value='Table'])").forEach(element=>{
    checkValues+=element.value+" ";
  });
  entry.innerHTML+="<td>"+checkValues+"</td>";
  let radio=document.querySelector("input[type=radio]:checked");
  if(radio){
    radioval=radio?radio.value:"";
    entry.innerHTML+="<td>"+radioval+"</td>";
  }
  else{
    entry.innerHTML+="<td></td>";
  }

  entry.innerHTML+="<td onclick='deleteEntry(this)'><img src='trash-can.svg'></td><td onclick='editEntry(this)'><img src='edit.svg'></td>"
  document.querySelector("#data-table").appendChild(entry);
}
function deleteEntry(elm){
  elm.parentElement.outerHTML="";
  if(document.querySelector(".data tbody").childNodes.length<=3){
    document.querySelector(".data").style.display="none";
  }
}
function editEntry(elm){
  //parent.childnodes.innertext
  let inputs=document.querySelectorAll(".input__field");
  let childNodes=elm.parentElement.childNodes;
  for(i=1;i<13;i++){
    inputs[i-1].value=childNodes[i].innerText;
  }
  let checkText=childNodes[13].innerText.split(" ");
  document.querySelectorAll("input[type=checkbox]").forEach(element=>{
    element.checked=false;
    if(checkText.includes(element.value)){
      element.checked=true;
    }
  });
  if(childNodes[14].innerText!=""){
    let querytext="input[type=radio][value="+childNodes[14].innerText+"]";
    document.querySelector(querytext).checked=true;
  }
  deleteEntry(elm);
}

function validateElement(elm){
  let field=fields[elm.name];
  let regex = field.regex;
  let className = field.class;
  if(elm.parentElement.tagName=="TD"){className="dummy"}
  if(!regex.test(elm.value)){
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

function toggleTable(elm){
  let remove=document.querySelector(".remove");
  if(!elm.checked){
    remove.innerHTML="";
  }
  else{
    remove.innerHTML="<h4 style='margin-top: 20px;'>Please give reference of any two people whom you feel:</h4><div class='parent last'><table><tbody><tr><th class='none'></th><th>Full Name</th><th>Address</th><th>Contact No</th></tr><tr><td class='number'>1</td><td><input type='text' name='name' onchange='validateElement(this)' /></td><td><input type='text' name='add' onchange='validateElement(this)' /></td><td><input type='text' name='phone' onchange='validateElement(this)' /></td></tr><tr><td class='number'>2</td><td><input type='text' name='name' onchange='validateElement(this)' /></td><td><input type='text' name='add' onchange='validateElement(this)' /></td><td><input type='text' name='phone' onchange='validateElement(this)' /></td></tr></tbody></table></div>";
  }
}