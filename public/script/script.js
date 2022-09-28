$(document).ready(function(){
    $('#submit').click(function(){
        let response = confirm("Are you sure to upload?");
        if(response){
            $.post('/upload');
        }
    });
});