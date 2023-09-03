let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBttn123;

$(document).ready(() => {
    searchByNames1("").then(() => {
        $(".loading-screncss").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function openSideNaves() {
    $(".side-nav-mennues").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNavve() {
    let boxWidth = $(".side-nav-mennues .nav-m1").outerWidth()
    $(".side-nav-mennues").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNavve()
$(".side-nav-mennues i.open-close-icon").click(() => {
    if ($(".side-nav-mennues").css("left") == "0px") {
        closeSideNavve()
    } else {
        openSideNaves()
    }
})




function displayMealesses(arres) {
    let cartoona = "";

    for (let i = 0; i < arres.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetais1('${arres[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arres[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layyeress position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arres[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}



async function getCategori() {
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategori(response.categories)
    $(".inner-loading-screncss").fadeOut(300)

}

function displayCategori(arres) {
    let cartoona = "";

    for (let i = 0; i < arres.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMel('${arres[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arres[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layyeress position-absolute text-center text-black p-2">
                        <h3>${arres[i].strCategory}</h3>
                        <p>${arres[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getAr() {
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayAr(respone.meals)
    $(".inner-loading-screncss").fadeOut(300)

}


function displayAr(arres) {
    let cartoona = "";

    for (let i = 0; i < arres.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getArMea('${arres[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arres[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getIngredi() {
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredi(respone.meals.slice(0, 20))
    $(".inner-loading-screncss").fadeOut(300)

}


function displayIngredi(arres) {
    let cartoona = "";

    for (let i = 0; i < arres.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngrediMel('${arres[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arres[i].strIngredient}</h3>
                        <p>${arres[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getCategoryMel(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMealesses(response.meals.slice(0, 20))
    $(".inner-loading-screncss").fadeOut(300)

}



async function getArMea(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMealesses(response.meals.slice(0, 20))
    $(".inner-loading-screncss").fadeOut(300)

}


async function getIngrediMel(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMealesses(response.meals.slice(0, 20))
    $(".inner-loading-screncss").fadeOut(300)

}

async function getMealDetais1(mealID) {
    closeSideNavve()
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetais1(respone.meals[0])
    $(".inner-loading-screncss").fadeOut(300)

}


function displayMealDetais1(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 >Instructions</h2>
                <p class="text-light">${meal.strInstructions}</p>
                <h3 ><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}


function showSearchInputsesm1() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByNames1(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLettesrre(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByNames1(term) {
    closeSideNavve()
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMealesses(response.meals) : displayMealesses([])
    $(".inner-loading-screncss").fadeOut(300)

}

async function searchByFLettesrre(term) {
    closeSideNavve()
    rowData.innerHTML = ""
    $(".inner-loading-screncss").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMealesses(response.meals) : displayMealesses([])
    $(".inner-loading-screncss").fadeOut(300)

}


function showContacttses1() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="NameInpuutts1" onkeyup="InputsValidatiionns1()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="EmailInpuutts2" onkeyup="InputsValidatiionns1()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="PhoneInpuutts3" onkeyup="InputsValidatiionns1()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="AgeInpuutts4" onkeyup="InputsValidatiionns1()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="PPasswordInpuutts5" onkeyup="InputsValidatiionns1()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="EePPasswordInpuutts6" onkeyup="InputsValidatiionns1()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBttn123" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBttn123 = document.getElementById("submitBttn123")


    document.getElementById("NameInpuutts1").addEventListener("focus", () => {
        NameInpuutts1Touched = true
    })

    document.getElementById("EmailInpuutts2").addEventListener("focus", () => {
        EmailInpuutts2Touched = true
    })

    document.getElementById("PhoneInpuutts3").addEventListener("focus", () => {
        PhoneInpuutts3Touched = true
    })

    document.getElementById("AgeInpuutts4").addEventListener("focus", () => {
        AgeInpuutts4Touched = true
    })

    document.getElementById("PPasswordInpuutts5").addEventListener("focus", () => {
        PPasswordInpuutts5Touched = true
    })

    document.getElementById("EePPasswordInpuutts6").addEventListener("focus", () => {
        EePPasswordInpuutts6Touched = true
    })
}

let NameInpuutts1Touched = false;
let EmailInpuutts2Touched = false;
let PhoneInpuutts3Touched = false;
let AgeInpuutts4Touched = false;
let PPasswordInpuutts5Touched = false;
let EePPasswordInpuutts6Touched = false;




function InputsValidatiionns1() {
    if (NameInpuutts1Touched) {
        if (NameValidatiionnes2()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (EmailInpuutts2Touched) {

        if (EmailValidatiionnes3()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (PhoneInpuutts3Touched) {
        if (PhoneValidattiionnes4()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (AgeInpuutts4Touched) {
        if (AgeValidattionnes5()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (PPasswordInpuutts5Touched) {
        if (PasswordValidatiionnes6()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (EePPasswordInpuutts6Touched) {
        if (RePasswordValidatiionnes7()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (NameValidatiionnes2() &&
        EmailValidatiionnes3() &&
        PhoneValidattiionnes4() &&
        AgeValidattionnes5() &&
        PasswordValidatiionnes6() &&
        RePasswordValidatiionnes7()) {
        submitBttn123.removeAttribute("disabled")
    } else {
        submitBttn123.setAttribute("disabled", true)
    }
}

function NameValidatiionnes2() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("NameInpuutts1").value))
}

function EmailValidatiionnes3() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("EmailInpuutts2").value))
}

function PhoneValidattiionnes4() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("PhoneInpuutts3").value))
}

function AgeValidattionnes5() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("AgeInpuutts4").value))
}

function PasswordValidatiionnes6() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("PPasswordInpuutts5").value))
}

function RePasswordValidatiionnes7() {
    return document.getElementById("EePPasswordInpuutts6").value == document.getElementById("PPasswordInpuutts5").value
}