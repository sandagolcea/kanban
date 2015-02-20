$(document).ready(function(){
  $('.new-board-form').on('submit', function(e){
    e.preventDefault();
    var boardName = $(this).find("input[name='board']").val();

    $.post('/board',{board: boardName}, function(data, status){
      //form for acessing/get(ting) a board
      $form = $("<form action='/board/"+data._id+"' method='get' accept-charset='utf-8'></form>");
      $form.append("<p class='boards'>"+data.name+"<br><input type='submit' value='Open Card' /></p>");

      $listOfBoards = $('.list-of-boards');
      $listOfBoards.append($form);
    });
  });
});