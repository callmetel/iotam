var form = $('.share-form');

$(form).submit(function(event) {
	console.log('submit clicked');
    // Stop the browser from submitting the form.
    event.preventDefault();
    var formData = $(this).serialize();

    // Submit the form using AJAX.
	$.ajax({
	    type: 'POST',
	    url: $(form).attr('action'),
	    data: formData
	}).done(function(response) {
	    // Make sure that the formMessages div has the 'success' class.
	    // console.log('submitted');

	    // Clear the form.
	    $('.name').val('');
	    $('.city').val('');
	    $('.state').val('');
	    $('.story').val('');
	}).fail(function(data) {
	    // Make sure that the formMessages div has the 'error' class.

	    // Set the message text.
	    if (data.responseText !== '') {
	        // $(formMessages).text(data.responseText);
	    } else {
	        // $(formMessages).text('Oops! An error occured and your message could not be sent.');
	    }
	});

    // TODO
});
