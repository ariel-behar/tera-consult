
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

function ServiceProvider(image, nickname ,name, profession, experience, services){
    this.image = image;
    this.nickname = nickname;
    this.name = name;
    this.profession = profession;
    this.experience = experience;
    this.services = services;
}

const rudi = new ServiceProvider('ariel.jpg','rudi', 'Радостин Величков', 'Счетоводител', '23', accountingServices);

const stanish = new ServiceProvider('ariel.jpg','stanish','Станиш Златков', 'Адвокат', '25', lawServices);

function indexPageInsertElements(serviceProvider) {

    const serviceProviderDiv = document.querySelector(`#index-page-${serviceProvider.nickname} > .img-holder`)

    serviceProviderDiv.insertAdjacentHTML("afterbegin", `<img src="./img/ariel.jpg" alt="${serviceProvider.name} - ${serviceProvider.profession}" class="service-provider-image">`);
  
    const providerName = document.querySelector(`#index-page-${serviceProvider.nickname} > .service-provider-details > .name`);
    const providerProfession = document.querySelector(`#index-page-${serviceProvider.nickname}  > .service-provider-details > .profession`);
    const providerExperience = document.querySelector(`#index-page-${serviceProvider.nickname}  > .service-provider-details > .experience`);
    const providerServices = document.querySelector(`#index-page-${serviceProvider.nickname} > .service-provider-details > .services`);

    providerName.textContent = serviceProvider.name;
    providerProfession.textContent = serviceProvider.profession;
    providerExperience.textContent = serviceProvider.experience + ' години опит';
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
        item.style.backgroundColor = "rgba(0,0,0,0.5)";
        item.querySelector('h6').style.display = "none";

        item.querySelector('p').style.display = "block";
        item.querySelector('img').style.display = "block";
       
    })

    item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = "rgba(0,0,0,0.2)";
        item.querySelector('h6').style.display = "block";
        item.querySelector('p').style.display = "none";
        item.querySelector('img').style.display = "none";
    })
})





//Finish #index-third-section