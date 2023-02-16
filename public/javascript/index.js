  /**
   * You might want to use this template to display each new characters
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
   */
  const characterTemplate = document.getElementById('template')
  const URL= 'http://localhost:5005/api/'
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    try {
      document.querySelector('.characters-container').innerHTML= '';
      const {data}= await axios.get(`${URL}characters`);
      // console.log(data);
      for (const character of data){
        let clone = characterTemplate.content.cloneNode(true);
        clone.querySelector('.character-id').textContent += character._id;
        clone.querySelector('.name').textContent += character.name;
        clone.querySelector('.occupation').textContent += character.occupation;
        clone.querySelector('.cartoon').textContent += character.cartoon;
        clone.querySelector('.weapon').textContent += character.weapon;
        document.querySelector('.characters-container').append(clone)
      }
    }catch (error){
      console.error(error);
    }
  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    const name =document.querySelector('.operation>input').value;
    // console.log(name)
    try {
      const {data}= await axios.get(`${URL}characters/${name}`);
      // console.log(data);
      document.querySelector('.characters-container').innerHTML= '';
      let clone = characterTemplate.content.cloneNode(true);
        clone.querySelector('.character-id').textContent += data._id;
        clone.querySelector('.name').textContent += data.name;
        clone.querySelector('.occupation').textContent += data.occupation;
        clone.querySelector('.cartoon').textContent += data.cartoon;
        clone.querySelector('.weapon').textContent += data.weapon;
        document.querySelector('.characters-container').append(clone);
    } catch (error) {
      console.error(error);
    }
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    const id =document.querySelector('.operation-delete>input').value;
    // console.log('${URL}characters/${id}');
    try {
      const {data}= await axios.delete(`${URL}characters/${id}`)
      // console.log(data.message)
      // console.log( document.querySelector('#delete-one'))
      if(data.message==="Character not found"){
        document.querySelector('#delete-one').style.backgroundColor = "red";
        // console.log("red");
      }else if (data.message==="Character has been successfully deleted"){
        document.querySelector('#delete-one').style.backgroundColor = "green";
      }
    } catch (error) {
      console.error(error);
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    try {
      event.preventDefault();
      const newCharacter= {
        name: document.querySelector('#name-update').value,
        occupation: document.querySelector( '#occupation-update').value,
        weapon: document.querySelector('#weapon-update').value,
        cartoon: document.querySelector('#cartoon-update').checked,
      }
      const id= document.querySelector('#id-update').value;
      const res= await axios.patch(`${URL}/characters/${id}`, newCharacter);
      console.log(res);
      document.querySelector('#update-data').style.backgroundColor = "green";
    }catch(error){
      console.error(error);
      document.querySelector('#update-data').style.backgroundColor = "red";
    }
  });
  
  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    // console.log(newCharacter)
    try {
      event.preventDefault();
      const newCharacter= {
        name: document.querySelector('#name').value,
        occupation: document.querySelector( '#occupation').value,
        weapon: document.querySelector('#weapon').value,
        cartoon: document.querySelector('#cartoon').checked,
      }
      const res= await axios.post(`${URL}/characters`, newCharacter);
      // console.log(res);
      document.querySelector('#send-data').style.backgroundColor = "green";
    }catch(error){
      document.querySelector('#send-data').style.backgroundColor = "red";
      console.error(error);
    }
  });

