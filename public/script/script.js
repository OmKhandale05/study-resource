$(document).ready(function () {

    $('#login-btn').click(function () {
        addLoadingSpinner();
        $.ajax({
            url: '/admin',
            type: 'POST',
            data: {
                'username': $('#username').val(),
                'adminPassword': $('#adminPassword').val(),
            },
            success: function (response) {
                if (response.statusCode == 0) {
                    alert("Login Successfull");
                    location.replace('/adminView');
                } else {
                    alert("Invalid Credentials");
                    removeLoadingSpinner();
                }
            }
        })
    })

    function addLoadingSpinner() {
        $('#loading-overlay').addClass('loading-overlay');
        $('#spinner').addClass('spinner');
    }

    function removeLoadingSpinner() {
        $('#loading-overlay').removeClass('loading-overlay');
        $('#spinner').removeClass('spinner');
    }

    function validateBookData(title, link, route) {
        if (title.length < 5) {
            alert("Book title too short!")
            return false;
        } else if (link.length < 10) {
            alert("Folder URL too short!");
            return false;
        } else if (route.length < 2 || route.length > 10) {
            alert("Route invalid! should be atleast 3 characters and maximum 10 characters");
            return false;
        }
        return true;
    }

    $('#submit').click(function () {
        let bookTitle = $('#bookTitle').val().trim();
        let Link = $('#Link').val().trim();
        let route = $('#route').val().trim();
        if (validateBookData(bookTitle, Link, route)) {
            let response = confirm("Are you sure to upload?");
            if (response) {
                addLoadingSpinner();
                $('#add-book-from').submit();
            }
        }
    });


    $(document).on('click', '.updateDeleteBtn', function () {
        let buttonItem = $(this).attr('id').split('-');
        let operationType = buttonItem[0];
        let bookId = buttonItem[2];

        if (operationType.includes('delete')) {
            let confirmOption = confirm("Are you sure to delete this book?");
            if (confirmOption) {
                addLoadingSpinner();
                $.ajax({
                    type: 'DELETE',
                    url: '',
                    data: {
                        bookId: bookId
                    },
                    success: function (response) {
                        if (response.statusCode == 0) {
                            alert("Book Deleted!");
                            location.reload();
                        }
                    },
                    error: function (error) {
                        alert("Netowrk error! Try again later.");
                    },
                    complete: function (status) {
                        removeLoadingSpinner();
                    }
                })
            }
        } else if (operationType.includes('update')) {
            localStorage.setItem('bookId', bookId);

            // $('#updateBookModal').modal('toggle');
        }
    });

    $(document).on('click', '#update-book', function () {
        let title = $('#newBookTitle').val().trim()
        let link = $('#newLink').val().trim()
        if (validateUpdatedData(title, link)) {
            let confirmOption = confirm("Are you sure to update book details?");
            if (confirmOption) {
                addLoadingSpinner();
                $.ajax({
                    type: 'PUT',
                    url: '',
                    data: {
                        'title': title,
                        'link': link,
                        'bookId': localStorage.getItem('bookId'),
                    }, success: function (response) {
                        if (response.statusCode == 0) {
                            alert("Book Details updated Successfully!");
                            location.reload();
                        } else {
                            alert("An error has occured!")
                        }
                    }, error: function (error) {
                        alert("Network error");
                    },
                    complete: function (status) {
                        removeLoadingSpinner();
                    }
                })
            }
        }
    })



    function validateUpdatedData(title, link) {
        if (title.length < 5) {
            alert("Book title too short!")
            return false;
        } else if (link.length < 10) {
            alert("Folder URL too short!");
            return false;
        }
        return true;
    }


    // $(document).on('click', 'viewBookBtn', function () {
    //     let bookId = $('.viewBookBtn').attr('id');


    // })
});