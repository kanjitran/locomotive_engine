$(document).ready(function() {
  //$.i18n.load(App.messages); //load language dictionary
  var ok = true;
  // $.getScript('http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){

  //   // /* dropdown and filter select */
  //   var select = $('#select2').select2();

  //   // /* Select2 plugin as tagpicker */
  //   $("#tagPicker").select2({
  //     closeOnSelect:false
  //   });
  //    $("#tagPicker1").select2({
  //     closeOnSelect:false
  //   });

  // });
  $('#duns_number').keyup(function() {
    if (($('#duns_number').val().length == 9) && ok ){
      document.getElementById('dundun').style.display = 'none';
      if (!$(this).parents('.form-group').hasClass('has-error') && ok) {
        ok = false ;
        $("body").prepend("<div id=\"overlay\" class=\"overlay\"></div>");
        $(".overlay").css({
            "position": "absolute",
            "background-color": "rgba(221, 221, 221, 0.65)",
            "width": $(document).width(),
            "height": $(document).height(),
            "z-index": 99999,
        }).fadeTo(0, 0.8);
        document.getElementById('wait').style.display = 'block';
        $.ajax({
           type : "GET",
           url : landingGetInfoUrl,
           data :{ dun_number: $('#duns_number').val()},
           success: function(data) {
              ok = true;
              if (data.success == true){
                $("#signup-form").bootstrapValidator('resetForm', false);
                $('#business_name').val(data.result.business_name);
                $('#street1').val(data.result.street1);
                $('#street2').val(data.result.street2);
                $('#city').val(data.result.city);
                $('#state').val(data.result.state);
                $('#postal_code').val(data.result.postal_code);
                $('#country_code').val(data.result.country_code);
                $('#line_of_business').val(data.result.line_of_business);
              } else if (data.success == false) {
                // $('#duns_number')
                document.getElementById('dundun').style.display = 'block';
                if ($("#basic-info").length > 0) {
                  var error = $("#basic-info").find(".error-basic");
                  error.text("The duns number already exist in our system or does not exist at Dun & Bradstreet.");
                }
              } else {
                $("#signup-form").bootstrapValidator('resetForm', false);
                $("#business_name").removeAttr('disabled');
                $("#street1").removeAttr('disabled');
                $("#street2").removeAttr('disabled');
                $("#city").removeAttr('disabled');
                $("#state").removeAttr('disabled');
                $("#postal_code").removeAttr('disabled');
                $("#country_code").removeAttr('disabled');
                $("#line_of_business").removeAttr('disabled');
                $('#bussiness_industry').focus();
              }
              document.getElementById('wait').style.display = 'none';
              $("#overlay").remove();
            },
            error: function() {
            }
         });
      }
    }
  })

   $('#duns_number1').keyup(function() {
    if (($('#duns_number1').val().length == 9) && ok ){
      document.getElementById('dundun').style.display = 'none';
      if (!$(this).parents('.form-group').hasClass('has-error') && ok) {
        ok = false ;
        $("body").prepend("<div id=\"overlay\" class=\"overlay\"></div>");
        $(".overlay").css({
            "position": "absolute",
            "background-color": "rgba(221, 221, 221, 0.65)",
            "width": $(document).width(),
            "height": $(document).height(),
            "z-index": 99999,
        }).fadeTo(0, 0.8);
        document.getElementById('wait').style.display = 'block';
        $.ajax({
           type : "GET",
           url : landingGetInfoUrl,
           data :{ dun_number: $('#duns_number1').val()},
           success: function(data) {
              ok = true;
              if (data.success == true){
                $("#signup-form").bootstrapValidator('resetForm', false);
                $('#business_name1').val(data.result.business_name);
                $('#street11').val(data.result.street1);
                $('#street21').val(data.result.street2);
                $('#city1').val(data.result.city);
                $('#state1').val(data.result.state);
                $('#postal_code1').val(data.result.postal_code);
                $('#country_code1').val(data.result.country_code);
                $('#line_of_business1').val(data.result.line_of_business);
              } else if (data.success == false) {
                // $('#duns_number')
                document.getElementById('dundun1').style.display = 'block';
                if ($("#basic-info").length > 0) {
                  var error = $("#basic-info").find(".error-basic");
                  error.text($.i18n._('The duns number already exist in our system or does not exist at Dun & Bradstreet.'));
                }
              } else {
                $("#business_name1").removeAttr('disabled');
                $("#street11").removeAttr('disabled');
                $("#street21").removeAttr('disabled');
                $("#city1").removeAttr('disabled');
                $("#state1").removeAttr('disabled');
                $("#postal_code1").removeAttr('disabled');
                $("#country_code1").removeAttr('disabled');
                $("#line_of_business1").removeAttr('disabled');
                $('#bussiness_industry1').focus();
              }
              document.getElementById('wait').style.display = 'none';
              $("#overlay").remove();
            },
            error: function() {
            }
         });
      }
    }
  })
  $("#prefix, #postfix").change(function () {
        if ($("#prefix").is(":checked")) {
            $("#postfix_value").val("");
            document.getElementById('postfix_value').disabled = "disabled";
            document.getElementById('prefix_value').disabled = false;
        }
        else if ($("#postfix").is(":checked")) {
            $("#prefix_value").val("");
            document.getElementById('prefix_value').disabled = "disabled";
            document.getElementById('postfix_value').disabled = false;
        }
    });

function loading() {

  // create loading element
  var loadingElement = document.createElement('div');
  loadingElement.id = 'loading';
  loadingElement.className = 'loading';
  loadingElement.innerHTML = 'Loading...';

  // apply styles
  loadingElement.style.position = 'fixed';
  loadingElement.style.background = 'yellow';
  loadingElement.style.width = '130px';
  loadingElement.style.textAlign = 'center';
  loadingElement.style.zIndex = '10000';
  loadingElement.style.padding = '4px';
  loadingElement.style.border = 'grey solid 1px';
  loadingElement.style.display = 'none';

  // attach it to DOM
  $(this).append(loadingElement);

  // position element
  $("#loading").position({
      my: "center top",
      at: "center top",
      of: window
  });

  // every time ajax is called
  $(document).ajaxSend(function () {
      $(loadingElement).show();
  })

  // every time ajax is completed
    $(document).ajaxComplete(function () {
        self.setTimeout(function (){
            $(loadingElement).hide();
        }, 4000);
    });
  };
/*
  $('#tagPicker').multiselect({
    includeSelectAllOption: true,
    selectAllValue: 'select-all-value',
    buttonClass: 'form-control',
    buttonWidth: '100%',
    onChange: function(element, checked) {
      if ($('#tagPicker').val() == null){
        document.getElementById('checkLanguage').style.display = 'block';
      } else {
        document.getElementById('checkLanguage').style.display = 'none';
      }
    }
  });*/

  $('#login').on('hide.bs.modal', function(){
    $("#login-form").bootstrapValidator('resetForm', true);
    $(this).find('login-form').trigger('reset');
    $("#inputPassword").css("border-color", "#f1f4fa");
    $("#inputUserName").css("border-color", "#f1f4fa");
    document.getElementById('example').style.display = 'none';
  });

  $('#sendmail').on('hide.bs.modal', function(){
      $("#sendUser").bootstrapValidator('resetForm', true);
      $(this).find('#sendUser').trigger('reset');
  });

  $('#sendMailUser').on('hide.bs.modal', function(){
      $("#sendPass").bootstrapValidator('resetForm', true);
      $(this).find('#sendPass').trigger('reset');
      document.getElementById('checkUserEmail').style.display = 'none';
  });


  $('#signup').on('hide.bs.modal', function(){
    if (!App.hold) {
      $("#signup-form").bootstrapValidator('resetForm', true);
      $(this).find('#signup-form').trigger('reset');
    }
  });
  $('#signup').on('shown.bs.modal.bs.modal', function(){
      if (!App.hold) {
      $("#signup-form").bootstrapValidator('resetForm', true);
      $(this).find('#signup-form').trigger('reset');
    }
      $('input:visible:enabled:first', this).focus();
      $("#country").on("focus",function() {
        $(this).next(".dropdown-menu").toggle()
   });
  });

  // $('#profile').on('hide.bs.modal', function(){
  //   $("#profile_form").bootstrapValidator('resetForm', true);
  //   $(this).find('#profile_form').trigger('reset');
  // });
  var flag=false
  $("#login").on('shown.bs.modal', function () {
    $('#login-form').bootstrapValidator({
//        live: 'disabled',
        message: $.i18n._('Please enter required field(s).'),
        // feedbackIcons: {
        //     valid: 'glyphicon glyphicon-ok',
        //     invalid: 'glyphicon glyphicon-remove',
        //     validating: 'glyphicon glyphicon-refresh'
        // },
        fields: {
            'inputUserName': {
                validators: {
                    notEmpty: {
                      message: $.i18n._('Please enter required field(s).')
                    }
                }
            },
            'inputPassword': {
                validators: {
                    notEmpty: {
                      message: $.i18n._('Please enter required field(s).')
                    }

                }
            }
        }
    })
    .on('success.form.bv', function(e) {
        e.preventDefault();
        var $form     = $(e.target),
            validator = $form.data('bootstrapValidator');
        data = {
          utf8 : "✓",
          user :{
            username : $('#inputUserName').val(),
            password : $('#inputPassword').val(),
            remember_me : "0",
            layout_lang : $('#multi-languages').val() 
          },
          flag : flag
        }
        $.post($form.attr('action'), data, function(result) {
          if (result.success) {
            window.location.assign(location.origin);
          }
        }, 'json').fail(function(res){
          $("#inputPassword").css("border-color", "#dd4b39");
          $("#inputUserName").css("border-color", "#dd4b39");
          document.getElementById('example').style.display = 'block';
        });
    });
  });

  if(window.location.href.indexOf('#login') != -1) {
    $('#login').modal('show');
  }

  $('#multi-languages').on('change', function () {
    $(".form-control").change( function() {
      flag = true
    });
  });

    $("#resetPass").on('shown.bs.modal', function () {
    $('#resetPassForm').bootstrapValidator({
//        live: 'disabled',
        message: $.i18n._('Please enter required field(s).'),
        // feedbackIcons: {
        //     valid: 'glyphicon glyphicon-ok',
        //     invalid: 'glyphicon glyphicon-remove',
        //     validating: 'glyphicon glyphicon-refresh'
        // },
        fields: {
            'new_pass': {
                validators: {
                    notEmpty: {
                      message: $.i18n._('Please enter required field(s).')
                    }
                }
            },
            'confirm_pass': {
                validators: {
                    notEmpty: {
                      message: $.i18n._('Please enter required field(s).')
                    }

                }
            }
        }
    })
    .on('success.form.bv', function(e) {
        e.preventDefault();
        resetPass();
    });
  });


    $("#sendMailUser").on('shown.bs.modal', function () {
      $('form[data-toggle=validator]').bootstrapValidator()
      .on('success.form.bv', function(e) {
          e.preventDefault();
          sendPass();

      });
    })

    $("#sendmail").on('shown.bs.modal', function () {
      sendUser();
    })

    // $("#resetPass").on('shown.bs.modal', function () {
    //   $('form[data-toggle=validator]').bootstrapValidator()
    //   .on('success.form.bv', function(e) {
    //       e.preventDefault();
    //       resetPass()
    //   });
    // })



  if(window.location.href.indexOf('reset_password_token') != -1) {
    $('#resetPass').modal('show');
  }

  $(document).on('click', '[data-toggle=page]', function (e) {
        var _href = $(this).attr('href');
        if ($(_href).length > 0) {
            $('#content_main').children().hide();
            $('.page-content').hide();
            $(_href).fadeIn('fast');
            // $('.page-content').fadeOut(300, function(){
            //     $(_href).fadeIn('fast');
            // });
        }
        $.fn.mainLayout.setActiveLand(_href);
  });
  $(document).on('hidden.bs.modal', '.modal', function () {
      $('.modal:visible').length && $(document.body).addClass('modal-open');
  });

function checkParty(){
  document.getElementById('checkPartyName').style.display = 'none';
  document.getElementById('checkUserName').style.display = 'none';
  document.getElementById('checkEmail').style.display = 'none';
  data = {
    duns_number : $('#duns_number').val(),
    party_name : $('#party_name').val(),
    business_name : $('#business_name').val(),
    street1 : $('#street1').val(),
    street2 : $('#street2').val(),
    city : $('#city').val(),
    state : $('#state').val(),
    country : $('#country').val(),
    type : $('#type').val(),
    postal_code : $('#postal_code').val(),
    country_code : $('#country_code').val(),
    line_of_business : $('#line_of_business').val(),
    type : $('#type').val(),
    subscriber_level : $('#subscriber_level').val(),
    payment_method : $('#payment_method').val(),
    currency : $('#currency').val(),
    first_name : $('#first_name').val(),
    last_name : $('#last_name').val(),
    email : $('#email').val(),
    user_name : $('#user_name').val(),
    password : $('#password').val(),
    passwordConfirm : $('#passwordConfirm').val(),
  }
  App.partyParams = data
  $.ajax({
     type : "POST",
     url : checkPartyUrl,
     data : data,
     success: function(data) {
        if (data.success == true){
          App.hold = true
          $('#signup').modal('hide');
            $('.modal-backdrop').remove();
            if ($('#type').val() == "Ambassador"){
              $('#subscriber').modal({
                  backdrop: 'static',
                  keyboard: false  // to prevent closing with Esc button (if you want this too)
                });
            } else {
              $('#profile').modal({
                  backdrop: 'static',
                  keyboard: false  // to prevent closing with Esc button (if you want this too)
                });
            }

          }else if (data.invalid == "all"){
            document.getElementById('checkPartyName').style.display = 'block';
            document.getElementById('checkUserName').style.display = 'block';
            document.getElementById('checkEmail').style.display = 'block';
          } else if (data.invalid == "party"){
            document.getElementById('checkPartyName').style.display = 'block';
          } else if (data.invalid == "user"){
            document.getElementById('checkUserName').style.display = 'block';
          } else {
             document.getElementById('checkEmail').style.display = 'block';
          }

      },
      error: function() {
      }
   });

}

function checkParty1(){
  document.getElementById('checkPartyName1').style.display = 'none';
  document.getElementById('checkUserName1').style.display = 'none';
  document.getElementById('checkEmail1').style.display = 'none';
  data = {
    duns_number1 : $('#duns_number1').val(),
    party_name1 : $('#party_name1').val(),
    business_name1 : $('#business_name1').val(),
    street11 : $('#street11').val(),
    street21 : $('#street21').val(),
    city1 : $('#city1').val(),
    state1 : $('#state1').val(),
    country1 : $('#country1').val(),
    type1 : $('#type1').val(),
    postal_code1 : $('#postal_code1').val(),
    country_code1 : $('#country_code1').val(),
    line_of_business1 : $('#line_of_business1').val(),
    type1 : $('#type1').val(),
    subscriber_level1 : $('#subscriber_level1').val(),
    payment_method1 : $('#payment_method1').val(),
    currency1 : $('#currency1').val(),
    first_name1 : $('#first_name1').val(),
    last_name1 : $('#last_name1').val(),
    email1 : $('#email1').val(),
    user_name1 : $('#user_name1').val(),
    password1 : $('#password1').val(),
    passwordConfirm1 : $('#passwordConfirm1').val(),
  }
  App.partyParams1 = data
  data =  jQuery.extend(App.partyParams, data);

  $.ajax({
     type : "POST",
     url : checkParty1Url,
     data : data,
     success: function(data) {
          if (App.partyParams.business_name == App.partyParams1.business_name1){
            document.getElementById('checkPartyName1').style.display = 'block';
          } else if (App.partyParams.user_name == App.partyParams1.user_name1){
            document.getElementById('checkUserName1').style.display = 'block';
          } else if (App.partyParams.email == App.partyParams1.email1){
             document.getElementById('checkEmail1').style.display = 'block';
          } else if (data.invalid == "all"){
            document.getElementById('checkPartyName1').style.display = 'block';
            document.getElementById('checkUserName1').style.display = 'block';
            document.getElementById('checkEmail1').style.display = 'block';
          } else if (data.invalid == "party"){
            document.getElementById('checkPartyName1').style.display = 'block';
          } else if (data.invalid == "user"){
            document.getElementById('checkUserName1').style.display = 'block';
          } else if (data.invalid == "email"){
             document.getElementById('checkEmail1').style.display = 'block';
          } else if (data.success == true){
            App.hold = true
            $('#subscriber').modal('hide');
              $('.modal-backdrop').remove();
              window.location.assign(location.origin);
          }

      },
      error: function() {

      }
   });

}



// function createProfile(){
//   $(this).on('submit',function(e){
//     debugger
//   e.preventDefault();
//   $('#profile_form')
//   .bootstrapValidator()
//   .on('success.form.bv', function(e) {
    
//   if ($('#tagPicker').val() == null)
//   {
//     document.getElementById('checkLanguage').style.display = 'block';
//     $('#profile_form').on('success.field.bv', function(e, data) {
//       data.bv.disableSubmitButtons(false);
//     })
//   } else {
//     data = {
//       type_profile : $('#type_profile').val(),
//       profile_name : $('#profile_name').val(),
//       country_profile : $('#country_profile').val(),
//       language_profile : $('#tagPicker').val(),
//       file_format : $('#file_format input:radio:checked').val(),
//       pack : $('#pack').val(),
//       character_set_profile : $('#character_set_profile').val(),
//       hierachy : $('#hierachy').val(),
//       prefix : $('#prefix_value').val(),
//       postfix: $('#postfix_value').val(),
//       ftp_url : $('#ftp_url').val(),
//       ftp_login : $('#ftp_login').val(),
//       ftp_password : $('#ftp_password').val()

//     }
//     data =  jQuery.extend(App.partyParams, data);
//     debugger
//     $.ajax({
//        type : "POST",
//        url : createPartyUrl,
//        data : data,
//        success: function(data) {
//            $('#profile').modal('hide');
//            $('.modal-backdrop').remove();
//            location.reload();
//         },
//         error: function() {
//         }
//      });
//   }
//   })
//   })
// }

  function sendPass(){
    data = {
      user : {
        email : $('#email_resetpass').val(),
        user_name : $('#inputName').val()
      },
      pass : true,
      check: false
    }
     $.ajax({
       type : "POST",
       url : sendEmailUrl,
       data : data,
       success: function(data) {
          if (data.success == true){
            $('#sendMailUser').modal('hide');
            $('.modal-backdrop').remove();
            $('#checkEmaildiv').modal();
          } else {
            document.getElementById('checkUserEmail').style.display = 'block'
          }
        },
        error: function() {

        }
     });
  }

  function sendUser(){
    $('#sendUser').bootstrapValidator({
        fields: {
            email: {
              validators: {
                remote: {
                  message: $.i18n._('Please enter a valid email in Product Data Lake'),
                  url: sendEmailUrl,
                  type: 'post',
                  data: function(validator) {
                      return {
                        user:  {
                          email: validator.getFieldElements('email').val()
                        },
                        pass: false,
                        check: true
                      }
                  }
                }
              }
            }
        }
    })
    .on('success.form.bv', function(e) {
        e.preventDefault();
        var $form     = $(e.target),
            validator = $form.data('bootstrapValidator');
        data= {
                  user:  {
                    email: validator.getFieldElements('email').val()
                  },
                  pass: false,
                  check: false
              }
        $.ajax({
           type : "POST",
           url : sendEmailUrl,
           data : data,
           success: function(data) {
              if (data.success == true){
                $('#sendmail').modal('hide');
                $('.modal-backdrop').remove();
                $('#checkEmaildiv').modal();
              }
            },
            error: function() {
            }
         });
    });

  }

  function resetPass(){
    var res = document.URL.split("=")
     $('#resetPass').modal('hide');
            $('.modal-backdrop').remove();

    data = {
      user : {
        reset_password_token : res[1],
        password : $('#new_pass').val(),
        password_confirmation : $('#confirm_pass').val(),
        commit : $.i18n._("Change my password")
      }
    }
    $.ajax({
       type : "PUT",
       url : sendEmailUrl,
       data : data,
       success: function(data) {
          $('#changePassOk').modal('show');
          setTimeout(function() {
            window.location.assign(location.origin);
          },2000);
        },
        error: function() {
        }
     });

  }

  /*$('#signup-form')
  .bootstrapValidator()
  .on('error.form.bv', function(e) {
        var $form     = $(e.target),
        validator = $form.data('bootstrapValidator');
        validator.disableSubmitButtons(false);
  })
  .on('success.form.bv', function(e) {
        e.preventDefault();
        var $form     = $(e.target),
        validator = $form.data('bootstrapValidator');
        validator.disableSubmitButtons(false);
        checkParty();
    });
  $('#signup-form1')
  .bootstrapValidator()
  .on('error.form.bv', function(e) {
        var $form     = $(e.target),
        validator = $form.data('bootstrapValidator');
        validator.disableSubmitButtons(false);
  })
  .on('success.form.bv', function(e) {
        e.preventDefault();
        var $form     = $(e.target),
        validator = $form.data('bootstrapValidator');
        validator.disableSubmitButtons(false);
        checkParty1();
    });
  */
  

});



function showForGot(){
   $('#login').modal('hide');
   $('.modal-backdrop').remove();
   $('#forgot').modal();
}

function createProfile(){
  $('#profile_form')
  .bootstrapValidator()
  .on('success.form.bv', function(e) {
    
  if ($('#tagPicker').val() == null)
  {
    document.getElementById('checkLanguage').style.display = 'block';
    $('#profile_form').on('success.field.bv', function(e, data) {
      data.bv.disableSubmitButtons(false);
    })
  } else {
    data = {
      type_profile : $('#type_profile').val(),
      profile_name : $('#profile_name').val(),
      country_profile : $('#country_profile').val(),
      language_profile : $('#tagPicker').val(),
      file_format : $('#file_format input:radio:checked').val(),
      pack : $('#pack').val(),
      character_set_profile : $('#character_set_profile').val(),
      hierachy : $('#hierachy').val(),
      prefix : $('#prefix_value').val(),
      postfix: $('#postfix_value').val(),
      ftp_url : $('#ftp_url').val(),
      ftp_login : $('#ftp_login').val(),
      ftp_password : $('#ftp_password').val()

    }
    data =  jQuery.extend(App.partyParams, data);
    $.ajax({
       type : "POST",
       url : createPartyUrl,
       data : data,
       success: function(data) {
           $('#profile').modal('hide');
           $('.modal-backdrop').remove();
           window.location.assign(location.origin);
        },
        error: function() {
        }
     });
  }
  })
}
function createParty(){
  $.ajax({
     type : "POST",
     url : createPartyOnlyUrl,
     data : App.partyParams,
     success: function(data) {
        $('#profile').hide();
        $('.modal-backdrop').remove();
        window.location.assign(location.origin);
      },
      error: function() {

      }
   });
}

function showForGotemail(selected){
  $('#forgot').modal('hide');
  $('.modal-backdrop').remove();
  if (selected == "option1"){
    $('#sendmail').modal();
  } else {
    $('#sendMailUser').modal();
  }
}
function back(){
  $('#profile').hide();
  $('.modal-backdrop').remove();
  $('#signup').modal();
  $('#signup-form').on('success.field.bv', function(e, data) {
    data.bv.disableSubmitButtons(false);
  })

}

function changeFunc(){
  var selectBox = document.getElementById("pack");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if (selectedValue == "Compress"){
    document.getElementById('div_compress_password').style.display = 'block';
  } else {
    document.getElementById('div_compress_password').style.display = 'none';
  }
}

function changeHierarchy(){
  var selectBox = document.getElementById("hierachy");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if (selectedValue == "SKU enforced"){
    document.getElementById('sku_format').style.display = 'block';
  } else {
    document.getElementById('sku_format').style.display = 'none';
  }
}

function changeType(){
  var selectBox = document.getElementById("type");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if (selectedValue == "Ambassador"){
    document.getElementById('subscriber_level_div').style.display = 'none';
  } else {
    document.getElementById('subscriber_level_div').style.display = 'block';
  }
}

function agree(){
  debugger
}

function changeLanguage(){
  var selectBox = document.getElementById("tagPicker");
  //var selectedValue = selectBox.options[selectBox.selectedIndex].value;

  var selectedOptions = selectBox.selectedOptions;
  var len = selectedOptions.length;

  for (i=0;i<len;i++){
    if (selectedOptions[i].value === 'All') {
      //selectBox.removeAttr("selected");

      selectBox.prop("selected","selected");
    }
  }

}
function showReason(){
  $('#reason-of-being').slideToggle(450);
  $('#reason-of-being-icon i.lnr').toggleClass("lnr-plus-circle lnr-circle-minus");
}
function showWhat(){
  $('#what-is-this').slideToggle(450);
  $('#what-is-this-icon i.lnr').toggleClass("lnr-plus-circle lnr-circle-minus");
}
function showHowIt(){
  $('#how-it-work').slideToggle(450);
  $('#how-it-work-icon i.lnr').toggleClass("lnr-plus-circle lnr-circle-minus");
}
function showHowMuch(){
  $('#how-much').slideToggle(450);
  $('#how-much-icon i.lnr').toggleClass("lnr-plus-circle lnr-circle-minus");
}
function showHowAbout(){
  $('#how-about-you').slideToggle(450);
  $('#how-about-you-icon i.lnr').toggleClass("lnr-plus-circle lnr-circle-minus");
}






