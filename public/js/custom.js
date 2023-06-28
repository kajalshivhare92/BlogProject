jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Only alphabetical characters");

$("#userForm").validate({
    rules:{
        name:{
            required: true,
            lettersonly: true,
            minlength: 3
        },
        email: {
            required: true,
            email: true
        },
       
        password:{
            required: true,
           
            minlength: 5,
        },
        confirmpassword:{
            required: true,
            equalTo: '#password'
        },
        phone:{
            required: true,
            digits: true,
            number:true,
           
            maxlength: 10
            
            
        },
    },
    messages:{
        name:{
            required: 'The Name field is required',
            minlength: 'You must enter at least 3 characters',
            lettersonly:"letters only allow"
        },
        email: {
            required: 'The Email field is required',
            email: 'You must enter a valid email address'
        },
        password:{
            required: 'The Password field is required',
            minlength: 'You must enter at least 5 characters'
        },
        confirmpassword:{
            required: 'The Confirm password field is required',
            equalTo: 'The Confirm password field must match with Password'
        },
        phone: {
            required: "Please Enter Your Mobile Number",
            number:"Please enter numbers Only",
            
            maxlength: 'min and max 10 digits number',
            
        },
    },
    // submitHandler: function(form){
    //     alert("Submitted");
    //     form.submit();
    // }
})