$(function() {
	var $users = $('.Users');
	var str = '';

	$.ajax({
	    type: 'GET',
	    url: "https://jsonplaceholder.typicode.com/users",
	    success: function(users){
	        $.each(users, function(i, user){
	        	str = "<div class = user" + user.id + ">";
	        	str = str + "<button class = \"b_user" + user.id + "\" onclick = \"getPost(" + user.id + ")\">";
	            str = str + "<span style= \"color: white \">" + user.name + "</span>";
	            str = str + "<span style= \"color: #8899A6 \">" + '&nbsp&nbsp@' +user.username + "</span>";
	        	str = str + "</button> <div class = \"posts\" style =\"display: none\"></div></div>";

	        	$users.append(str);
	            str = null;	   
	        });
	    },
	    error: function(){
	        alert('No Users fetched!');
	    }
	});

});

function getPost(uid){
	var $user = $(".user" + uid + "> .posts");

	if($user.children('div').length > 0){
		$user.slideToggle("slow");
	}

	else{
		$.ajax({
			type: 'GET',
			url: "https://jsonplaceholder.typicode.com/users/"+ uid + "/posts",
			success: function(posts){
				$.each(posts, function(i, post){
					str = "<div class = post" + post.id + ">"; 
					str = str + "<button class = \"b_post\"" + post.id + "\" onclick = \"getComment(" + post.id + ")\">";
					str = str + "<span style= \"color: white \">" + post.body + "</span>";
					str = str + "</button><div class = \"comments\" style =\"display: none\"></div></div>";

					$user.append(str);
					str = null;	   
				});
				$user.slideToggle("slow");
			},
			error: function(){
				alert('No Posts fetched!');
			}
		});
	
	}
	
}

function getComment(pid){

	var $post = $(".post" + pid + "> .comments");

	if($post.children('div').length > 0){
		$post.slideToggle("slow");
	}

	else{
		$.ajax({
			type: 'GET',
			url: "https://jsonplaceholder.typicode.com/posts/"+ pid + "/comments",
			success: function(comments){
				$.each(comments, function(i, comment){
					str = "<div class = comment" + comment.id + ">"; 
					str = str + "<span style= \"color: white \">" + comment.body + "</span>";
					str = str + "</div>";

					$post.append(str);
					str = null;  
				});
				$post.slideToggle("slow");

			},
			error: function(){
				alert('No Comments fetched!');
			}
		});
	}
	
}