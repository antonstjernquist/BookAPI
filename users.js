window.addEventListener('load', function (event) {

/* EventListeners */

/* User panel Button EVENTLISTENER*/
document.getElementById('userPanelBtn').addEventListener('click', function(){
  document.getElementsByClassName('userPanel')[0].style.display = 'block';
});

let userModal1 = document.getElementsByClassName('userModal')[0];
let userModal2 = document.getElementsByClassName('userModal')[1];
let userModal3 = document.getElementsByClassName('userModal')[2];

  /* Create User Button EVENTLISTENER*/
  let createUserBtn = document.getElementById('createUserBtn');
  let retrieveUserBtn = document.getElementById('retrieveUserBtn');
  let removeUserBtn = document.getElementById('removeUserById');
  createUserBtn.addEventListener('click', function(){
    userModal1.style.display = 'block';
    userModal2.style.display = 'none';
    userModal3.style.display = 'none';

    /* Set active to createUser btn */
    createUserBtn.className = 'userPanelBtnActive';

    /* Remove from the other two */
    removeUserBtn.className = '';
    retrieveUserBtn.className = '';
  });

/* Retrieve User Button EVENTLISTENER*/
retrieveUserBtn.addEventListener('click', function(){
  userModal1.style.display = 'none';
  userModal2.style.display = 'block';
  userModal3.style.display = 'none';
  /* Set active to Retrieve btn */
  retrieveUserBtn.className = 'userPanelBtnActive';

  /* Remove from the other two */
  createUserBtn.className = '';
  removeUserBtn.className = '';
});

removeUserBtn.addEventListener('click', function(){
  userModal1.style.display = 'none';
  userModal2.style.display = 'none';
  userModal3.style.display = 'block';
  /* Set active to Remove btn */
  removeUserBtn.className = 'userPanelBtnActive';

  /* Remove from the other two */
  createUserBtn.className = '';
  retrieveUserBtn.className = '';
});

let apiBtn1 = document.getElementsByClassName('apiBtn')[0];
let apiBtn2 = document.getElementsByClassName('apiBtn')[1];
let apiBtn3 = document.getElementsByClassName('apiBtn')[2];
let apiBtn4 = document.getElementsByClassName('apiBtn')[3];

/* Create user eventListener */
apiBtn1.addEventListener('click', function(event){

  /* Create user */
  let parent = event.target.parentNode;
  let name = parent.children[0].value;
  let key = parent.children[1].value;
  let password = parent.children[2].value;
  let hashed;

  if(password != ""){
    hashed = md5(password);
  }


  /* If name field is empty */
  if(name == ""){
    printMsg('Empty name field!', 'error');
  } else if(key != ""){
    verifyKey(key, name, 'none', hashed, true);
  } else {

    key = retrieveKey();
    console.log('Creating user!');
    parent.children[0].value = "";
    parent.children[1].value = "";
    parent.children[2].value = "";

    createUser(name, key, hashed);
    console.log('hashed is: '+ hashed);
  }
});

/* Retrieve user eventListener */
apiBtn2.addEventListener('click', function(event){
  /* Retrieve user */
  let parent = event.target.parentNode;
  let name = parent.children[0].value;
  if(name == ""){
    printMsg('Empty field!', 'error');
  } else{

    removeBooksFromLibrary();
    retrieveUser(0, name, undefined, false);
    console.log('Retrieving user!');
    parent.children[0].value = "";
    parent.children[1].value = "";
  }
});

apiBtn3.addEventListener('click', function(event){
  /* Retrieve ALL USERS & display*/
    removeBooksFromLibrary();
    /* retrieveUser(counter, name, id, all) */
    retrieveUser(0, 'all', undefined, true);
    console.log('Retrieving all users!');
});

apiBtn4.addEventListener('click', function(event){

    /* Remove user by ID */

    let parent = event.target.parentNode;
    removeBookFromApi(parent.children[0].value, 0, true);
    parent.children[0].value = "";
});

  /* Testing functions in callback */
  changeLibraryHeader('UserID','Username','Key');
  //removeBookFromApi(10889, 0);
  //retrieveUser(0, 'Anton');
  createDatabaseKey();


  /* Login EventListeners */

  /* Open Login page */
  document.getElementById('openLoginPageBtn').addEventListener('click', function(event){
    let loginModalWrapper = document.getElementById('loginModalWrapper');
    loginModalWrapper.style.display = 'flex';

    userModal1.style.display = 'none';
    userModal2.style.display = 'none';
    userModal3.style.display = 'none';
    /* Set active to Remove btn */
    document.getElementById('openLoginPageBtn').className = 'userPanelBtnActive';

    /* Remove from the other two */
    createUserBtn.className = '';
    retrieveUserBtn.className = '';
    removeUserBtn.className = '';

    /* Add eventListener to close when clicking outside */
    window.onclick = function (event) {
        if (event.target == loginModalWrapper) {
            loginModalWrapper.style.display = "none";
            document.getElementById('openLoginPageBtn').className = '';
            returnRegisterToLogin();
        }
    }
  });

  addEventListenersForLoginPage();
  /* End of callback */
});

/* Users JavaScript file */


/* Functions */


function loginUserStart(event){

  /* Declare loginDiv & inputs */
  let loginDiv = document.getElementById('loginDiv');
  let loginInputs = document.getElementsByClassName('loginUserDivInput');

  let username = loginInputs[0].value;
  let password = loginInputs[1].value;

  /* We want to log the user in if the user with that
  name has that password specified */
  /* retrieveUser(counter, name, id, all, hashedPassword, login, precise) */

  if(password == "" || username == ""){
    printMsg('Empty field!', 'error')
  } else {
    retrieveUser(undefined, username, undefined, false, md5(password), true, true);
    loginInputs[0].value = "";
    loginInputs[1].value = "";
  }
}

function loginUser(userObj){

  /* When the user actually logs in! */
  printMsg('Welcome ' + userObj.name + '!','success');
  alert('Is your email: '+userObj.email+'?');
  saveKey(userObj.key);
  let loginDiv = document.getElementById('loginDiv');
  loginDiv.parentNode.parentNode.style.display = 'none';
}


function addEventListenersForLoginPage(){

    /* Close Login page */
    document.getElementsByClassName('fa fa-window-close fa-lg')[0].addEventListener('click', function(event){
      document.getElementById('loginModalWrapper').style.display = 'none';
      document.getElementById('openLoginPageBtn').className = '';
    });


    /* Login Button on Login Page */
    document.getElementById('loginDivBtn').addEventListener('click', loginUserStart);

    /* Register Button on Login Page */
    document.getElementById('registerDivBtn').addEventListener('click', function(event){

    let loginDiv = document.getElementById('loginDiv');
    loginDiv.innerHTML =
    '<span class="closeBtn closeBtnArrow"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></span>'+
    '<h2>Register</h2>'+
    '<div><input class="loginDivInput smallerBecauseInfo" type="text" placeholder="Username"></div>'+
    '<div><input class="loginDivInput smallerBecauseInfo" type="password" placeholder="Password"></div>'+
    '<div><input class="loginDivInput smallerBecauseInfo" type="password" placeholder="Repeat password"></div>'+
    '<div><input class="loginDivInput smallerBecauseInfo" type="text" placeholder="Email"></div>'+
    '<div><input class="loginDivInput smallerBecauseInfo" type="text" placeholder="API Key"><span class="inputInfo"><i class="fa fa-question fa-lg" aria-hidden="true"></i><span class="hoverText"><p>If you already have an API Key you can put it here. (Optional)</p></span></span></div>'+
    '<button id="registerDivBtn"> Register <i class="fa fa-user-plus" aria-hidden="true"></i></button>';

    addEventListenersForRegisterPage();

  });
}

function addEventListenersForRegisterPage(){
  /* Declare the LoginDiv */
  let loginDiv = document.getElementById('loginDiv');

  /* Return button listener */
  let returnButton = loginDiv.children[0];
  returnButton.addEventListener('click', returnRegisterToLogin);

  /* Create advanced fucking amazing input Checks */
  let loginInputs = document.getElementsByClassName('loginDivInput');

  spinIcon(loginInputs[4]);
  setTimeout(function(){

    loginInputs[4].value = retrieveKey();

  }, 2000);

  loginInputs[0].addEventListener('change', function(event){ // USERNAME
    loginInputCheck(event, 2);
  });
  loginInputs[1].addEventListener('change', function(event){ // PASSWORD ONE
    loginInputCheck(event, 8);
  });
  loginInputs[2].addEventListener('change', function(event){ // PASSWORD TWO
    loginInputCheck(event, undefined, undefined, 'same', 'Passwords doesn\'t match.');
  });
  loginInputs[3].addEventListener('change', function(event){ // EMAIL
    loginInputCheck(event);
  });

  loginInputs[4].addEventListener('change', function(event){ // API KEY
    loginInputCheck(event);
  });

  /* Create the user with all the info specified */

  /* add eventListener for registerBtn */
  /* createUser(name, key, hashed, email = 'none')*/

  /* verifyKey(key, name, hashed, email, create = false, setKey = false) */

  document.getElementById('registerDivBtn').addEventListener('click', function(){

    verifyKey(loginInputs[4].value, loginInputs[0].value, md5(loginInputs[2].value), loginInputs[3].value, true, true);

    console.log('VALUE OF INPUT[4].children[0] IS: '+loginInputs[4].value);
    returnRegisterToLogin();
  });

}

function loginInputCheck(event, minLength = 3, maxLength = 32, type, errorMsg){

  let eventValue = event.target.value;

  /* Set customCheck to true */
  let customCheck = true;
  /* IF there's a customcheck in place set it first to false */
  if(type){
    customCheck = false;
  }
  /* With type you can make different checks.*/
  if(type == 'same'){
    /* Make same type check */
    if(event.target.parentNode.previousSibling.children[0].value == eventValue){
      /* If the check passes. Set customCheck to true! */
      customCheck = true;
    }
  }

  /* addLoginInputIcon(inputObj, type, hoverMessage, backgroundColor = '#222', color = '#fff' */

  /* Make some checks. */
  if (eventValue.length < minLength) {

  /* Field less than 3 characters */
  addLoginInputIcon(event.target, 'error', 'Input is too short');

  } else if (eventValue.length > maxLength) {

    /* Field longer than 3 characters */
    addLoginInputIcon(event.target, 'error', 'Input is too long');

  } else if(!customCheck){
    /* Field is good! */
    addLoginInputIcon(event.target, 'error', errorMsg);

  } else {
    addLoginInputIcon(event.target, 'success');
  }

}

function addLoginInputIcon(inputObj, type, message, backgroundColor = '#222', color = '#fff'){

  /* Start by declaring some variables */
  let inputField = inputObj; // InputField or inputObj is the text field.
  let parent = inputObj.parentNode; // Parent is the DIV containing <input> and <span>.
  let icon = document.createElement('span'); // Icon is going to go inside the <span>
  let iconType = 'fa-question fa-lg'; // Default iconType is a question mark.
  let padding = '8px 8.4px 9.4px';
  let rbc, rc, hoverMessage = "";
  if(backgroundColor != '#222'){
    rbc = backgroundColor;
  }
  if(color != '#fff'){
    rc = color;
  }
  /* Styling for type SUCCESS */
  if(type == 'success'){
    iconType = 'fa-check';
    padding = '8px 8.4px 9.4px';
    backgroundColor = '#599965';

  /* Styling for type ERROR */
  } else if (type == 'error'){
    iconType = 'fa-times';
    padding = '8px 10px 9.4px';
    backgroundColor = '#d64c4c';
  } else if (type == 'spin'){
    iconType = 'fa-spinner fa-spin';
    padding = '8px 8.4px 9px';
    backgroundColor = '#6e9578';
  }

  if(message){
    hoverMessage = '<span class="hoverText"><p>'+message+'</p></span>';
  }
  if(rbc){
    backgroundColor = rbc;
  }
  if(rc){
    color = rc;
  }

  icon.innerHTML = '<span class="inputNoColor"><i class="fa '+iconType+' " aria-hidden="true"></i>'+hoverMessage+'</span>';
  icon.children[0].style.backgroundColor = backgroundColor;
  icon.children[0].style.color = color;
  icon.children[0].style.padding = padding;
  console.log(parent.lastChild.innerHTML);


  if(parent.lastChild.children[0]){
    if(parent.lastChild.children[0].className.includes('inputNoColor')){
      parent.removeChild(parent.lastChild);
      printMsg('Removed lastchild!','success');
    }
  }
  parent.appendChild(icon);
}

function spinIcon(inputObj){
  let icon = inputObj.nextSibling.children[0];
  let oldIconClassName = icon.className;
  icon.className = "fa fa-spinner fa-spin";

  icon.parentNode.style.padding = "8px 8.4px 9px";
  icon.parentNode.style.margin = "-10px 25px -10px -59px";
  icon.parentNode.style.left = "2px";
  setTimeout(function(){
    icon.parentNode.style.padding = "8px 10px 9px";
    icon.className = oldIconClassName;
  },2000);
}

function returnRegisterToLogin(){
  let loginDiv = document.getElementById('loginDiv');
  loginDiv.innerHTML = '<span class="closeBtn"><i class="fa fa-window-close fa-lg" aria-hidden="true"></i></span><h2>Login Page</h2><input class="loginUserDivInput" type="text" placeholder="Username"><input class="loginUserDivInput" type="password" placeholder="Password"><button id="loginDivBtn"> Login <i class="fa fa-sign-in" aria-hidden="true"></i></button><div><span class="line"></span><p> or </p><span class="line"></span></div> <button id="registerDivBtn"> Register <i class="fa fa-user-plus" aria-hidden="true"></i></button>';

  addEventListenersForLoginPage();
}

/* Style Functions */
function removeActiveBtn(){
  createUserBtn.className = '';
  retrieveUserBtn.className = '';
  removeUserBtn.className = '';
}

/* Database functions */
function createDatabaseKey(){
  localStorage.setItem('databaseKey', 'NvvhR');
}

function retrieveDatabaseKey(){
  return localStorage.getItem('databaseKey');
}

/* Create user function */
function createUser(name, key, hashed, email = 'none'){

  /*Kolla om användaren vill ha lösenord. Inget eller tom sträng*/
  if(!hashed || hashed == 'd41d8cd98f00b204e9800998ecf8427e'){
    hashed = false;
  }

  /* Skapar användaren */
  let userObject = {
    name: name,
    key: key,
    password: hashed,
    email: email
  };
  console.log('HASHED IN CREATEUSER(name, key, hashed) is now: '+ hashed);

  let strObj = JSON.stringify(userObject);

  /* Set dbApiKey to databaseKey */
  let dbApiKey = retrieveDatabaseKey();
  console.log('In createUser dbApiKey is: '+dbApiKey);
  /* Add the user to the API using the addBook function */
  addBook(0, 'user', strObj, dbApiKey);
}

/* Verify a key, can create user aswell by calling createUser */
function verifyKey(key, name, hashed, email = 'none', create = false, setKey = false){
    const xhr = new XMLHttpRequest();
    var bad = false;
    if(key == undefined || key == ""){
      key = retrieveKey();
    }

    xhr.onreadystatechange = function(){
      if(xhr.responseText.toString().includes('Bad API key')){
        bad = true;
      }

      if(xhr.readyState === 4 && bad){
        printMsg('Bad API key', 'error');
      } else if(xhr.readyState === 4 && !bad){
        if(create){
          /* function createUser(name, key, hashed, email = 'none') ;*/
          createUser(name, key, hashed, email);
        } else if (setKey){
          printMsg('Active key changed to: ' + key, 'success');
          localStorage.setItem('apiKey', key);
        }
      }
    }
    xhr.addEventListener('load', updateActive);
    xhr.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${key}`);
    xhr.send();
}

function userUploadKey(event){
  let listItem = event.target.parentNode;
  if(event.target.nodeName == 'I'){
    listItem = listItem.parentNode;
  }
  let key = listItem.children[4].innerText;
  console.log(key);

  /* Vibe it */
  shakeElement(event.target);

  /* Change saved key */
  saveKey(key);
  updateActive();
  printMsg('Changed active key to: ' + key, 'success');
}

/* Function to display a user in the table */
function displayUser(id, username, userKey, hashedPassword){
  const libraryDiv = document.getElementById('library');

  /* Check if stats are active, if so, remove it */
  removeStats();
  /* Change the headers */
  changeLibraryHeader('UserID', 'Username', 'Personal apikey');

  let listItem = document.createElement('div');
  let upload = true;

  if(userKey.toLowerCase().includes('protected')){
    userKey += ' <button unlock="true" class="lockBtn"><i class="fa fa-lock" aria-hidden="true"></i></button>';
    upload = false;
  }

  listItem.innerHTML = '<span user="true" class="spanID" hp="'+hashedPassword+'">'+id+'</span> <hr> <span>'+username+'</span> <hr> <span class="userKey">'+userKey+'</span> <hr> <button pen="true" class="libraryRemoveBtn hoverGold"><i class="fa fa-pencil" aria-hidden="true"></i></button><button upload="'+upload+'" class="hoverGrey libraryRemoveBtn"><i class="fa fa-upload" aria-hidden="true"></i></button><button rmvBtn="true" class="libraryRemoveBtn"><i class="fa fa-user-times" aria-hidden="true"></i></button>';


  let exists = false;
  for(let listItem of libraryDiv.children){
    if(id == listItem.children[0].innerText){
      exists = true;
    }
  }
  if(!exists){
    libraryDiv.appendChild(listItem);

  } else {
    printMsg('This user already exists!', 'warning');
    console.log('This user already exists');
  }

  for(let listItem of libraryDiv.children){
    btnAddEventListeners(listItem);
  }
}

/* Function to check the password from Table */
function protectEventListener(protectHtmlObj){
  protectHtmlObj.addEventListener('change', function(event){
    let listItem = event.target.parentNode;
    let userID = protectHtmlObj.parentNode.children[0].innerText;

    if(verifyHash(event.target.value, listItem)){
      printMsg('Password is correct!', 'success');
      event.target.blur();
      /* Password was correct. Create function here */
      passwordWasCorrect(userID);
      console.log(listItem.innerHTML.parentNode);
    } else {
      /* Bad password! */
      printMsg('Bad password!', 'error');
      event.target.blur();
    }
  });

  protectHtmlObj.children[0].addEventListener('blur', function(event){
    let listItem = event.target.parentNode;

    /* Reset the input box */
    event.target.parentNode.innerHTML = 'Protected <button unlock="true" class="lockBtn"><i class="fa fa-lock" aria-hidden="true"></i></button>';

    btnAddEventListeners(listItem.parentNode);
  });
}

/* If the password was correct */
function passwordWasCorrect(userID){
  /* Set active key from the user ID, retrieveUser(counter, name, id, all, hashedPassword, login){ */
  retrieveUser(undefined, undefined, userID, false);
  console.log('Password was correct. Trying to retrieve user from database with ID.');
}

/* Function to retrieve a user */
function retrieveUser(counter = 0, name, id, all, hashedPassword, login, precise){
  /* Should we use ID to retrieve user? */
  let useID = false;
  if(id != undefined){
    useID = true;
  }

  if(counter > 10){
    printMsg('Failed after 10 retries.', 'error');
    return;
  } else {

    const retrieveUserRequest = new XMLHttpRequest();

    retrieveUserRequest.onreadystatechange = function(event) {
        if (retrieveUserRequest.readyState === 4 && retrieveUserRequest.status === 200) {

            /* Always parse responseData */
            let responseData = JSON.parse(retrieveUserRequest.responseText);
            console.log('COUNTER IS: ' + counter);
            /* If the API returns error */
            if(responseData.status == "error"){

              /* Print errormessage */
              console.log(responseData.message);
              increaseFailed();
              /* Try to retrieve user again, plus one to counter */
              return retrieveUser((counter+1), name, id, all, hashedPassword, login);

            } else {
              /* THE REQUEST IS SUCCESSFUL, WE HAVE RETRIEVED THE DATA */

              /* Iterate through JavaScript object with for loop */
              let userCount = 0;
              let found = false;
              let preciseFound = false;

              for(let i = 0; i < responseData.data.length; i++){

                /* If the JavaScript data is a book. Ignore it! Shouldn't be any in userDB */
                if(responseData.data[i].title != 'user'){
                  printMsg('Book found in userDB. ID: '+responseData.data[i].id, 'warning');
                } else {

                  /*

                   If the data has title "user"

                  Convert userData to JavaScript object

                  */

                  let userObj= JSON.parse(responseData.data[i].author);
                  let userID = responseData.data[i].id;

                  /* If username doesn't exist. This is a corrupt object */
                  if(userObj.name != undefined){

                    /* The user has a name. Object is not corrupt. (Name atleast)
                    Check if their key is null / undefined or empty string */
                    if(userObj.key == null || userObj.key == undefined || userObj.key == ""){
                      printMsg('User does not have a key.', 'error');
                      userObj.key = 'Key not found';
                    }
                    /* Check if we retrieve with ID. */
                    if(useID){
                      if(id == responseData.data[i].id){

                        /* We found the user by ID! */
                        saveKey(userObj.key);
                        updateActive();
                        removeBooksFromLibrary();
                        retrieveBooks();
                      }
                    } else if(all){
                      /*If all is true, print ALL users to library */
                      if(userObj.password){
                        displayUser(responseData.data[i].id,userObj.name,'Protected',userObj.password);
                      } else {
                        displayUser(responseData.data[i].id,userObj.name,userObj.key);
                      }
                    } else {
                      /* Else check for a certain user! */
                      /* Check if the user is found! But only if useid is false*/
                        console.log(userObj.name.toString(), name.toString());

                        if(!precise && userObj.name.toString().toLowerCase().includes(name.toString().toLowerCase()) && !useID){
                            found = true;
                            if(userObj.password){
                              printMsg('This user is password protected!', 'warning');
                              displayUser(responseData.data[i].id,userObj.name,'Protected',userObj.password);
                            } else {
                              displayUser(responseData.data[i].id,userObj.name,userObj.key);
                            }

                        } else if(precise){
                          /* check for EXACT USERNAME */
                            if(userObj.name.toLowerCase() == name.toLowerCase()){
                              /* Great. We found the user by Username.
                               Now, Let us compare passwords if one was specified */
                               preciseFound = true;
                              if(hashedPassword == userObj.password){
                                /* Woho! specified password is correct
                                Lets log the user in if specified. Let's use the ID for that. */
                                if(login){
                                  loginUser(userObj);
                                } else {
                                  printMsg('Correct password!', 'success');
                                }
                              } else if(hashedPassword){
                                printMsg('Wrong username or password','warning');
                              }
                            }
                          }

                    }
                  } else {
                    printMsg('Object does not have a name. ID: '+ responseData.data[i].id,'error');
                  }
                  userCount++;
                }
              }

              if(!all && !found && !useID){
                if(hashedPassword){
                  printMsg('Wrong username or password','warning');
                } else {
                  printMsg('User not found.', 'error');
                }
                //printMsg('User found! Name:' + userObj.name + 'Key: '+userObj.key, 'success');
              } else if (found && !hashedPassword){
                  printMsg('User found!','success');
              }
              console.log('Number of users in the api:' + userCount);
              console.log(retrieveUserRequest.status);
              increaseSuccess();
              //printMsg('Successfully retrieved ' + userCount + ' users on the '+(counter+1)+'th try.', 'success');

              if(userCount == 0){
                printMsg('No users found!', 'warning');
              } else if(all){
                printMsg('Printing users to library!', 'success');
              }
            }
        }
    }

    retrieveUserRequest.open('GET', `https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${retrieveDatabaseKey()}`);
    retrieveUserRequest.send();
  }
}

/* Login Functions! */
