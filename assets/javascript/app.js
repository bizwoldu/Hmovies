$(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea');

})

var searchArray = ['Boys In The Hood',"Belly",'Paid In Full',
'Juice','Poetic Juistice','All Eyes On Me','Shottas','Baller Blocker',
'Power','The Wire','New Jack City','City Of Gods','Snow On The Bluff',
'Set it Off','Killa Season','Menace To Society','Booty Call','The Wood','Dont Be A Menace',
'Dope','SnowFall','Friday','Malibus Most Wanted','Training Day','South Central',
'Above The Rim','Dead President','Baby boy','Get Rich Or Die Trying','Waist Deep','8 Mile','Hustle & Flow','In Too Deep','State Property',
'Strapped','187','ATL','Four Brothers','The Players Club','Hot Boyz','The Wash','Dangerous Minds','Colors',
'Paper Soldiers','Crooklyn'];
 
function populateButtons(){
    $('#buttonsArea').empty();
    for(var i = 0;i<searchArray.length;i++){
        var a = $('<button>');
        a.addClass('classToAdd');
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $('#buttonsArea').append(a);
    }  
} 
 
$('#addSearch').on('click', function() {
    var addSearch = $('#search-input').val().trim();
    searchArray.push(addSearch);
    populateButtons()
    return false;
    
})
        
    $(document).on('click','.classToAdd',function(){
        $('#searches').empty();
        var type = $(this).data('type');
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q='+type+'&apikey=IfcUCkqcFEZ5Ff4xQcQZEHkv4R1KxdLQ&limit=25';
        $.ajax({url:queryUrl,method:'GET'})
            .done(function(response){
                for(var i=0;i<response.data.length;i++){
                    var searchDiv = $('<div class="search-item">');         
                    var rating = response.data[i].rating;
                    var p = $('p').text('rating:'+rating);
                    var animated = response.data[i].images.fixed_height.url;
                    var still = response.data[i].images.fixed_height_still.url;
                    var image = $('<img>');
                        image.attr('src',still);
                        image.attr('data-animated',animated);
                        image.attr('data-still',still);
                        image.attr('data-animated',animated);
                        image.addClass('searchImage');
                        searchDiv.append(p);
                        searchDiv.append(image);
                        $('#searches').append(searchDiv);
                    } 
                })    
        })
        $(document).on('click','.searchImage',function(){
            var state = $(this).attr('data-state');
            if(state == 'still'){
                $(this).attr('src',$(this).data('animated'));
                $(this).attr('data-state','animated');
            } else {
                $(this).attr('src',$(this).data('still'));
                $(this).attr('data-state','still');
            }
        })
         