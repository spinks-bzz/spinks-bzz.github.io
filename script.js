var commentsTable = [];
  
function insertComment(name, comment) {
  var commentsDiv = document.getElementById("commentsHere");

  var commentDiv = document.createElement("div");
  commentDiv.className = "comment";

  var namePara = document.createElement("p");
  namePara.innerHTML = "<strong>" + name + "</strong>";

  var commentPara = document.createElement("p");
  commentPara.textContent = comment;

  commentDiv.appendChild(namePara);
  commentDiv.appendChild(commentPara);

  commentsDiv.appendChild(commentDiv);
}

function updateComments() {
  document.getElementById("commentsHere").innerHTML = "";

  for (var i = 0; i < commentsTable.length; i++) {
    insertComment(commentsTable[i].Name, commentsTable[i].Comment);
  }
}

async function validateForm() {
  var nameInput = document.getElementById("fname");
  var commentInput = document.getElementById("fcomment");

  if (nameInput.value === "" || commentInput.value === "") {
    alert("Name und Kommentar müssen Text enthalten!");
    return false;
  } else {
    var x = nameInput.value;
    var y = commentInput.value;
    var xy = {
      Name: x,
      Comment: y
    };

    nameInput.value = "";
    commentInput.value = "";

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: xy
        })
      });

      if (response.ok && response.status === 200) {
        const data = await response.json();
        commentsTable = data;
        updateComments();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

window.onload = function () {
  fetch("/api/data")
    .then(response => response.json())
    .then(data => {
      commentsTable = data.comments_data;
      updateComments();
    })
    .catch(error => console.log(error));
};