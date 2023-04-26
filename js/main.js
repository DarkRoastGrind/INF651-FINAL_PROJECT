/* INF651 FINAL PROJECT
*
*
* @author:  Nicholas Alexander La Claire
* Creation Date: 23 APR 2023
* Last Updated: 26 APR 2023
*/



//1 CreateElemWithText function - Done
function createElemWithText(HTMLElemStrngToCrt = "p", txtContntOfElToCrt = "", classNameifOneNeeded) 
{
  let requestedElementCreated = document.createElement(HTMLElemStrngToCrt);
  requestedElementCreated.textContent = txtContntOfElToCrt;

  if (classNameifOneNeeded) 
  {
    requestedElementCreated.className = classNameifOneNeeded;
  }

  return requestedElementCreated;
}


//2 CREATE SELECT OPTIONS - Done
function createSelectOptions(users) 
{
  if (users === undefined || users === null) 
  {
    return undefined;
  }

  let optionArray = [];

  for (const user of users) 
  {
    console.log(user);
    var option = document.createElement("option");

    option.value = user.id;
    option.textContent = user.name;
    optionArray.push(option);
  }

  return optionArray;
}

//3 Toggle Comment Section - Done
function toggleCommentSection(postId) 
{
  if (!postId) 
  {
    return undefined;
  }

  let section = document.querySelector(`section[data-post-id="${postId}"]`);

  if (section) 
  {
      section.classList.toggle('hide');
  }

  return section;
}

//4 Toggle Comment Button - Done
function toggleCommentButton (postID) 
{
  if (!postID) 
  {
    return;
  }

  const btnSelected = document.querySelector(`button[data-post-id = "${postID}"`);

  if (btnSelected != null) 
  {
    btnSelected.textContent === "Show Comments" ? (btnSelected.textContent = "Hide Comments") : (btnSelected.textContent = "Show Comments");
  }

  return btnSelected;
};

//5 Delete Child Elements - Done
function deleteChildElements(parentElement) 
{
	if (!parentElement || !parentElement.nodeType)
  {
		return undefined;
	}

	let child = parentElement.lastElementChild;

	while (child) 
  {
		parentElement.removeChild(child);
		child = parentElement.lastElementChild;
	}

	return parentElement;
}

//6 Add Button Listeners - Done
const addButtonListeners = () => 
{
  let myMainElem = document.querySelector('main')
  let buttons = myMainElem.querySelectorAll('button')

  if(buttons)
  {
      for(let i = 0; i < buttons.length; i++)
      {
          let myButton = buttons[i]
          let postId = myButton.dataset.postId

          myButton.addEventListener('click', function(event)
          {
              toggleComments(event, postId), false
          })
      }
      return buttons
  }
}

//7 Remove Button Listeners - Done
const removeButtonListeners = () => 
{
  let myMainElem = document.querySelector('main')
  let buttons = myMainElem.querySelectorAll('button')

  if(buttons)
  {
      for(let i = 0; i < buttons.length; i++)
      {
        let myButton = buttons[i]
        let postId = myButton.dataset.postId

        myButton.removeEventListener('click', function(event)
        { 
          toggleComments(event, postId), false
        })
      }
      return buttons
  }
}

//8 Create Comments - Done
function createComments(comments) 
{
      if (!JSON.stringify(comments)) 
      {
        return undefined;
      }

      let fragElem = document.createDocumentFragment();

      for (let i = 0; i < comments.length; i++) 
      {
        var comment = comments[i];
        let article = document.createElement("article");
        let h3 = createElemWithText('h3', comment.name);
        let p1 = createElemWithText('p', comment.body);
        let p2 = createElemWithText('p', `From: ${comment.email}`);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        fragElem.appendChild(article);
      }

      return fragElem;
}

//9 Populate Select Menu - Done
function populateSelectMenu(users) 
{
  if (!users) return;

  let selectMenu = document.querySelector("#selectMenu");
  let optionsArr = createSelectOptions(users);

  for (let i = 0; i < optionsArr.length; i++) 
  {
      let option = optionsArr[i];
      selectMenu.append(option);
  }

  return selectMenu;

}

//10 Get Users - Done
async function getUsers()
{
  try 
  {
      let retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
      return await retrieve.json();
  }

  catch (error) 
  {
      console.log(error);
  }
}

//11 Get User Posts - Done
async function getUserPosts(userId) 
{
  if(!userId)
  {
    return undefined; 
  }

  try 
  {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data = await response.json();
    return data;
  } 
  
  catch (error) 
  {
    console.error(error);
  }
}


//12 Get use - Done
async function getUser(userId)
{

  if (!userId) 
  {
    return undefined;
  }

  try 
  {
      let retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      return retrieve.json();
  } 

  catch (error) 
  {
      console.log(error);
  }
}

//13 Get Post Comments - Done
async function getPostComments(postId) 
{
  if(!postId)
  {
    return undefined; 
  }

  try 
  {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const data = await response.json();
    return data;
  } 

  catch (error) 
  {
    console.error(error);
  }
}

//14 Display Comments - Done
async function displayComments(postId) 
{
  if(!postId)
  {
    return undefined;
  }

  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");

  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.appendChild(fragment);

  return section;
}

//15 Create Posts - Done
async function createPosts(posts) 
{
  if(!posts)
  {
    return undefined; 
  }

  const fragmentElem = document.createDocumentFragment();

  for (let i = 0; i < posts.length; i++)
  {
    let post = posts[i];

    const article = document.createElement("article");
    const title = createElemWithText("h2", post.title);
    const body = createElemWithText("p", post.body);
    const id = createElemWithText("p", `Post ID: ${post.id}`);
    const author = await getUser(post.userId);
    const authorName = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
    const catchPhrase = createElemWithText("p", author.company.catchPhrase);

    const button = document.createElement("button");

    button.textContent = "Show Comments";
    button.dataset.postId = post.id;

    article.append(title, body, id, authorName, catchPhrase, button);

    const section = await displayComments(post.id);

    article.appendChild(section);

    fragmentElem.appendChild(article);
  }

  return fragmentElem;
}

//16 Display Posts - Done
async function displayPosts(posts)
{
  let myMain = document.querySelector("main");
  let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
  myMain.append(element);
  return element;
}

//17 Toggle Comments - Done
function toggleComments(event, postId)
{
  if (!event || !postId)
  {
      return undefined;
  }

  event.target.listener = true;
  let section  = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}

//18 Refresh Posts - Done
async function refreshPosts(posts)
{
  if (!posts)
  {
      return undefined;
  }

  let buttons = removeButtonListeners();
  let myMain = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts(posts);
  let button = addButtonListeners();

  return [buttons, myMain, fragment, button];
}

//19 Select Menu Change Event Handler - Done
async function selectMenuChangeEventHandler (event)
{
  if(!event)
  {
    return undefined;
  }

  let userId = event?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);

  return [userId, posts, refreshPostsArray];
}

//20 Initialize Page - Done
async function initPage()
{
  let users = await getUsers();
  let select = populateSelectMenu(users);

  return [users, select];
}

//21 Initialized App - Done
function initApp()
{
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);