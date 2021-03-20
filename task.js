'use strict';
window.addEventListener('DOMContentLoaded',()=>{
 // let container = document.querySelector('.container');
  const  form = document.querySelector('form'),
         button = form.querySelector('input[type="submit"]'),
         text = form.querySelector('input[type="text"]'),
         tagsArea = document.querySelector('.tagsArea');     

  document.querySelector('input[type="submit"]').classList.add('active');       

  alert('You can enter no more than 55 letters!');

  text.oninput = () => {
      if(text.value.length > 45) {
       text.value = `${text.value.slice(0,45)}...`;
        alert('Too long');
      }
    }
  

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    createTags(text.value);
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
        document.querySelector('input[type="submit"]').classList.remove('active');   
    },
    setReadOnly: function(){
      let inputs = document.querySelectorAll('input');
      let closes = document.querySelectorAll('li span');

      document.querySelector('input[type="submit"]').classList.remove('active');

      inputs.forEach(tag => tag.setAttribute('readonly', 'true'));
      closes.forEach((i) => i.classList.add('block'));
    } 
  }

  function createTags(value){
    if(value){
      let newTag = document.createElement('li');
      newTag.innerHTML = `${value}<span>x</span>`;
      tagsArea.prepend(newTag);
    
      form.reset();
      deleteTag();
      refreshArr();
    }
  }

  function deleteTag (allDelite, removedTag){
    let tags = tagsArea.querySelectorAll('li');
    
    tags.forEach((item) => {
      let close = item.querySelector('span');

       if( removedTag && item.textContent.slice(0,-1) == removedTag ){
        item.remove(); 
        refreshArr();
         console.log(obj.arrTags);
       }

       close.addEventListener('click', ()=>{
        if(!close.classList.contains('block')){
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
//let inputText = document.querySelector('input[type="text"]');
//obj.readOnly = inputText;

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
//obj.setReadOnly();

})