// import {textContent, repliesContent, replyToPerson} from "./js/local.js";



























































/***************Selection ******* */
const  submitBtn = document.querySelector('.submit');
const container = document.querySelector('.commentSection');
const textValue = document.querySelector('.value');
const modalContainer =  document.querySelector('.modalContainer');
const btnCancel = document.querySelector('.btnCancel');
const btnDelete = document.querySelector('.btnDelete');


let textArea = "";
let countNum;
let personDiv;

 let editFlag = false;
 let editId;
 let editElement = "";

window.addEventListener('load', setUpItems);

/***********EVENT LISTENERS ****** */
submitBtn.addEventListener('click', includeItem);
btnCancel.addEventListener('click', () => {
   modalContainer.style.display = "none"
}); 
btnDelete.addEventListener('click', () => {
   container.removeChild(personDiv);
   modalContainer.style.display = "none";
   setBackToDefault();
   const id = personDiv.dataset.id;
   removeFromLoaclStorage(id);
})



 

 /**************TEMPLATE ******** */

container.innerHTML = textContent;
const commentSection = document.querySelectorAll('.comment');


let secondComment = commentSection[1];

secondComment.innerHTML = repliesContent;
secondComment.innerHTML += replyToPerson;
const replies = document.querySelectorAll('.reply');
const post = document.querySelector('.onePost');

replies.forEach(reply => {
  reply.addEventListener('click', createReplyInput)
})

 



 /*********Functions ************ */
// ==== repiles to other people === 
 function input() {
   const element = document.createElement('div');
   element.classList.add('inputReply');
   element.innerHTML =`<div class="personImg">
   <img src="./images/avatars/image-juliusomo.png" alt="">
</div>

<div class="text">
<textarea name="" id="text" cols="50" rows="5" placeholder="Add a comment..."></textarea>
</div>

<div class="button">
<button class = "send">REPLY</button>
</div>`;

return element;
 }
 function createReplyInput(e) {
   let parent = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
  let element = input();

parent.appendChild(element);
const send = document.querySelector('.send');
const textarea = document.getElementById('text');
textArea = textarea;
send.addEventListener('click', addtoReply);

}




 function createReplyText(id, value) {
   let element = document.createElement('div');
   element.classList.add('personReply');
   const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
   element.innerHTML = `      <div class="counter">
   <img src="./images/icon-plus.svg" alt="" class = "plus">
   <p>0</p>
   <img src="./images/icon-minus.svg" alt="" class = "minus">
</div>

<div class="avatar">

<div class="header">
   <div class="name">
       <img src="./images/avatars/image-juliusomo.png" alt="">

       <h3>juliusomo</h3>
       <span class="you">you</span>
       <p class="time">Just now</p>
   </div>

   <div class="options">
      <div class="delete">
       <img src="./images/icon-delete.svg" alt="">
       <p>Delete</p>
      </div>

      <div class="edit">
          <img src="./images/icon-edit.svg" alt="">
          <p>Edit</p>
      </div>
   </div> 

</div>

<div class="content">
   <p>${value}</p>
</div>
</div>`;

return element;
 }
 function addtoReply(e) {
    
     let value = textArea.value;
     let id = new Date().getTime().toString();

 if (value  && !editFlag) {
   let element = createReplyText(id, value);
   let parent = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
   let comment = parent.children[1];
   comment.appendChild(element); 
   let regularParent = e.currentTarget.parentElement.parentElement.parentElement;
   let input = e.currentTarget.parentElement.parentElement;
   regularParent.removeChild(input);
   setBackToDefault();
 } else {
   //  console.log(comment);
 }



   
let replyEditutton = document.querySelectorAll('.edit');
let replyDeletebutton = document.querySelectorAll('.delete');

replyEditutton.forEach((editbtn) => {
   editbtn.addEventListener('click', editItem)
});
replyDeletebutton.forEach((deletebtn) => {
   deletebtn.addEventListener('click', deleteItem)
});

}


function includeItem() {
  let value = textValue.value
   const id = new Date().getTime().toString();

   // If not editing 
   if (value && !editFlag) {
  let comment = createReplyText(id, value); 
  const editbtn = comment.querySelector('.edit');
  editbtn.addEventListener('click', editCommentItem);



   const deletebtn = comment.querySelector('.delete');
   deletebtn.addEventListener('click', deleteCommentItem);

  const counterComment = comment.querySelectorAll('.counter img');
   let counterNum = comment.querySelector('.counter p');

   countNum = counterNum;
   counterComment.forEach(count => {
      count.addEventListener('click', countVote);
      
   });
   
   
   //   console.log(counterComment);
   container.appendChild(comment);
   addToLocalStorage(id, value);
   setBackToDefault();
} 

   // if editing 
   else if (value && editFlag) {
      editElement.innerHTML = value;
      editLocalStorage(editId, value);
      setBackToDefault();
   }
   
}

const counterReply = document.querySelectorAll('.counter svg');

function deleteCommentItem(e) {
   modalContainer.style.display = "flex"; 
   personDiv = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
}

function editCommentItem(e) {
   const element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
   editElement = e.currentTarget.parentElement.parentElement.nextElementSibling;
   // console.log(editElement);

   textValue.value = editElement.innerText;
   editId = element.dataset.id;
   submitBtn.textContent = "edit";
   editFlag = true;
}

let count = 0;

function countVote(e) {
   const countClass = e.currentTarget.classList;

   if (countClass.contains('plus')) {
      count++ 
   } else if(countClass.contains('minus')) {
      count--;
      if (count < 0) {
         count = 0;
      }
   }

  return countNum.innerHTML = count;   
}

function setBackToDefault() {
   editFlag = false;
   editElement = " ";
   textValue.value = " ";
   submitBtn.innerText = "send"
}

function setUpItems() {
   let element;
   let items = getLocalStorage();
   if (items.length > 0) {
      items.forEach((item) => {
         container.appendChild( createReplyText(item.id, item.value));
      });
   }

   const Deletes = document.querySelectorAll('.personReply .delete')
   const Edits = document.querySelectorAll('.edit');

   Deletes.forEach(Delete => {
      Delete.addEventListener('click', deleteCommentItem);
   });

   Edits.forEach(Edit => {
      Edit.addEventListener('click', editCommentItem);
   })

}
/************LOCAL STORAGE**************** */

function getLocalStorage() {
   return localStorage.getItem("commet") 
   ? JSON.parse(localStorage.getItem("commet")) 
   : [];
}

// function getLocalStorage() {
//    return localStorage.getItem("list")
//      ? JSON.parse(localStorage.getItem("list"))
//      : [];
//  }

// console.log(getLocalStorage());

function addToLocalStorage(id, value) {
   const section = {id, value};
   let items =  getLocalStorage();

   items.push(section);

   localStorage.setItem("commet", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  
   let items = getLocalStorage();

   items = items.map((item) => {
      if (item.id === id) {
         item.value = value;
      }
      return item;
      console.log(item);
   });

   localStorage.setItem("commet", JSON.stringify(items));

}

function removeFromLoaclStorage(id) {
   let items = getLocalStorage();

   items = items.filter(item => {
      if (item.id !== id) {
         return item;
      }
   });

   localStorage.setItem("commet", JSON.stringify(items));
}