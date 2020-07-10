
// ANIMATIONS #index-first-section
document.addEventListener('DOMContentLoaded', () => {
    let mainTitleTextContent = document.querySelector('#index-first-section >div >div > div.text-content');
    let lawyersImg = document.querySelector('.lawyers-images-div > img')
    
    lawyersImg.style.opacity = 1;
    lawyersImg.style.right = 0;

    mainTitleTextContent.style.opacity = 1;

})
// Finish ANIMATIONS #index-first-page

// RUDI and STANISH info and population of components
let accountingServices = ['Данъчна Защита', 'Счетоводство', 'Финансов Одит', 'Представителство (ГИТ, НАП, НОИ, КОНПИ)'];

let lawServices = ['Семейно Право', 'Наказателно Право', 'Гражданско Право', 'Правно Представителство'];

function ServiceProvider(icon, image, nickname ,name, profession, experience, services){
    this.icon = icon;
    this.image = image;
    this.nickname = nickname;
    this.name = name;
    this.profession = profession;
    this.experience = experience;
    this.services = services;
}

const rudi = new ServiceProvider('accounting.png', 'ariel.jpg','rudi', 'Радостин Величков', 'Счетоводител', '23', accountingServices);

const stanish = new ServiceProvider('law.png','ariel.jpg','stanish','Станиш Златков', 'Адвокат', '25', lawServices);

function indexPageInsertElements(serviceProvider) {

    const serviceProviderDiv = document.querySelector(`#index-page-${serviceProvider.nickname} > .img-holder`)

    serviceProviderDiv.insertAdjacentHTML("afterbegin", `<img src="./img/ariel.jpg" alt="${serviceProvider.name} - ${serviceProvider.profession}" class="service-provider-image">`);
    serviceProviderDiv.insertAdjacentHTML("afterbegin", `<img src="./img/icons/${serviceProvider.icon}" alt="${serviceProvider.icon}" class="service-provider-icon">`);
  
    const providerName = document.querySelector(`#index-page-${serviceProvider.nickname} > .service-provider-details > .name`);
    const providerProfession = document.querySelector(`#index-page-${serviceProvider.nickname}  > .service-provider-details > .profession`);

    const providerServices = document.querySelector(`#index-page-${serviceProvider.nickname} > .service-provider-details > .services`);

    providerName.textContent = serviceProvider.name;
    providerProfession.textContent = `${serviceProvider.profession} (${serviceProvider.experience} години)` ;

    serviceProvider.services.forEach(item =>{
        providerServices.innerHTML += `<li>${item}</li>`;
    })

    
}

indexPageInsertElements(rudi);
indexPageInsertElements(stanish);
// Finish RUDI and STANISH info and population of components

// #index-third-section
let choiceQualityMask = document.querySelectorAll('#index-third-section .choice-quality .mask');
let choiceQualityPar = document.querySelectorAll('#index-third-section .choice-quality > .mask p');

choiceQualityMask.forEach(item =>{
    item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = "rgba(117,117,117,0.7)";
        item.style.justifyContent = "center";
        item.querySelector('h6').style.display = "none";

        
        item.querySelector('p').style.display = "block";
        item.querySelector('img').style.display = "block";
       
    })

    item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = "rgba(0,0,0,0.0)";
        item.style.justifyContent = "flex-end";
        item.querySelector('h6').style.display = "block";
        item.querySelector('p').style.display = "none";
        item.querySelector('img').style.display = "none";
    })
})

//Finish #index-third-section

// Form
    let form = document.querySelectorAll('.consultation-form');

    let formProvider = document.getElementById('form-provider');
    let formTopic = document.getElementById('consultation-topic');

    let formFromHours = document.getElementById('consultation-from-hours');
    let formUntilHours = document.getElementById('consultation-until-hours');
    let formDays = document.getElementById('consultation-days');
    let daysOfTheWeek = ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя'];

    //Populating form provider topics before anything interaction with the user
    accountingServices.forEach((service, index) => {
        formTopic.innerHTML += `<option value="${index}">${service}</option>`;
    }) 

    //Populating form provider topics dynamically with the user's choices
    formProvider.addEventListener('change', ()=>{
        let checkedOption = document.querySelector('#form-provider option:checked').value;
        if(checkedOption == "accountant") {
            formTopic.innerHTML = '';
            accountingServices.forEach((service, index) => {
                formTopic.innerHTML += `<option>${service}</option>`;
            }) 
        } else if(checkedOption == 'lawyer') {
            formTopic.innerHTML = '';
            lawServices.forEach((service, index) => {
                formTopic.innerHTML += `<option>${service}</option>`;
            }) 
        }
    })

    daysOfTheWeek.forEach(item =>{
        formDays.innerHTML += `<option>${item}</option>`
    });

    for(let i = 9; i<=19;i++) {
        formFromHours.innerHTML += `<option>${i}</option>`
        formUntilHours.innerHTML += `<option>${i+1}</option>`
    }
    

// END Form