$(document).ready(function(){

  // List action starts here:
  $('.new-list-form').on('submit', function(e){
    e.preventDefault();
    var listName = $(this).find( "input[name='list']" ).val(); 
    var boardId = $(this).find("input[name='boardId']").val();

    $.post("/list/"+boardId, {list: listName} ,function(data, status){
      
      // creating the form for card addition, that is shown inside each list
      $form = $("<form class='new-card-form' accept-charset='utf-8'></form>");
      $form.append("<p>"+data.name+"</p><br>");
      $form.append('<input type="hidden" name="listId" value='+data._id+' />');
      $form.append('<input type="text" size="10" name="card" placeholder="Add a card.." />');
      $form.append('<input type="submit" value="Add" />');
      $form.on('submit', submitNewCard);

      $listOfLists = $('.list-of-lists');
      $listOfLists.append(
        $('<div>', { class: 'list', id: 'list_id_'+data._id })
            .append($form)
            .append("<div class='cards-list'></div>")
        );
    }); 
  });
  // Card action starts here:
  $('.new-card-form').on('submit', submitNewCard);
});

submitNewCard = function (e) {
    e.preventDefault();

    var cardName = $(this).find( "input[name='card']" ).val(); 
    var listId = $(this).find("input[name='listId']").val();

    $.post("/card/"+listId, {card: cardName} ,function(data, status){
      $('#list_id_'+listId+' .cards-list')
        .append(
          $('<div>', { class: 'cards', id: data._id })
            .append("<p>"+data.content+"</p>"));
    });
  }