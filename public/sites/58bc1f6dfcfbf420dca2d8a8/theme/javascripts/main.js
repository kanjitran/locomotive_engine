var old_state;

$.fn.utils = (function(){
  return {
    mask: function(id){
      //TODO mask specific dom element when loading
      $('#'+ id).waitMe({
        effect: 'ios',
        text: 'Please wait...',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: '',
        source : ''
      });
    },
    unmask: function(id) {
      $('#' + id).waitMe('hide');
    },
    getTaskProcessing: function (info) {
        var self = this, info = info;
        $.getJSON(info.url,
            {
            }
        ).always(function(res) {
            if(res.export_status != "ok"){// processing
                window.setTimeout(function(){self.getTaskProcessing(info)}, 3000);
            } else if(res.export_status == "ok"){ //complete
                $(info.dom).trigger("completed", status);
                return;
            } else {
                $(info.dom).trigger("error", status);
            }
        })
    }
  };
}());

$.fn.inlineEdit = function(replaceWith) {
    if(!replaceWith) replaceWith = $('<input style="color:black !important;width:100%;" name="temp" type="text" />').val($(this).text());
    var connectWith = $('input[name="hiddenField"]');
    // $(this).hover(function() {
    //     $(this).addClass('hover');
    // }, function() {
    //     $(this).removeClass('hover');
    // });
    $(this).click(function() {
        var elem = $(this);
        elem.hide();
        elem.after(replaceWith);
        replaceWith.focus();
        replaceWith.blur(function() {
            if ($(this).val() != "") {
                connectWith.val($(this).val()).change();
                elem.text($(this).val());
            }
            $(this).remove();
            elem.show();
        });
        replaceWith.keypress(function(e) {
            if(e.which == 13) {
                if ($(this).val() != "") {
                    connectWith.val($(this).val()).change();
                    elem.text($(this).val());
                }
                $(this).remove();
            elem.show();
            }
        });
    });
};

$.i18n.load(App.messages); //load language dictionary

$.fn.mainLayout = (function () {
    var sideBarLists, topNavLists;
    var createSideBarLists = function (elementInfosArray) {
        var lists = [];
        $.each(elementInfosArray, function(i, v) {
            var li = $('<li>').append($('<a>').attr('href', v[1])
                              .text(v[0]));
            if (v[3]) {
                li.find('a').prepend($('<i>').addClass(' ' + v[3] + ' '));
            }
            if (v[4]) {
                li.find('a').attr('data-toggle', v[4].toggle);
            }
            if (v[5]) {
                li.addClass(v['5']);
            }
            if(v[2]){ //have child menu
                // li.children().append($('<span class="fa arrow">'))
                var cul = $('<ul class="nav nav-second-level">');
                $.each(v[2], function(i, v) {
                    var li2 = $('<li>').append($('<a>').attr('href', v[1])
                                       .text(v[0]).prepend($('<i>').addClass(' ' + v[3] + ' ')));
                    if(v[4]) { li2.find('>a').addClass(v[4]); }
                    cul.append(li2);
                });
                li.append(cul);
            }
            lists.push(li);
        });
        return lists;
    };
    var createTopNavLits = function (elementInfosArray) {
        var lists = [];
        $.each(elementInfosArray, function(i, v) {
            var li = $('<li >');
            var style = "";
            if (v[1] === "#login") {
              style = 'style="color:white; padding: 0px"';
            }

            var a1 = $('<a data-toggle="dropdown" href="'+v[1]+'" ' + style + '>').html(v[0])
                        .prepend('<i class="'+v[2]+'">');
            // image if exist
            if (v[4]) { a1.prepend('<img width="60px" src="'+v[4]+'" >') }
            // extra child html
            if (v[5]) { a1.append(v[5]) }
            if (v[6]) {
                a1.attr('data-toggle', v[6].toggle);
                a1.attr('data-href', v[6].href);
                a1.attr('data-display', v[6].display);
            }
            li.append(a1);
            // sub-menu level2
            if (v[3] && v[3].length > 0) {
                var ul = $('<ul>').addClass('dropdown-menu pdl-dropdown');
                $.each(v[3], function (idx, cv) {
                    var a2 = $('<a>').text(cv[0])
                                     .attr('href', cv[1])
                                     .prepend($('<i>')
                                     .addClass('pico ' + cv[2] + ' '));
                    if (cv[3]) {
                        a2.attr('data-method', cv[3].method);
                        a2.attr('data-toggle', cv[3].toggle);
                    }
                    var cli = $('<li>').append(a2);
                    ul.append(cli);
                    if ((idx+1) != v[3].length) {ul.append('<li class="divider"></li>');}
                });
                li.append(ul);
            }
            lists.push(li);
        });
        return lists;
    };
    return {
        render: function () {
            var sideBarInfosAarray = [
                [$.i18n._('Home Screen')      ,'/'          , false, 'lnr lnr-home'],
                [$.i18n._('Manage Data Exchange') ,
                    ' ',
                    [
                        [$.i18n._('Load Data')       ,'/data_files', false, 'lnr lnr-upload'],
                        [$.i18n._('Log Viewer')       ,'/log_viewers', false, 'fa fa-file-text-o'],
                        [$.i18n._('Manage Pull Request')       ,'/manage_pull_requests', false, 'lnr lnr-film-play']
                    ],
                     'fa fa-cog', false],
                [$.i18n._('Manage Partnership') ,
                    ' ',
                    [
                        [$.i18n._('Current Partnership')  , '/current_partners'   , false, 'pico pico-user_icon'],
                        [$.i18n._('Current Requests')     , '/current_requests'      , false, 'pico pico-current_request_icon'],
                        [$.i18n._('Find Partners')        , '/find_partners'          , false, 'pico pico-find_partner_icon'],
                    ],
                     'pico pico-partner', false],
                [$.i18n._('Manage Product')  ,'/products'  , false, 'pico pico-product'],
                [$.i18n._('Manage Attribute'),'/attributes', false, 'pico pico-attribute'],
                [$.i18n._('Manage Digital Asset'),'/digital_assets', false, 'fa fa-picture-o'],
                [$.i18n._('Manage My Party') ,
                    ' ',
                    [
                        
                        [$.i18n._('Party Settings')    , '#party-settings', false, 'fa fa-cog', 'open-modal'],
                        [$.i18n._('Basic Info')        , '#basic-info'    , false, 'pico pico-basic-info', 'open-modal'],
                        [$.i18n._('Users')             , '/users'   , false, 'pico pico-users'],
                        [$.i18n._('Profiles')           , '/profiles'      , false, 'pico pico-profile'],
                        [$.i18n._('FTP Domain')        , '/ftps'          , false, 'pico pico-ftp'],
                        [$.i18n._('Subscription Level'), '/subscriptions/subscriber' , false, 'pico pico-subs'],
                        [$.i18n._('Goal')              , '/goal' , false, 'fa fa-bullseye fa-lg' ],
                        [$.i18n._('Attribute Settings'), '#attribute-settings', false, 'pico pico-att', 'open-modal'],
                        [$.i18n._('Payment')           , '#payment-modal', false, 'pico pico-payment', 'open-modal']
                    ],

                    'pico pico-party open-list' , false
                ],
                [$.i18n._('Synonym'),'/synonym', false, 'pico pico-synonym'],
            ];

            var pdlAdminViewPartysideBar = [

                [$.i18n._('Home Screen')      ,'/' + '?party=' + App.party_id, false, 'lnr lnr-home'],
                [$.i18n._('Manage Data Exchange') ,
                    ' ',
                    [
                        [$.i18n._('Load Data')       ,'/data_files' + '?party=' + App.party_id, false, 'lnr lnr-upload'],
                        [$.i18n._('Log Viewer')       ,'/log_viewers'+ '?party=' + App.party_id, false, 'fa fa-file-text-o'],
                        [$.i18n._('Manage Pull Request')       ,'/manage_pull_requests' + '?party=' + App.party_id, false, 'lnr lnr-film-play']
                    ],
                    'fa fa-cog', false],
                [$.i18n._('Manage Partnership') ,
                    ' ',
                    [
                        [$.i18n._('Current Partnership')  , '/current_partners'+ '?party=' + App.party_id   , false, 'pico pico-user_icon'],
                        [$.i18n._('Current Requests')     , '/current_requests'+ '?party=' + App.party_id      , false, 'pico pico-current_request_icon'],
                        [$.i18n._('Find Partners')        , '/find_partners'+ '?party=' + App.party_id          , false, 'pico pico-find_partner_icon'],
                    ],
                    'pico pico-partner', false],
                [$.i18n._('Manage Product')  ,'/products'+ '?party=' + App.party_id  , false, 'pico pico-product'],
                [$.i18n._('Manage Attribute'),'/attributes'+ '?party=' + App.party_id, false, 'pico pico-attribute'],
                [$.i18n._('Manage Digital Asset'),'/digital_assets'+ '?party=' + App.party_id, false, 'fa fa-picture-o'],
                [$.i18n._('Manage My Party') ,
                    ' ',
                    [
                        
                        [$.i18n._('Party Settings')    , '#party-settings', false, 'fa fa-cog', 'open-modal'],
                        [$.i18n._('Basic Info')        , '#basic-info', false, 'pico pico-basic-info', 'open-modal'],
                        [$.i18n._('Users')             , '/users'+ '?party=' + App.party_id   , false, 'pico pico-users'],
                        [$.i18n._('Profiles')           , '/profiles'+ '?party=' + App.party_id      , false, 'pico pico-profile'],
                        [$.i18n._('FTP Domain')        , '/ftps'+ '?party=' + App.party_id          , false, 'pico pico-ftp'],
                        [$.i18n._('Subscription Level'), '/subscriptions/subscriber'+ '?party=' + App.party_id , false, 'pico pico-subs'],
                        [$.i18n._('Attribute Settings'), '#attribute-settings', false, 'pico pico-att', 'open-modal'],
                        [$.i18n._('Payment')           , '#payment-modal', false, 'pico pico-payment', 'open-modal']
                    ],

                    'pico pico-party open-list' , false
                ]

            ];

            var pdlSideBarInfosAarray = [
                [$.i18n._('Home Screen')      ,'/'          , false, 'lnr lnr-home'],
                [$.i18n._('Manage Country')       ,'/manage_country', false, 'pico-country'],
                [$.i18n._('Manage Language')       ,'/manage_language', false, 'pico pico-language'],
                [$.i18n._('Manage Party')       ,'/parties/manage_parties', false, 'pico pico-party'],
                [$.i18n._('Manage Payment')       ,'/payments', false, 'pico pico-payment'],
                [$.i18n._('Manage Subscription Level')       ,'/subscriptions', false, 'pico pico-subs'],
                [$.i18n._('Transformation')       ,'/transformation', false, 'pico pico-transformation'],
                [$.i18n._('Manage User')       ,'/users/manage_users', false, 'pico pico-users']
            ];

            var amsdorSideBarInfosAarray = [
                [$.i18n._('Home Screen')      ,'/'          , false, 'lnr lnr-home'],
                [$.i18n._('Manage My Party') ,
                    ' ',
                    [
                        [$.i18n._('Basic Info')        , '#basic-info'    , false, 'pico pico-basic-info', 'open-modal'],
                        [$.i18n._('Users')             , '/users'   , false, 'pico pico-users'],
                        [$.i18n._('Payment')           , '#payment-modal'       , false, 'pico pico-payment', 'open-modal']
                    ],
                    'pico pico-party' , false, ''
                ],
                [$.i18n._('Manage Ambassadorship') ,'/manage_ambassadorship', false,  'pico pico-partner']
            ];

            var pdlAdminViewamsdorSideBar = [
                [$.i18n._('Home Screen')      , '/?party=' + App.party_id, false, 'lnr lnr-home'],
                [$.i18n._('Manage My Party') ,
                    ' ',
                    [
                        [$.i18n._('Basic Info')        , '#basic-info'    , false, 'pico pico-basic-info', 'open-modal'],
                        [$.i18n._('Users')             , '/users' + '/?party=' + App.party_id, false, 'pico pico-users'],
                        [$.i18n._('Payment')           , '#payment-modal', false, 'pico pico-payment', 'open-modal']
                    ],
                    'pico pico-party' , false, ''
                ],
                [$.i18n._('Manage Ambassadorship') ,'/manage_ambassadorship' + '/?party=' + App.party_id, false,  'pico pico-partner']
            ];

            if (typeof App.landing !== 'undefined' && App.landing) {
                // sideBarInfosAarray = [
                //     [$.i18n._('Reason of being'),'#reason-of-being', false, false, {toggle: 'page'}],
                //     [$.i18n._('What is it?')    ,'#what-is-this', false, false, {toggle: 'page'}],
                //     [$.i18n._('How it works')   ,'#how-it-work', false, false, {toggle: 'page'}],
                //     [$.i18n._('How much')       ,'#how-much', false, false, {toggle: 'page'}],
                //     [$.i18n._('How about you?') ,'#how-about-you', false, false, {toggle: 'page'}],
                //     [$.i18n._('News')           ,'#news', false, false, {toggle: 'page'}]
                // ];
                // sideBarLists = createSideBarLists(sideBarInfosAarray);
            } else {

                var avatar = '/sites/58bc1f6dfcfbf420dca2d8a8/theme/images/img/no-avatar.png?22a2b3f74796b07454bb7fff514931d0';
                var partyName = '';
                // if (App.User.role !== 'Pdl Admin') {
                if (App.Party) {
                  if (App.Party.logo ) {
                    avatar = App.Party.logo;
                  }
                  partyName =  $.i18n._(' at ')  + App.Party.name;
                }
              topNavInfosAarray = [
                    ['', '#', 'pico pico-bell notify'],
                    [ '<span>' +App.User.first_name + ' ' + App.User.last_name + '<i>' + partyName + '</i></span>',
                        '#', '',
                        [ //App.User.username
                            [$.i18n._('About')   ,'#about', 'pico-user', {toggle: 'modal'} ],
                            [$.i18n._('Sign Out'),'/users/sign_out', 'pico-exit', {method: 'delete'}]
                        ],
                        /* temp img, need replace by code*/
                        avatar , false, {display: 'account_name'}
                    ],
                    [
                        '','#','',[ //App.User.username
                            [$.i18n._('About')   ,'#about', 'pico-user', {toggle: 'modal'} ],
                            [$.i18n._('Sign Out'),'/users/sign_out', 'pico-exit', {method: 'delete'}]
                        ]
                    ]
                ];
            }
            if (typeof App.landing !== 'undefined' && App.landing) {
                topNavInfosAarray = [
                    [$.i18n._('Log In'), '#login', false, false, false, false, {toggle:'modal',href:''}]
                ];
            }

            if(!sideBarLists &&  App.User !== null){
                var role = App.User.role;
                if(role == 'Subscriber User'){
                    sideBarInfosAarray.splice(2,1);
                    sideBarInfosAarray.splice(5,1);
                }
                if(role == 'Pdl Admin' && App.party_id == null) sideBarLists = createSideBarLists(pdlSideBarInfosAarray);
                else if(role == 'Pdl Admin' && App.party_id){
                    if(App.Party.subscriber == 'Ambassador'){
                        sideBarLists = createSideBarLists(pdlAdminViewamsdorSideBar);
                    } else {
                        sideBarLists = createSideBarLists(pdlAdminViewPartysideBar);
                    }
                }
                else if(role == 'Subscriber Admin' || role =='Subscriber User') sideBarLists = createSideBarLists(sideBarInfosAarray);
                else if(role == 'Ambassador Admin' || role == 'Ambassador User') sideBarLists = createSideBarLists(amsdorSideBarInfosAarray);
            }

            if(!topNavLists) topNavLists = createTopNavLits(topNavInfosAarray);
            $('#top-nav').append(topNavLists);
            $('#side-menu').append(sideBarLists);
            // if ( App.User !== null
            //     && typeof App.User.role != 'undefined'
            //     && App.User.role.toLowerCase() == 'subscriber admin') {
            //     $('#side-menu li').removeClass('sr-only');
            // }

            // set notification
            if (typeof App.User != 'undefined') {
                this.setNotify();
            }

            // // re-init height
            // topOffset = 75;
            // height = ((window.window.innerHeight > 0) ? window.window.innerHeight : window.screen.height) - 1;
            // height = height - topOffset;
            // if (height < 1) height = 1;
            // if (height > topOffset) {
            //     $("#page-wrapper").css("min-height", (height) + "px");
            // }
        },
        setTitle: function(title) {
            document.title = $.i18n._(title);
        },
        setActive: function() {
            $('#side-menu a').each(function(index, elem) {
                if (document.location.pathname === $(elem).attr('href')) {
                    $('#side-menu li').removeClass('active');
                    $(elem).parent('li').addClass('active');
                    if ($(elem).parent('li').parents('li').length > 0) {
                        $(elem).parent('li').parents('li').addClass('active');
                    }
                }else if ($(elem).attr('href').indexOf(document.location.pathname) != -1 && document.location.pathname != '/'){
                              $('#side-menu li').removeClass('active');
                    $(elem).parent('li').addClass('active');
                    if ($(elem).parent('li').parents('li').length > 0) {
                        $(elem).parent('li').parents('li').addClass('active');
                    }
                }else if (document.location.pathname == '/' && $(elem).attr('href').split('/?party')[0] == ''){
                        $('#side-menu li').removeClass('active');
                        $(elem).parent('li').addClass('active');
                        return false;
                }

            });
        },
        setActiveLand: function(_href) {
            $('#side-menu a').each(function(index, elem) {
                if (_href === $(elem).attr('href')) {
                    $('#side-menu li').removeClass('active');
                    $(elem).parent('li').addClass('active');
                    if ($(elem).parent('li').parents('li').length > 0) {
                        $(elem).parent('li').parents('li').addClass('active');
                    }
                }
            });
        },
        setNotify: function() {
            var a_notify = $(".notify").parent();
            var li_notify = $(".notify").parents('li');
            $.get('/notifications').done(function(res) {
                if (res.count > 0) {
                    a_notify.append('<span class="label label-danger label-notify">'+res.count+'</span>');
                    var notify_panel= '<div class="dropdown-menu dropdown-notify pdl-dropdown"><ul>';
                    notify_panel += '<li class="notify-mark-all-read">\
                            <a class="text-center" href="#">\
                                <span>Mark all as read</span>\
                            </a>\
                        </li>\
                        <li class="divider"></li>';
                    for (var i in res.rows) {
                        notify_panel += '<li data-toggle="read-notify" data-id="' + res.rows[i]._id + '" data-redirect="'+res.rows[i].redirect+'">\
                                    <a href="#">\
                                        <div>' + res.rows[i].message + '</div>\
                                        <div>\
                                            <strong></strong>\
                                            <span class="text-muted">\
                                                <em>' + moment(res.rows[i].event_time).format("MMM Do [at] hh:mma") + '</em>\
                                            </span>\
                                        </div>\
                                    </a>\
                                </li>\
                                <li class="divider"></li>';
                    }
                    notify_panel += '</ul></div>';
                    li_notify.append(notify_panel);
                }
            });

            $(document).on('click', '[data-toggle=read-notify]', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var _id = $(this).data('id');
                var _this = $(this);
                var _redirect = _this.data('redirect');
                $.ajax({
                    url: "/notifications/" + _id,
                    method: "PUT"
                }).done(function(res){
                    // update norifications
                    _this.next().fadeOut().remove();
                    _this.fadeOut().remove();
                    if (res.count != 0) {
                        a_notify.find('.label-notify').text(res.count);
                    } else {
                        a_notify.find('.label-notify').remove();
                        $(".notify-mark-all-read").addClass('all-read').find('span').text($.i18n._("Notification – All up to date."));
                    }
                    if (_redirect !== '#') {
                        window.location.href = _redirect;
                    }
                });
            });

            $(document).on('click', '.notify-mark-all-read', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var _this = $(this);
                $.ajax({
                    url: "/notifications/all_read",
                    method: "PUT"
                }).done(function(res){
                    // update norifications
                    $('[data-toggle=read-notify]').next().fadeOut().remove();
                    $('[data-toggle=read-notify]').fadeOut().remove();
                    a_notify.find('.label-notify').remove();
                    $(".notify-mark-all-read").addClass('all-read').find('span').text($.i18n._("Notification – All up to date."));
                });
            });
        },
        positionFooter: function() {
            var footerHeight = 0,
            footerTop = 0,
            sidebarHeight = 0,
            containerHeight = 0,
            $footer = $(".footer"),
            $container = $(".sidebar-blue"),
            $sidebar = $("#side-menu");
            containerHeight = $container.height();
            sidebarHeight = $sidebar.height();
            footerHeight = $footer.outerHeight() + 30;
            var static = (containerHeight - sidebarHeight) <= footerHeight;

            if (static) {
                $footer.css('position', 'static').css('margin-top', '15px');
            } else {
                $footer.css('position', 'absolute').css('bottom', '30px');
            }
        },
        underConstruction: function () {
            var modal = $('<div class="modal-dialog">');
            var body = $('<div class="modal-body">');
            var confirmMsg = $.i18n._("Feature is under construction.");
            body.append($('<div class="wrapper text-center">').text(confirmMsg)).append(
                '<div class="text-center"><button class="btn btn-default custom-button-margin" data-dismiss="modal">'+$.i18n._('OK')+'</button></div>'
                );
            var content = $('<div class="modal-content">').append([
            $('<div class="modal-header">').append([
                '<button type="button" class="close" data-dismiss="modal">&times;</button>',
                '<h2 class="modal-title modal-header-bg" style="text-align:center;">&#160;</h4>'
              ]),
              body
            ]);
            modal.append(content);
            var underConstruction = $('<div id="under-construction" class="modal fade" role="dialog">').append(modal);
            $('#page-wrapper').append(underConstruction);
        },
        underContructionGlobal: function () {
            body.append(`<div class="wrapper text-center"><p> Feature is under construction.  </p></div>>`)
        }
    };
}());


// begin actions
$(function () {
    $('.open-modal').on('click', function(e){
        e.preventDefault();
        var _link = $(this).attr('href');
        if (_link) {
            console.log(_link);
            _link = _link.substr(_link.indexOf('#'), _link.length);
            if(_link) {
                old_state = $('.nav-second-level li.active');
                old_state.removeClass('active');
                $('a[href="'+_link+'"]').parent().addClass('active');
                $(_link).modal('show');
            }
        }
    });

     // append Basic Info modal
    if ($('#basic-info').length > 0) {
        // event on show
        // load data from API
        // @api: parties/:id
        $(document).on('show.bs.modal', "#basic-info", function(e) {
          _this = $(this);
            // call to API
            $.get('/parties/' + App.party_id).done(function(response) {
                // if good
                if (response.success) {
                  // load data to modal
                  // create countries select
                  countriesDom = _this.find('[name=country]');
                  countriesDom.empty();
                  $.each(response.countries, function(key, value) {
                    opt = $('<option>').text(value[0]).attr('value', value[1]);
                    if (value[1] === response.data.country) {
                      opt.attr('selected', true);
                    }
                    countriesDom.append(opt);
                  });

                  // create type select
                  typesDom = _this.find('[name=subscriber]');
                  typesDom.empty();
                  $.each(response.subscribers, function(key, value) {
                    opt = $('<option>').text(value).attr('value', value);
                    if (value === response.data.subscriber) {
                      opt.attr('selected', true);
                    }
                    typesDom.append(opt);
                  });

                  // load data
                  $.each(response.data, function(key, value) {
                    _this.find('[name=' + key + ']').val(value);
                  });

                    // emit file dropzone
                    if (response.logo) {
                        // Create the mock file:
                        var mockFile = {name: response.data.avatar_file_name, size: response.data.avatar_file_size};
                        // console.log(mockFile)
                        // Call the default addedfile event handler
                        basicProfileDropzone.emit("addedfile", mockFile);
                        // push file to current files
                        basicProfileDropzone.files.push(mockFile);
                        // And optionally show the thumbnail of the file:
                        basicProfileDropzone.emit("thumbnail", mockFile, response.logo);

                        // basicProfileDropzone.emit("success", mockFile, response.data.avatar_file_name);
                    }
                }
              });
          });

        // event after shown
        $(document).on('shown.bs.modal', "#basic-info", function(e) {
            _this = $(this);
            _form = _this.find('form');
            _form.off('success.form.bv')
                 .bootstrapValidator({
                    live: 'disabled',
                    fields: {
                        name: {
                            validators: {
                                notEmpty: {
                                    message: $.i18n._('Please enter the required field(s).')
                                },
                                stringLength: {
                                    min: 4,
                                    messageMin: $.i18n._('Party Name is 4 characters long at least.'),
                                    max: 255,
                                    messageMax: $.i18n._('Input fields are 255 characters long maximum.')
                                },
                                remote: {
                                    message: $.i18n._('This name already existed in Product Data Lake.'),
                                    url: '/parties/' + App.party_id + '/exist'
                                }
                            }
                        },
                        business_industry: {
                            validators: {
                                notEmpty: {
                                    message: $.i18n._('Please enter the required field(s).')
                                },
                                stringLength: {
                                    max: 255,
                                    messageMax: $.i18n._('Input fields are 255 characters long maximum.')
                                }
                            }
                        },
                        street: {
                            validators: {
                                stringLength: {
                                    max: 255,
                                    messageMax: $.i18n._('Input fields are 255 characters long maximum.')
                                }
                            }
                        },
                        city_state: {
                            validators: {
                                stringLength: {
                                    max: 255,
                                    messageMax: $.i18n._('Input fields are 255 characters long maximum.')
                                }
                            }
                        }
                    }
                })
                .on('success.form.bv', function(e) {
                    e.preventDefault();
                    var $form     = $(e.target),
                        validator = $form.data('bootstrapValidator');
                    if (basicProfileDropzone.getQueuedFiles().length > 0) {
                        basicProfileDropzone.processQueue();
                    } else {
                        // normally submitting form with ajax
                        $.ajax({
                            url: '/parties/' + App.party_id,
                            method: 'PUT',
                            data: $form.serialize()
                        }).done(function(response){
                            if (response.success) {
                                $("#basic-info").modal('hide');
                                $('[data-display=account_name] span').html(response.display_name);
                                if (response.logo === "") {
                                    response.logo = '/sites/58bc1f6dfcfbf420dca2d8a8/theme/images/img/no-avatar.png?22a2b3f74796b07454bb7fff514931d0';
                                }
                                $('[data-display=account_name] img').replaceWith('<img width="60px" src="'+response.logo+'" >');
                            }
                        }).fail(function(request, status, error){
                            $('.error-basic').text(request.responseJSON.msg)
                        });
                    }
                });
        });

        // event after hide
        $(document).on('hide.bs.modal', "#basic-info", function(e) {
            _this = $(this);
            _form = _this.find('form');
            if (old_state) {
                $('.nav-second-level li.active').removeClass('active');
                old_state.addClass('active');
            }
            _form.data('bootstrapValidator').resetForm(true);
            _form.find('.error-basic').text('');
            basicProfileDropzone.removeAllFiles();
        });
      }

    // append Basic Info modal
    if ($('#about').length > 0) {

      // event on show
      $(document).on('show.bs.modal', "#about", function(e) {
        _this = $(this);
        _this.find('[name=password]').removeAttr('disabled');

        $.get('/users/' + App.User._id).done(function(response) {
            $.each(response.data, function(key, value) {
                _this.find('[name=' + key + ']').val(value);
              });
        });
      });

      // event after shown
      $(document).on('shown.bs.modal', "#about", function(e) {
        _this = $(this);
        _form = _this.find('form');
        _form.off('success.form.bv')
        .bootstrapValidator({
          // live: 'disabled',
          fields: {
              first_name: {
                  validators: {
                      notEmpty: {
                          message: $.i18n._('Please enter the required field(s).')
                      }
                  }
              },
              email: {
                  validators: {
                      threshold: 4,
                      notEmpty: {
                          message: $.i18n._('Please enter the required field(s).')
                      },
                      emailAddress: {
                          message: $.i18n._('Please enter a valid E-mail.')
                      },
                      remote: {
                          message: $.i18n._('This email already existed in your party.'),
                          url: '/users/exist_email',
                          data: {
                              type: 'edit',
                              id: App.User._id
                          }
                      }
                  }
              },
              username: {
                validators: {
                    threshold: 4,
                    notEmpty: {
                        message: $.i18n._('Please enter the required field(s).')
                    },
                    stringLength: {
                        min: 4,
                        messageMin: $.i18n._('Username is 4 characters long at least.')
                    },
                    remote: {
                        message: $.i18n._('This username already existed in your party.'),
                        url: '/users/exist',
                        data: {
                            type: 'edit',
                            id: App.User._id
                        }
                    }
                }
              },
              password: {
                  validators: {
                      stringLength: {
                          min: 8,
                          messageMin: $.i18n._('Password is 8 characters long at least.')
                      }
                  }
              },
              password_confirmation: {
                  validators: {
                    identical: {
                        field: 'password',
                        message: $.i18n._('Password do not match.')
                    }
                  }
              }
          }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
            var $form     = $(e.target),
              validator = $form.data('bootstrapValidator');
              if ($form.find('#password').val() === '') {
                $form.find('#password').attr('disabled', true);
              }
            $.post('/users/update_from_modal/' + App.User._id, $form.serialize()).done(function(response){
              if (response.success) {
                $("#about").modal('hide');
                  $('[data-display=account_name] span').html(response.display_name);
              }
            });
        });
      });

        // event after hide
        $(document).on('hide.bs.modal', "#about", function(e) {
            _this = $(this);
            _form = _this.find('form');
            _form.data('bootstrapValidator').resetForm(true);
        });
    }

    // set party settings
    if ($("#party-settings").length > 0 && (App.User.role === "Subscriber Admin" || App.User.role == "Pdl Admin")) {
        $("#party-settings").find("#send_request").attr("checked", App.Party.notify.send_request);
        $("#party-settings").find("#accept_partner").attr("checked", App.Party.notify.accept_partner);
        $("#party-settings").find("#reject_partner").attr("checked", App.Party.notify.reject_partner);
        $("#party-settings").find("#end_partner").attr("checked", App.Party.notify.end_partner);
        $("#party-settings").find("#end_subscription").attr("checked", App.Party.notify.end_subscription);
        $("#party-settings").find("#delete_product").attr("checked", App.Party.notify.delete_product);
        $("#party-settings").find("#delete_attribute").attr("checked", App.Party.notify.delete_attribute);
        $("#party-settings").find("#delete_da_type").attr("checked", App.Party.notify.delete_da_type);
        $("#party-settings").find("#change_product_link").attr("checked", App.Party.notify.change_product_link);
        $("#party-settings").find("#change_attribute_link").attr("checked", App.Party.notify.change_attribute_link);
        $("#party-settings").find("#change_da_type_link").attr("checked", App.Party.notify.change_da_type_link);
         $("#party-settings").find("#change_attribute_value").attr("checked", App.Party.notify.change_attribute_value);

        $("#party-settings-form").on("submit", function (e) {
            e.preventDefault();
            var _this = $(this);
            var url = $(this).attr("action") + "/" + App.Party._id;
            var method = $(this).attr("method");
            $.ajax({
                url: url,
                method: method,
                data: _this.serialize()
            }).done(function(res) {

            }).fail(function(req, stt, err){

            }).then(function(){
                $("#party-settings").modal('hide');
            });
        });
    }

    
    $('#attribute-settings').on('show.bs.modal', function(e) {
            var _this = $(this);
            $.get('/manage_language/language').done(function(modal){
                $('#lang_options').empty();
               
                $.each(modal.all, function (i, item) {

                    $('#lang_options').append("<option value='" + item+ "'>" + item + "</option>");
                });
                $("#lang_options").val(modal.chose.language);
                $("#des_options").val(modal.chose.des);
            });


            $('.save_att').on('click', function (evt) {
                  evt.preventDefault();
                  var des = $('#des_options').val();
                  var lang = $('#lang_options').val();
                  $.post('/parties/save_att', {des: des, lang: lang}, function(res){
                      _this.modal('hide');
                      $('.save_att').off('click');
                  }, 'json');
            });
        });   

    // $("#attribute-settings-form").on("submit", function(e) {
    //             e.preventDefault();
    //             var _this = $(this);
    //             var _form = $(this).find('form');
    //             $.get('/subscriptions/subscriber_info').done(function(res){

    //                 $('#levels').empty()
    //                 $.each(res.levels, function(key, value) {
    //                   $('#levels').append('<option value=' + value+ '>' + value + '</option>');
    //                 });

    //                 _this.find('.level-name').text(res.level);
    //                 $.each(res, function(key, value) {
    //                     _form.find('[name="'+key+'"]').val(value);
    //                 });

    //             })
    //         });


	if ($("#payment-modal").length > 0){
        $("#payment-modal").on("show.bs.modal", function(e) {
            var option_payment = 'option[value="'+App.Party.payment_method+'"]';
            $("#party-payment-form select").find(option_payment).prop('selected', true);
        });
	}

    $("#party-payment-form").on("submit", function (e) {
        e.preventDefault();
        var _this = $(this);
        var url = $(this).attr("action") + "/" + App.Party._id;
        var method = $(this).attr("method");
        $.ajax({
            url: url,
            method: method,
            data: _this.serialize()
        }).done(function(res) {
            App.Party.payment_method = _this.find('[name=payment_method]').val();
        }).fail(function(req, stt, err){

        }).then(function(){
            $("#payment-modal").modal('hide');
        });
    });

    // numeral settings
    // load a language
    numeral.language('en', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'ème';
        },
        currency: {
            symbol: '€'
        }
    });

    // jquery sticky footer
    $('.open-list').parents('li').on('shown.bs.collapse', function (e) {
        $.fn.mainLayout.positionFooter()
    });
    $('.open-list').parents('li').on('hidden.bs.collapse', function (e) {
        $.fn.mainLayout.positionFooter()
    });
    $(window).on('resize', $.fn.mainLayout.positionFooter());

    $('#multi-languages1').on('change', function (evt) {
        var layout_lang = document.getElementById("multi-languages1").value
        $.ajax({
                  url: "/users/update_layout_lang",
                  method: 'put',
                  data: {
                      id: App.User._id,
                      layout_lang: layout_lang
                  }
              }).done(function(data)
              {
                location.reload();
              });
    })
});
