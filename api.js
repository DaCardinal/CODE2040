var html = '';
var token = "";
var email = "daniel.quaidoo@gmail.com";
var github = "https://github.com/DaCardinal/2040";
var credentials = {
    email: email,
    github: github
};

$.ajax({
    url: 'http://challenge.code2040.org/api/register',
    type: 'POST',
    dataType: 'JSON',
    data: JSON.stringify(credentials)
}).done(function (response) {
    token = response.result;
    html += "Token: " + token + "<br/>";
    $('#message').html(html);
    stageI();
    stageII();
    stageIII();
    stageIV();
    checkStatus();
});

//================================
//Stage I: Reverse a string
//================================

var stageI = function () {
    var stringToReverse = '';
    var reversedString = '';
    var reverse;

    handshake = {token: token};

    $.ajax({
        url: 'http://challenge.code2040.org/api/getstring',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(handshake)
    }).done(function (response) {
        stringToReverse = response.result;
        reverseString();
        validateReverse();
    });

    var reverseString = function () {
        reverse = stringToReverse.split('');
        for (var i = reverse.length - 1; i >= 0; i--) {
            reversedString += reverse[i];
        }
    };

    var validateReverse = function () {

        // Send feedback back to server
        feedback = {
            token: token,
            string: reversedString
        };

        $.ajax({
            url: 'http://challenge.code2040.org/api/validatestring',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(feedback)
        }).done(function (response) {
            html += response.result + "<br/>";
            $('#message').html(html);
        });

    };
};

//================================
//Stage II: Needle in a haystack
//================================

var stageII = function () {
    handshake = {token: token};
    var needle = '';
    var index = -1;
    var haystack;

    $.ajax({
        url: 'http://challenge.code2040.org/api/haystack',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(handshake)
    }).done(function (response) {

        needle = response.result.needle;
        haystack = response.result.haystack;
        getIndex();

    });

    var getIndex = function () {

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) {
                index = i;
            }
        }

        // Send feedback back to server
        feedback = {
            token: token,
            needle: index
        };

        $.ajax({
            url: 'http://challenge.code2040.org/api/validateneedle',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(feedback)

        }).done(function (response) {
            html += response.result + "<br/>";
            ;
            $('#message').html(html);
        });
    };
};

//================================
//Stage III: Prefix
//================================
var stageIII = function () {
    var prefix = '';
    var array;
    var refinedArray = new Array();

    handshake = {token: token};

    $.ajax({
        url: 'http://challenge.code2040.org/api/prefix',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(handshake)
    }).done(function (response) {
        prefix = response.result.prefix;
        array = response.result.array;
        findElementsWithPrefix();
    });

    var findElementsWithPrefix = function () {

        for (var i = 0; i < array.length; i++) {

            if ((array[i].substring(0, prefix.length)) !== prefix) {
                refinedArray.push(array[i]);
            }
        }

        // Send feedback back to server
        feedback = {
            token: token,
            array: refinedArray
        };

        $.ajax({
            url: 'http://challenge.code2040.org/api/validateprefix',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(feedback)
        }).done(function (response) {
            html += response.result + "<br/>";
            ;
            $('#message').html(html);
        });
    };
};

//================================
//Stage IV: The dating game
//================================
var stageIV = function () {
    var dateStamp;
    var interval;
    var newDateStamp;

    handshake = {token: token};

    $.ajax({
        url: 'http://challenge.code2040.org/api/time',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(handshake)
    }).done(function (response) {
        dateStamp = response.result.datestamp;
        interval = response.result.interval;
        addInterval();
    });

    var addInterval = function () {

        var date = new Date(dateStamp);
        date.setSeconds(date.getSeconds() + interval);
        date.toISOString();
        newDateStamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

        feedback = {
            token: token,
            datestamp: newDateStamp
        };

        $.ajax({
            url: 'http://challenge.code2040.org/api/validatetime',
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(feedback)
        }).done(function (response) {
            html += response.result + "<br/>";
            $('#message').html(html);
        });
    };
};


//================================
//Check status
//================================
var checkStatus = function () {
    var status;
    handshake = {token: token};
    $.ajax({
        url: 'http://challenge.code2040.org/api/status',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(handshake)
    }).done(function (response) {
        status = response.result;
        html += "Status: " + JSON.stringify(status) + "<br/>";
        $('#message').html(html);
    });
};
