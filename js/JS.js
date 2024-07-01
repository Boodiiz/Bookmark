
var bookMarkName = document.getElementById("bookmarkname");
var bookMarkURL = document.getElementById("bookmarkURL");

var tableBody = document.getElementById("tableContent");

var submitButton = document.getElementById("submitButton");
var updateButton = document.getElementById("updateButton");
var websitesList=[];
var updatedWebsiteIndex;

if(localStorage.getItem("ourWebsites") != null)
{
  websitesList = JSON.parse(localStorage.getItem("ourWebsites"));
  display();
}

function addWebsite()
{
  if (isValidInput(nameRegex,bookMarkName) &
   isValidInput(URLRegex,bookMarkURL))
  {
    var websiteData =
    {
      bookMarkName : bookMarkName.value,
      bookMarkURL : bookMarkURL.value,
    }
    
    websitesList.push(websiteData);
    localStorage.setItem("ourWebsites", JSON.stringify(websitesList));
    resetInputs();
    console.log(websitesList);  
    display();
  }
  // else
  // {
  //   //alert("Please enter a valid input");
  // }
 
}

function resetInputs()
{
  bookMarkName.value = null ;
  bookMarkURL.value = null ;
  bookMarkName.classList.remove("is-valid");
  bookMarkURL.classList.remove("is-valid");
}

function display()
{
  var data = '';

  for(var i = 0 ; i < websitesList.length ; i++)
  {
    data += `<tr>
                <td>${i+1}</td>
                <td>${websitesList[i].bookMarkName}</td>
                <td>
                  <button type="button" class="btn btn-secondary">
                    <a href="${websitesList[i].bookMarkURL}" target="_blank">
                      <i class="fa-regular fa-eye"></i>
                      Visit
                    </a>
                  </button>
                </td>
                <td>
                  <button onclick="deleteWebsite(${i})" type="button" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
                <td>
                  <button onclick="moveDetailsToInputs(${i})" type="button" class="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Update
                  </button>
                </td>
              </tr>`
  }

  tableBody.innerHTML = data;
}

function deleteWebsite(deletedIndex)
{
  websitesList.splice(deletedIndex,1);
  localStorage.setItem("ourWebsites", JSON.stringify(websitesList));
  
  display();

}

function moveDetailsToInputs(index)
{
  bookMarkName.value = websitesList[index].bookMarkName;
  bookMarkURL.value = websitesList[index].bookMarkURL;

  submitButton.classList.replace("d-block", "d-none");
  updateButton.classList.replace("d-none", "d-block");

  updatedWebsiteIndex = index;
}
function updateWebsite()
{
  websitesList[updatedWebsiteIndex].bookMarkName = bookMarkName.value,
  websitesList[updatedWebsiteIndex].bookMarkURL = bookMarkURL.value,

  display();
  localStorage.setItem("ourWebsites", JSON.stringify(websitesList));

  resetInputs();

  submitButton.classList.replace("d-none", "d-block");
  updateButton.classList.replace("d-block", "d-none");
}


var nameRegex = /(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?/;

var URLRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function isValidInput(regex, element)
{
  if(regex.test(element.value))
  {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  }
  else
  {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}