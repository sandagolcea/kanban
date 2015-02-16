$(document).ready(function(){
  
  $('.new-card-form').on('submit', function(e){
    e.preventDefault();

    var cardName = $(this).find( "input[name='card']" ).val(); 
    var listId = $(this).find("input[name='listId']").val();

    $.post("/card/"+listId, {card: cardName} ,function(data, status){
        $('#list_id_'+listId+' .cards-list')
          .append(
            $('<div>', { class: 'cards', id: data._id })
              .append("<p>"+data.content+"</p>"));
    });
  });
});
