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

  // List action starts here:
  $('.new-list-form').on('submit', function(e){
    e.preventDefault();
    var listName = $(this).find( "input[name='list']" ).val(); 
    var boardId = $(this).find("input[name='boardId']").val();

    // action="/list/<%=boardId%>" method="post"
    $.post("/list/"+boardId, {list: listName} ,function(data, status){
      
      // creating the form for card addition, that is shown inside each list
      $form = $("<form class='new-card-form'></form>");
      $form.append("<p>"+data.name+"</p><br>");
      $form.append('<input type="hidden" name="listId" value='+data._id+' />');
      $form.append('<input type="text" size="10" name="card" placeholder="Add a card.." />');
      $form.append('<input type="submit" value="Add" />');

      $('.list-of-lists').append(
      // <div id="list_id_<%=list[key]._id%>" class='list'>
        $('<div>', { class: 'list', id: 'list_id_'+data._id })
            .append($form));
    }); 
  });

});
