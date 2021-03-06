'use strict';
window.addEventListener('DOMContentLoaded',()=>{
 // let container = document.querySelector('.container');
  const  formTags = document.querySelector('form'),
         btn = formTags.querySelector('input[type="submit"]'),
         textInput = formTags.querySelector('input[type="text"]'),
         tagsArea = document.querySelector('.tagsArea'),
		 radioBtn = document.querySelector('input[type="checkbox"]');

  btn.classList.add('active');       

  alert('You can enter no more than 55 letters!');

  textInput.oninput = () => {
      if(textInput.value.length > 45) {
       textInput.value = `${textInput.value.slice(0,45)}...`;
        alert('Too long');
      }
    }
  

  formTags.addEventListener('submit', (e)=>{
    e.preventDefault();
	if(btn.classList.contains('active')){	
      createTags(textInput.value);
	}
  })
  
  
  let obj = {
    arrTags: [],
    get allTags(){
        refreshArr();
        if(this.arrTags.length){
          this.arrTags.forEach((item, i)=>{
          return console.log(`${i+1}: ${item}`);
          })
        } else {
           return console.log(`empty`);
        }        
    },
    set replaceTag(arr) { 
        this.arrTags.length = 0;
       
        this.arrTags = [...arr];
        deleteTag(true);
        arr.forEach((i) => createTags(i));
    },
    set addNewTag(tag){
        createTags(tag);
    },
    set removeTag(tag){
        deleteTag(false, tag);
    },
    set readOnly(tag){
        tag.setAttribute('readonly', 'true');
        btn.classList.remove('active');   
    },
    setReadOnly: function(){  
      
      radioBtn.addEventListener('click', ()=>{
        let closes = document.querySelectorAll('li span');

        document.querySelector('input[type="submit"]').classList.toggle('active');
        closes.forEach((i) => i.classList.toggle('block'));

        if(radioBtn.checked){
          textInput.setAttribute('readonly', 'true');
        } else {
          textInput.removeAttribute('readonly');
        }
      }) 
    } 
  }

  function createTags(value){
    if(value){
      let newTag = document.createElement('li');
      newTag.innerHTML = `${value}<span>x</span>`;
      tagsArea.prepend(newTag);
    
      formTags.reset();
      deleteTag();
      refreshArr();
    }
  }

  function deleteTag (allDelite, removedTag){
    let tags = tagsArea.querySelectorAll('li');
    
    tags.forEach((item) => {
      let closeTag = item.querySelector('span');

       if( removedTag && item.textContent.slice(0,-1) == removedTag ){
        item.remove(); 
        refreshArr();
         console.log(obj.arrTags);
       }

       closeTag.addEventListener('click', ()=>{
        if(!closeTag.classList.contains('block')){
          item.remove(); 
          refreshArr();
          console.log(obj.arrTags);
         }
       }); 
     });
      
     if(allDelite){
       tags.forEach((item) => item.remove());
     } 
  }
 deleteTag();

  
 function refreshArr (){
  let tags = tagsArea.querySelectorAll('li');
   obj.arrTags.length = 0;

   tags.forEach((item, i)=>{
     obj.arrTags.push(item.textContent.slice(0,-1));
    })
 }
 refreshArr ();


//Get tags ----->
//console.log( obj.allTags);

//set new tag list ----->
//let newTagsArray = ['one','day','repeat', 'repeat', 'love', 'another repeat', 'say'];
//console.log( obj.replaceTag = newTagsArray);

//add tag ----->
//let newTag = 'new tag'
//console.log(obj.addNewTag = newTag, obj.arrTags);

//remove tag ----->
//console.log( obj.removeTag = obj.arrTags[0] );

//set readonly ----->
//obj.readOnly = textInput;

//localStorage  1  ----->
  obj.arrTags.forEach((item,i) => {
  localStorage.setItem(`${i+1}`, ` ${item}`);
  console.log(localStorage.getItem(i+1));
})

//localStorage  2  ----->
/*
 let tagsString = JSON.stringify(obj.arrTags);
 localStorage.setItem('tags', tagsString);
 console.log(JSON.parse(localStorage.getItem('tags')));
*/

// block all events in UI
obj.setReadOnly();

})