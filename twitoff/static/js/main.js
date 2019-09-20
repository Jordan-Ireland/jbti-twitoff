function AddUser(e) {
    e.preventDefault();
    form = $('#createuser');

    $(form).hide();
    $('.loader').show();

    $.ajax({
        url: "{{url_for('user')}}",
        type: 'post',
        dataType: 'json',
        data: form.serialize(),
        success: function (response) {
            console.log(response);
            $('#content').load(document.URL + ' #content>*');
            $(form).show();
            $('.loader').hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function ShowTweets(e) {
    var modal = document.getElementById("tweetModal");

    // Get the modal
    user = $(e).data('user');
    $.ajax({
        url: "{{url_for('user')}}/" + user,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            if (response['message'] == 0) {
                $('.modal-header h2').html(response['name'] + " tweets");
                response['tweets'].forEach(function (tweet) {
                    $('.modal-body').append('<p>' + tweet['text'] + '</p>');
                })
            } else {
                console.log("There was an error");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

        modal.style.display = "block";

    $('.close').on('click', function () {
        modal.style.display = "none";
    });    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == document.getElementById("tweetModal")) {
        document.getElementById("tweetModal").style.display = "none";
    }
}

$(document).ready(function () {

});