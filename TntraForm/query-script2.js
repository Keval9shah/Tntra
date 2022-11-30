// errorClass: "error fail-alert",
// validClass: "valid success-alert",

$(document).ready(function() {
  $("#basic-form").validate({
    rules: {
      name : {
        required: true,
        minlength: 3,
        regex:/^[A-Za-z\s]{3,15}$/,
      },
      phone: {
        required: true,
        number: true,
        regex:/^[6-9][0-9]{9}$/,
      },
      email: {
        required: true,
        email: true,
        regex:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      },
      add:{
        required:true,
        minlength:7,
        regex:/^[A-Za-z0-9'\.\-\s\,]{7,45}$/,
      },
      pin:{
        required:true,
        number:true,
        regex:/^[0-9]{6}$/,
      },
      area:{
        required:true,
        minlength:7,
        regex:/^[A-Za-z0-9'\.\-\s\,]{7,}$/,
      },
      selector:{
        required: true,
      },
      cbox:{
        required: true,
      },
      radio:{
        required: true,
      }
    },
    messages : {
      name: {
        minlength: "Name should be at least 3 characters",
        regex: "Only use Alphabets",
      },
      phone: {
        required: "Please enter your number",
        number: "Please enter a numerical value",
        regex: "Number should start with 6 or greater",
      },
      email: {
        email: "The email should be in the format: abc@domain.tld"
      },
      area: {
        regex: "Too Short",
      },
      pin: {
        number: "Enter 6 digits",
      },
      add: {
        regex: "Write at least 7 characters",
      },
      selector: {
        required: "Select one option",
      }
    }
  });
});
$.validator.addMethod("regex", function(value, element, regexpr) {          
  return regexpr.test(value);
});

// $("input[name=name").rules("add", { regularExpression: "^[A-Za-z\s]{3,15}$" })