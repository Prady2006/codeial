function readUrl(input){
    if(input.files && input.files[0]){
        var reader = new FileReader() ;
        reader.onload = function(e){
            var img = document.getElementById('profile-img');
            img.setAttribute('src',e.target.result);
            console.log(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}